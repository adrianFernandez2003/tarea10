import { Table } from "antd";
import { useEffect, useState } from "react";
import { Adress } from "../models/adress";
import { getAdresses } from "../services/adress";

const AdressesTable: React.FC = () => {
	const [adresses, setAdresses] = useState<Adress[]>([]);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const genders = await getAdresses();
				setAdresses(genders);
			} catch (error) {
				console.error("Error fetching products:", error);
			}
		};

		fetchProducts();
	}, []);

	const columns = [
        {
            title: 'ID direccion',
            dataIndex: 'iddireccion',
            key: 'iddireccion'
          },
          {
            title: 'codigo postal',
            dataIndex: 'codigopostal',
            key: 'codigopostal'
          },
          {
            title: 'calle',
            dataIndex: 'calle',
            key: 'calle'
          },
          {
            title: 'colonia',
            dataIndex: 'colonia',
            key: 'colonia'
          },
          {
            title: 'numext',
            dataIndex: 'numext',
            key: 'numext'
          },
          {
            title: 'numint',
            dataIndex: 'numint',
            key: 'numint'
          },
          {
            title: 'ciudad',
            dataIndex: 'ciudad',
            key: 'ciudad'
          },
          {
            title: 'fecha creacion',
            dataIndex: 'fechacreacion',
            key: 'fechacreacion'
          },
          {
            title: 'fecha actualizacion',
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
			<Table columns={columns} dataSource={adresses} size={'large'} style={{ width: '100%' }}/>
		</>
	);
};

export default AdressesTable;