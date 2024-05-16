import { Table } from "antd";
import { useEffect, useState } from "react";
import { Button, Drawer, Form, Input } from 'antd';
import { Gender } from "../models/gender";
import { createGender, getGenders } from "../services/gender";
import DrawerFooter from "./DrawerFooter";
import supabase from "../utils/supabase";

const GendersTable: React.FC = () => {
	const [genders, setGenders] = useState<Gender[]>([]);
  const [open, setOpen] = useState(false);
  const [genero, setGenero] = useState<string>("");


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
  const handleSubmit = async () => {
    try {
      const currentDateTime = new Date();
      // Consultar el ID máximo actual en la tabla direccion
      const maxIdResponse = await supabase
        .from("genero")
        .select("idgenero")
        .order("idgenero", { ascending: false })
        .limit(1);
  
      const maxId = maxIdResponse.data?.[0]?.idgenero || 0;
      const newId = maxId + 1;
  
      // Crear el objeto de dirección con el nuevo ID
      const categoryInput: Gender = {
        idgenero: newId,
        genero,
        fechacreacion: currentDateTime
      };
  
      // Insertar el nuevo registro en la base de datos
      await createGender(categoryInput);
  
      // Actualizar la lista de direcciones después de la inserción
      const uptatedCategory = await getGenders();
      setGenders(uptatedCategory);
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
          <Form.Item label='genero' name='genero' rules={[{ required: true, message: 'Ingrese un genero' }]}>
            <Input value={genero} onChange={(e) => setGenero(e.target.value)}/>
          </Form.Item>
        </Form>
      </Drawer>
			<Table columns={columns} dataSource={genders} size={'large'} style={{ width: '100%' }}/>
		</>
	);
};

export default GendersTable;