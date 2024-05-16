import { Table } from "antd";
import { useEffect, useState } from "react";
import { Button, Drawer, Form, Input } from 'antd';
import { Category } from "../models/category";
import { getCategories, createCategoria } from "../services/category";
import DrawerFooter from "./DrawerFooter";
import supabase from "../utils/supabase";

const CategoryTable: React.FC = () => {
	const [categories, setCategories] = useState<Category[]>([]);
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
      const categoryInput: Category = {
        idcategoria: newId,
        nombre,
        fechacreacion: currentDateTime, 
      };
  
      // Insertar el nuevo registro en la base de datos
      await createCategoria(categoryInput);
  
      // Actualizar la lista de direcciones después de la inserción
      const uptatedCategory = await getCategories();
      setCategories(uptatedCategory);
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
          <Form.Item label='nombre de la categoria' name='nombre' rules={[{ required: true, message: 'Ingrese el nombre de la categoria' }]}>
            <Input value={nombre} onChange={(e) => setNombre(e.target.value)}/>
          </Form.Item>
        </Form>
      </Drawer>
			<Table columns={columns} dataSource={categories} size={'large'} style={{ width: '100%' }}/>
		</>
	);
};

export default CategoryTable;