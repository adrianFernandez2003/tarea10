import { Table } from "antd";
import { useEffect, useState } from "react";
import { Button, Drawer, Form, Input  } from 'antd';
import { Customer } from "../models/customer";
import { getCustomers } from "../services/customer";
import DrawerFooter from "./DrawerFooter";

const CustomersTable: React.FC = () => {
	const [customers, setCustomers] = useState<Customer[]>([]);
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
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

	return (
		<>
          <Button type="primary" onClick={showDrawer}>
        Open
      </Button>
      <Drawer title="Basic Drawer" onClose={onClose} open={open} footer={<DrawerFooter />}>
      <Form>
          <Form.Item label='nombre' name='nombre' rules={[{ required: true, message: 'Ingrese el nombre del cliente' }]}>
            <Input/>
          </Form.Item>
          <Form.Item label='apellido' name='apellido' rules={[{ required: true, message: 'Ingrese el apellido del cliente' }]}>
            <Input/>
          </Form.Item>
          <Form.Item label='fecha de nacimiento' name='fechanac' rules={[{ required: true, message: 'Ingrese la fecha de nacimiento' }]}>
            <Input/>
          </Form.Item>
          <Form.Item label='telefono' name='telefono' rules={[{ required: true, message: 'Ingrese el telefono' }]}>
            <Input/>
          </Form.Item>
          <Form.Item label='correo' name='correo' rules={[{ required: true, message: 'Ingrese el correo' }]}>
            <Input/>
          </Form.Item>
        </Form>
      </Drawer>
			<Table columns={columns} dataSource={customers} size={'large'} style={{ width: '100%' }}/>
		</>
	);
};

export default CustomersTable;