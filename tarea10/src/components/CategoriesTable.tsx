import { Table } from "antd";
import { useEffect, useState } from "react";
import { Button, Drawer, Form, Input } from 'antd';
import { Category } from "../models/category";
import { getCategories } from "../services/category";

const CategoryTable: React.FC = () => {
	const [categories, setCategories] = useState<Category[]>([]);
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
				const customers = await getCategories();
				setCategories(customers);
			} catch (error) {
				console.error("Error fetching products:", error);
			}
		};

		fetchProducts();
	}, []);

	const columns = [
        {
            title: 'ID categoria',
            dataIndex: 'idcategoria',
            key: 'idcategoria'
          },
          {
            title: 'nombre',
            dataIndex: 'nombre',
            key: 'nombre'
          },
          {
            title: 'fechacreacion',
            dataIndex: 'fechacreacion',
            key: 'fechacreacion'
          },
          {
            title: 'fecha actualizacion',
            dataIndex: 'fechaactualizacion',
            key: 'fechaactualizacion'
          },
          {
            title: 'fk_creadorpor',
            dataIndex: 'fk_creadopor',
            key: 'fk_creadopor'
          },
          {
            title: 'fk_actualizadopor',
            dataIndex: 'fk_actualizadopor',
            key: 'fk_actualizadopor'
          },
          {
            title: 'fecha eliminado',
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
      <Drawer title="Basic Drawer" onClose={onClose} open={open}>
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
			<Table columns={columns} dataSource={categories} size={'large'} style={{ width: '100%' }}/>
		</>
	);
};

export default CategoryTable;