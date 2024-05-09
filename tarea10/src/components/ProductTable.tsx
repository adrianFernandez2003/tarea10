import { Table } from "antd";
import { useEffect, useState } from "react";
import { Product } from "../models/product";
import { getProducts } from "../services/product";
import { Button, Drawer } from 'antd';


const ProductTable: React.FC = () => {
	const [products, setProducts] = useState<Product[]>([]);
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
			<Table columns={columns} dataSource={products} size={'large'} style={{ width: '100%' }}/>
		</>
	);
};

export default ProductTable;