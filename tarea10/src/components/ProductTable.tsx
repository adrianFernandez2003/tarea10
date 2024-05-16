import { Table } from "antd";
import { useEffect, useState } from "react";
import { Product } from "../models/product";
import { createProduct, getProducts } from "../services/product";
import { Button, Drawer, Form, Input } from 'antd';
import DrawerFooter from "./DrawerFooter";
import { create } from "@mui/material/styles/createTransitions";
import supabase from "../utils/supabase";


const ProductTable: React.FC = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const [open, setOpen] = useState(false);
	const [descripcion, setDescripcion] = useState<string>('');
	const [precio, setPrecio] = useState<number>(0);

	const showDrawer = () => {
	  setOpen(true);
	};
  
	const onClose = () => {
	  setOpen(false);
	};

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const products = await getProducts();
				setProducts(products);
			} catch (error) {
				console.error("Error fetching products:", error);
			}
		};

		fetchProducts();
	}, []);

	const columns = [
			{
			  title: 'ID Producto',
			  dataIndex: 'idproducto',
			  key: 'idproducto',
			},
			{
			  title: 'Descripción',
			  dataIndex: 'descripcion',
			  key: 'descripcion',
			},
			{
			  title: 'Precio',
			  dataIndex: 'precio',
			  key: 'precio',
			},
			{
			  title: 'Categoría',
			  dataIndex: 'fk_categoria',
			  key: 'fk_categoria',
			},
			{
			  title: 'Fecha de Creación',
			  dataIndex: 'fechaCreacion',
			  key: 'fechaCreacion',
			}
	];
	
    const handleSubmit = async () => {
		try {

		  const currentDateTime = new Date();
		  // Consultar el ID máximo actual en la tabla clientes
		  const maxIdResponse = await supabase
			.from("productos")
			.select("idproducto")
			.order("idproducto", { ascending: false })
			.limit(1);
	  
		  const maxId = maxIdResponse.data?.[0]?.idproducto || 0;
		  const newId = maxId + 1;
	  
		  // Crear el objeto de cliente con el nuevo ID
		  const categoryInput: Product = {
			idproducto: newId,
			descripcion,
			precio,
			fechacreacion: currentDateTime, 
		  };
	  
		  // Insertar el nuevo registro en la base de datos
		  await createProduct(categoryInput);
	  
		  // Actualizar la lista de clientes después de la inserción
		  const updatedCategory = await getProducts();
		  setProducts(updatedCategory);
		  onClose();
		} catch (error) {
		  console.error("Error creating cliente:", error);
		}
	  };
  
	return (
		<>
		      <Button type="primary" onClick={showDrawer}>
        Open
      </Button>
      <Drawer title="Basic Drawer" onClose={onClose} open={open} footer={<DrawerFooter createRecord={handleSubmit}/>}>
      <Form>
          <Form.Item label='descripcion' name='descripcion' rules={[{ required: true, message: 'Ingrese una descripcion' }]}>
            <Input value={descripcion} onChange={(e) => setDescripcion(e.target.value)}/>
          </Form.Item>
          <Form.Item label='precio' name='precio' rules={[{ required: true, message: 'Ingrese un precio' }]}>
            <Input value={precio} onChange={(e) => setPrecio(parseInt(e.target.value))}/>
          </Form.Item>
        </Form>
      </Drawer>
			<Table columns={columns} dataSource={products} size={'large'} style={{ width: '100%' }}/>
		</>
	);
};

export default ProductTable;