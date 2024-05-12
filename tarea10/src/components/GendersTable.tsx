import { Table } from "antd";
import { useEffect, useState } from "react";
import { Button, Drawer, Form, Input } from 'antd';
import { Gender } from "../models/gender";
import { getGenders } from "../services/gender";
import DrawerFooter from "./DrawerFooter";

const GendersTable: React.FC = () => {
	const [genders, setGenders] = useState<Gender[]>([]);
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
				const genders = await getGenders();
				setGenders(genders);
			} catch (error) {
				console.error("Error fetching products:", error);
			}
		};

		fetchProducts();
	}, []);

	const columns = [
        {
            title: 'ID genero',
            dataIndex: 'idgenero',
            key: 'idgenero'
          },
          {
            title: 'genero',
            dataIndex: 'genero',
            key: 'genero'
          },
          {
            title: 'fecha de creacion',
            dataIndex: 'fechacreacion',
            key: 'fechacreacion'
          },
          {
            title: 'fecha de actualizacion',
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
          <Form.Item label='genero' name='genero' rules={[{ required: true, message: 'Ingrese un genero' }]}>
            <Input/>
          </Form.Item>
        </Form>
      </Drawer>
			<Table columns={columns} dataSource={genders} size={'large'} style={{ width: '100%' }}/>
		</>
	);
};

export default GendersTable;