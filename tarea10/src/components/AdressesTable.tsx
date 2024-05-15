import { Table } from "antd";
import { useEffect, useState } from "react";
import { Button, Drawer, Form, Input } from 'antd';
import { Adress } from "../models/adress";
import { createDireccion, getAdresses } from "../services/adress";
import DrawerFooter from "./DrawerFooter";
import supabase from "../utils/supabase";

const AdressesTable: React.FC = () => {
	const [adresses, setAdresses] = useState<Adress[]>([]);
  const [open, setOpen] = useState(false);
  const [codigopostal, setCodigoPostal] = useState<string>('');
  const [calle, setCalle] = useState<string>('');
  const [colonia, setColonia] = useState<string>('');
  const [numext, setNumExt] = useState<string>('');
  const [numint, setNumInt] = useState<string>('');
  const [ciudad, setCiudad] = useState<string>('');

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const genders = await getAdresses();
				setAdresses(genders);
			} catch (error) {
				console.error("Error fetching products:", error);
			}
		};

		fetchProducts();
	}, []);

	const columns = [
        {
            title: 'ID direccion',
            dataIndex: 'iddireccion',
            key: 'iddireccion'
          },
          {
            title: 'codigo postal',
            dataIndex: 'codigopostal',
            key: 'codigopostal'
          },
          {
            title: 'calle',
            dataIndex: 'calle',
            key: 'calle'
          },
          {
            title: 'colonia',
            dataIndex: 'colonia',
            key: 'colonia'
          },
          {
            title: 'numext',
            dataIndex: 'numext',
            key: 'numext'
          },
          {
            title: 'numint',
            dataIndex: 'numint',
            key: 'numint'
          },
          {
            title: 'ciudad',
            dataIndex: 'ciudad',
            key: 'ciudad'
          },
          {
            title: 'fecha creacion',
            dataIndex: 'fechacreacion',
            key: 'fechacreacion'
          },
          {
            title: 'fecha actualizacion',
            dataIndex: 'fechaactualizacion',
            key: 'fechaactualizacion'
          },
          {
          title: 'creado por',
          dataIndex: 'fk_creadopor',
          key: 'fk_creadopor'
        },
        {
          title: 'actualizado por',
          dataIndex: 'fk_actualizadopor',
          key: 'fk_actualizadopor'
        },
        {
          title: 'fecha de eliminacion',
          dataIndex: 'fechaeliminacion',
          key: 'fechaeliminacion'
        },
        {
          title: 'eliminado por',
          dataIndex: 'fk_eliminadopor',
          key: 'fk_eliminadopor'
        },
        
	];
  const onChangeCodigoPostal = (value: string | null | undefined) => {
    if (value !== null && value !== undefined) {
      setCodigoPostal(value);
    } else {
      setCodigoPostal('');
    }
  };
  const handleSubmit = async () => {
    try {
      const currentDateTime = new Date();
      // Consultar el ID máximo actual en la tabla direccion
      const maxIdResponse = await supabase
        .from("direccion")
        .select("iddireccion")
        .order("iddireccion", { ascending: false })
        .limit(1);
  
      const maxId = maxIdResponse.data?.[0]?.iddireccion || 0;
      const newId = maxId + 1;
  
      // Crear el objeto de dirección con el nuevo ID
      const direccionInput: Adress = {
        iddireccion: newId,
        codigopostal,
        calle,
        colonia,
        ciudad,
        numext,
        numint,
        fechacreacion: currentDateTime, 
      };
  
      // Insertar el nuevo registro en la base de datos
      await createDireccion(direccionInput);
  
      // Actualizar la lista de direcciones después de la inserción
      const updatedDireccion = await getAdresses();
      setAdresses(updatedDireccion);
      onClose();
    } catch (error) {
      console.error("Error creating direccion:", error);
    }
  };

  
	return (
		<>
          <Button type="primary" onClick={showDrawer}>
        Open
      </Button>
      <Drawer title="Basic Drawer" onClose={onClose} open={open} footer={<DrawerFooter createRecord={handleSubmit}/>}>
        <Form onFinish={handleSubmit}>
          <Form.Item label='codigo postal' name='codigopostal' rules={[{ required: true, message: 'Ingrese su codigo postal' }]}>
            <Input value={codigopostal} onChange={(e) => setCodigoPostal(e.target.value)}/>
          </Form.Item>
          <Form.Item label='calle' name='calle' rules={[{ required: true, message: 'Ingrese su calle' }]}>
            <Input value={calle} onChange={(e) => setCalle(e.target.value)}/>
          </Form.Item>
          <Form.Item label='colonia' name='colonia' rules={[{ required: true, message: 'Ingrese su colonia' }]}>
            <Input value={colonia} onChange={(e) => setColonia(e.target.value)}/>
          </Form.Item>
          <Form.Item label='numero exterior' name='numext' rules={[{ required: true, message: 'Ingrese su numero exterior' }]}>
            <Input value={numext} onChange={(e) => setNumExt(e.target.value)}/>
          </Form.Item>
          <Form.Item label='numero interior' name='numint' rules={[{ required: true, message: 'Ingrese su numero interior' }]}>
            <Input value={numint} onChange={(e) => setNumInt(e.target.value)}/>
          </Form.Item>
          <Form.Item label='ciudad' name='ciudad' rules={[{ required: true, message: 'Ingrese su ciudad' }]}>
            <Input value={ciudad} onChange={(e) => setCiudad(e.target.value)}/>
          </Form.Item>
        </Form>
      </Drawer>
			<Table columns={columns} dataSource={adresses} size={'large'} style={{ width: '100%' }}/>
		</>
	);
};

export default AdressesTable;