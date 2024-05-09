import { Table } from "antd";
import { useEffect, useState } from "react";
import { User } from "../models/user";
import { getUsers } from "../services/user";
import { Button, Drawer } from 'antd';


const UsersTable: React.FC = () => {
	const [users, setUsers] = useState<User[]>([]);
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
				const users = await getUsers();
				setUsers(users);
			} catch (error) {
				console.error("Error fetching products:", error);
			}
		};

		fetchProducts();
	}, []);

	const columns = [
            {
              title: 'ID usuario',
              dataIndex: 'idusuario',
              key: 'idusuario'
            },
            {
              title: 'nombre',
              dataIndex: 'nombre',
              key: 'nombre'
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
              title: 'fecha de eliminacion',
              dataIndex: 'fechaeliminacion',
              key: 'fechaeliminacion'
            },
	];

	return (
		<>
          <Button type="primary" onClick={showDrawer}>
        Open
      </Button>
      <Drawer title="Basic Drawer" onClose={onClose} open={open}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
			<Table columns={columns} dataSource={users} size={'large'} style={{ width: '100%' }}/>
		</>
	);
};

export default UsersTable;