  import { Table } from "antd";
  import { useEffect, useState } from "react";
  import { Button, Drawer, Form, Input, DatePicker, Radio  } from 'antd';
  import { Customer } from "../models/customer";
  import { createCustomer, getCustomers } from "../services/customer";
  import type { DatePickerProps } from 'antd';
  import type { Dayjs } from 'dayjs';
  import DrawerFooter from "./DrawerFooter";
  import supabase from "../utils/supabase";
  import type { RadioChangeEvent } from 'antd';


  const CustomersTable: React.FC = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [open, setOpen] = useState(false);
    const [nombre, setNombre] = useState<string>('');
    const [apellido, setApellido] = useState<string>('');
    const [fechanac, setFechaNac] = useState<Date>(new Date());
    const [telefono, setTelefono] = useState<string>('');
    const [correo, setCorreo] = useState<string>('');
    const [fk_genero, setFkGenero] = useState<number>(0);
    
    
    const fechaNacimiento = fechanac ? new Date(fechanac) : null;

    const showDrawer = () => {
      setOpen(true);
    };
    const onChange: DatePickerProps<Dayjs[]>['onChange'] = (date, dateString) => {
      console.log(date, dateString);
    };
    const onClose = () => {
      setOpen(false);
    };
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const customers = await getCustomers();
          setCustomers(customers);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };

      fetchProducts();
    }, []);

    const columns = [
          {
              title: 'ID clientes',
              dataIndex: 'idclientes',
              key: 'idclientes'
            },
            {
              title: 'nombre',
              dataIndex: 'nombre',
              key: 'nombre'
            },
            {
              title: 'apellido',
              dataIndex: 'apellido',
              key: 'apellido'
            },
            {
              title: 'fecha nacimiento',
              dataIndex: 'fechanac',
              key: 'fechanac'
            },
            {
              title: 'genero',
              dataIndex: 'fk_genero',
              key: 'fk_genero'
            },
            {
              title: 'telefono',
              dataIndex: 'telefono',
              key: 'telefono'
            },
            {
              title: 'correo',
              dataIndex: 'correo',
              key: 'correo'
            },
            {
              title: 'direccion',
              dataIndex: 'fk_direccion',
              key: 'fk_direccion'
            },
            {
              title: 'fecha creacion',
              dataIndex: 'fechacreacion',
              key: 'fechacreacion'
            },
            {
              title: 'fecha de actualizacion',
              dataIndex: 'fechaactualizacion',
              key: 'fechaactualizacion'
            },
            {
              title: 'fk_creadorpor',
              dataIndex: 'fk_creadorpor',
              key: 'fk_creadorpor'
            },
            {
              title: 'fk_actualizadopor',
              dataIndex: 'fk_actualizadopor',
              key: 'fk_actualizadopor'
            },
            {
              title: 'fecha eliminado',
              dataIndex: 'fechaeliminado',
              key: 'fechaeliminado'
            },
            {
              title: 'eliminado por',
              dataIndex: 'fk_eliminadopor',
              key: 'fk_eliminadopor'
            },
    ];
    const handleSubmit = async () => {
      try {
        if (!fechanac) {
          console.error("La fecha de nacimiento es requerida.");
          return;
        }
    
        const currentDateTime = new Date();
        // Consultar el ID máximo actual en la tabla clientes
        const maxIdResponse = await supabase
          .from("clientes")
          .select("idclientes")
          .order("idclientes", { ascending: false })
          .limit(1);
    
        const maxId = maxIdResponse.data?.[0]?.idclientes || 0;
        const newId = maxId + 1;
    
        // Crear el objeto de cliente con el nuevo ID
        const categoryInput: Customer = {
          idclientes: newId,
          nombre,
          apellido,
          fechanac: fechaNacimiento,
          telefono,
          correo,
          fk_genero,
          fechacreacion: currentDateTime, 
        };
    
        // Insertar el nuevo registro en la base de datos
        await createCustomer(categoryInput);
    
        // Actualizar la lista de clientes después de la inserción
        const updatedCategory = await getCustomers();
        setCustomers(updatedCategory);
        onClose();
      } catch (error) {
        console.error("Error creating cliente:", error);
      }
    };

    return (
      <>
            <Button type="primary" onClick={showDrawer}>
          Open
        </Button>
        <Drawer title="Basic Drawer" onClose={onClose} open={open} footer={<DrawerFooter createRecord={handleSubmit}/>}>
        <Form>
            <Form.Item label='nombre' name='nombre' rules={[{ required: true, message: 'Ingrese el nombre del cliente' }]}>
              <Input value={nombre} onChange={(e) => setNombre(e.target.value)}/>
            </Form.Item>
            <Form.Item label='apellido' name='apellido' rules={[{ required: true, message: 'Ingrese el apellido del cliente' }]}>
              <Input value={apellido} onChange={(e) => setApellido(e.target.value)}/>
            </Form.Item>
            <Form.Item>
<DatePicker onChange={onChange} />
</Form.Item>
<Form.Item label='Género' name='genero' rules={[{ required: true, message: 'Seleccione el género' }]}>
  <Radio.Group onChange={(e) => setFkGenero(e.target.value)}>
    <Radio value="1">Masculino</Radio>
    <Radio value="2">Femenino</Radio>
  </Radio.Group>
</Form.Item>
            <Form.Item label='telefono' name='telefono' rules={[{ required: true, message: 'Ingrese el telefono' }]}>
              <Input value={telefono} onChange={(e) => setTelefono(e.target.value)}/>
            </Form.Item>
            <Form.Item label='correo' name='correo' rules={[{ required: true, message: 'Ingrese el correo' }]}>
              <Input value={correo} onChange={(e) => setCorreo(e.target.value)}/>
            </Form.Item>


          </Form>
        </Drawer>
        <Table columns={columns} dataSource={customers} size={'large'} style={{ width: '100%' }}/>
      </>
    );
  };

  export default CustomersTable;