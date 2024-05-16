import { Table } from "antd";
import { useEffect, useState } from "react";
import { User } from "../models/user";
import { createUser, getUsers } from "../services/user";
import { Button, Drawer, Form, Input } from 'antd';
import DrawerFooter from "./DrawerFooter";
import supabase from "../utils/supabase";

const UsersTable: React.FC = () => {
	const [users, setUsers] = useState<User[]>([]);
  const [open, setOpen] = useState(false);
  const [nombre, setNombre] = useState<string>('');

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
  const handleSubmit = async () => {
    try {
      const currentDateTime = new Date();
      // Consultar el ID máximo actual en la tabla direccion
      const maxIdResponse = await supabase
        .from("usuarios")
        .select("idusuario")
        .order("idusuario", { ascending: false })
        .limit(1);
  
      const maxId = maxIdResponse.data?.[0]?.idusuario || 0;
      const newId = maxId + 1;
  
      // Crear el objeto de dirección con el nuevo ID
      const categoryInput: User = {
        idusuario: newId,
        nombre,
        fechacreacion: currentDateTime, 
      };
  
      // Insertar el nuevo registro en la base de datos
      await createUser(categoryInput);
  
      // Actualizar la lista de direcciones después de la inserción
      const uptatedCategory = await getUsers();
      setUsers(uptatedCategory);
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
      <Form>
          <Form.Item label='nombre' name='nombre' rules={[{ required: true, message: 'Ingrese el nombre del usuario' }]}>
            <Input value={nombre} onChange={(e) => setNombre(e.target.value)}/>
          </Form.Item>
        </Form>
      </Drawer>
			<Table columns={columns} dataSource={users} size={'large'} style={{ width: '100%' }}/>
		</>
	);
};

export default UsersTable;