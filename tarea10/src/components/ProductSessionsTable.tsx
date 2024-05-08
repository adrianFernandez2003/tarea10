import { Table } from "antd";
import { useEffect, useState } from "react";
import { ProductSession } from "../models/productSession";
import { getProductSessions } from "../services/productSession";

const ProductSessionsTable: React.FC = () => {
	const [productSessions, setProductSessions] = useState<ProductSession[]>([]);

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

	return (
		<>
			<Table columns={columns} dataSource={productSessions} size={'large'} style={{ width: '100%' }}/>
		</>
	);
};

export default ProductSessionsTable;