import { Table } from "antd";
import { useEffect, useState } from "react";
import { Button, Drawer, Form, Input } from 'antd';
import { Adress } from "../models/adress";
import { getAdresses } from "../services/adress";
import DrawerFooter from "./DrawerFooter";

const AdressesTable: React.FC = () => {
	const [adresses, setAdresses] = useState<Adress[]>([]);
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

	return (
		<>
          <Button type="primary" onClick={showDrawer}>
        Open
      </Button>
      <Drawer title="Basic Drawer" onClose={onClose} open={open} footer={<DrawerFooter />}>
        <Form>
          <Form.Item label='codigo postal' name='codigoPostal' rules={[{ required: true, message: 'Ingrese su codigo postal' }]}>
            <Input/>
          </Form.Item>
          <Form.Item label='calle' name='calle' rules={[{ required: true, message: 'Ingrese su calle' }]}>
            <Input/>
          </Form.Item>
          <Form.Item label='colonia' name='colonia' rules={[{ required: true, message: 'Ingrese su colonia' }]}>
            <Input/>
          </Form.Item>
          <Form.Item label='numero exterior' name='numext' rules={[{ required: true, message: 'Ingrese su numero exterior' }]}>
            <Input/>
          </Form.Item>
          <Form.Item label='numero interior' name='numint' rules={[{ required: true, message: 'Ingrese su numero interior' }]}>
            <Input/>
          </Form.Item>
          <Form.Item label='ciudad' name='ciudad' rules={[{ required: true, message: 'Ingrese su ciudad' }]}>
            <Input/>
          </Form.Item>
        </Form>
      </Drawer>
			<Table columns={columns} dataSource={adresses} size={'large'} style={{ width: '100%' }}/>
		</>
	);
};

export default AdressesTable;