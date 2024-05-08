import { Table } from "antd";
import { useEffect, useState } from "react";
import { Category } from "../models/category";
import { getCategories } from "../services/category";

const CategoryTable: React.FC = () => {
	const [categories, setCategories] = useState<Category[]>([]);

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

	return (
		<>
			<Table columns={columns} dataSource={categories} size={'large'} style={{ width: '100%' }}/>
		</>
	);
};

export default CategoryTable;