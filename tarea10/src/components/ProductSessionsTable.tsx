import { Table } from "antd";
import { useEffect, useState } from "react";
import { ProductSession } from "../models/productSession";
import { createSesionProducto, getProductSessions } from "../services/productSession";
import { Button, Drawer, Form, Input } from 'antd';
import DrawerFooter from "./DrawerFooter";
import supabase from "../utils/supabase";

const ProductSessionsTable: React.FC = () => {
	const [productSessions, setProductSessions] = useState<ProductSession[]>([]);
	const [open, setOpen] = useState(false);
	const [cantidad, setCantidad] = useState<number>(0);

	const showDrawer = () => {
	  setOpen(true);
	};
  
	const onClose = () => {
	  setOpen(false);
	};

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const customers = await getProductSessions();
				setProductSessions(customers);
			} catch (error) {
				console.error("Error fetching products:", error);
			}
		};

		fetchProducts();
	}, []);

	const columns = [
        {
            title: 'sesion',
            dataIndex: 'fk_sesion',
            key: 'fk_sesion'
          },
          {
            title: 'ID producto',
            dataIndex: 'fk_producto',
            key: 'fk_producto'
          },
          {
            title: 'cantidad',
            dataIndex: 'cantidad',
            key: 'cantidad'
          },
	];
	const handleSubmit = async () => {
		const randomID =  Math.floor(Math.random() * (5 - 1 + 1)) + 1;
		try {
		  await createSesionProducto({
			fk_sesion: randomID,
			fk_producto: randomID,
			cantidad  });
		  const updateSesionesProductos = await getProductSessions();
		  setProductSessions(updateSesionesProductos);
		  onClose();
		} catch (error) {
		  console.error("Error creating usuario:", error);
		}
	  };
	
	return (
		<>
		      <Button type="primary" onClick={showDrawer}>
        Open
      </Button>
      <Drawer title="Basic Drawer" onClose={onClose} open={open} footer={<DrawerFooter createRecord={handleSubmit}/>}>
      <Form>
          <Form.Item label='cantidad' name='cantidad' rules={[{ required: true, message: 'Ingrese una cantidad' }]}>
            <Input value={cantidad} onChange={(e) => setCantidad(parseInt(e.target.value))}/>
          </Form.Item>
        </Form>
      </Drawer>
			<Table columns={columns} dataSource={productSessions} size={'large'} style={{ width: '100%' }}/>
		</>
	);
};

export default ProductSessionsTable;