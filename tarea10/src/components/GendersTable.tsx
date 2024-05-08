import { Table } from "antd";
import { useEffect, useState } from "react";
import { Gender } from "../models/gender";
import { getGenders } from "../services/gender";

const GendersTable: React.FC = () => {
	const [genders, setGenders] = useState<Gender[]>([]);

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

	return (
		<>
			<Table columns={columns} dataSource={genders} size={'large'} style={{ width: '100%' }}/>
		</>
	);
};

export default GendersTable;