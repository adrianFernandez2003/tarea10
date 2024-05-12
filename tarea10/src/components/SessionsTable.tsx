import { Table } from "antd";
import { useEffect, useState } from "react";
import { Session } from "../models/session";
import { getSessions } from "../services/session";
import { Button, Drawer, Form, Input } from 'antd';
import DrawerFooter from "./DrawerFooter";

const SessionsTable: React.FC = () => {
	const [sessions, setSessions] = useState<Session[]>([]);
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
				const users = await getSessions();
				setSessions(users);
			} catch (error) {
				console.error("Error fetching products:", error);
			}
		};

		fetchProducts();
	}, []);

	const columns = [
        {
            title: 'ID sesion',
            dataIndex: 'idsesion',
            key: 'idsesion'
          },
          {
            title: 'fecha sesion',
            dataIndex: 'fechasesion',
            key: 'fechasesion'
          },
          {
            title: 'hora sesion',
            dataIndex: 'horasesion',
            key: 'horasesion'
          },
          {
            title: 'id cliente',
            dataIndex: 'fk_cliente',
            key: 'fk_cliente'
          },
          {
            title: 'fecha de venta',
            dataIndex: 'fechaventa',
            key: 'fechaventa'
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
          <Form.Item label='fecha de sesion' name='fechasesion' rules={[{ required: true, message: 'Ingrese una fecha' }]}>
            <Input/>
          </Form.Item>
          <Form.Item label='hora de sesion' name='horasesion' rules={[{ required: true, message: 'Ingrese una hora de sesion' }]}>
            <Input/>
          </Form.Item>
          <Form.Item label='fecha de venta' name='fechaventa' rules={[{ required: true, message: 'Ingrese una fecha de venta' }]}>
            <Input/>
          </Form.Item>
        </Form>
      </Drawer>
			<Table columns={columns} dataSource={sessions} size={'large'} style={{ width: '100%' }}/>
		</>
	);
};

export default SessionsTable;