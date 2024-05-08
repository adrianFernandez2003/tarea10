import { Table } from "antd";
import { useEffect, useState } from "react";
import { Session } from "../models/session";
import { getSessions } from "../services/session";

const SessionsTable: React.FC = () => {
	const [sessions, setSessions] = useState<Session[]>([]);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const users = await getSessions();
				setSessions(users);
			} catch (error) {
				console.error("Error fetching products:", error);
			}
		};

		fetchProducts();
	}, []);

	const columns = [
        {
            title: 'ID sesion',
            dataIndex: 'idsesion',
            key: 'idsesion'
          },
          {
            title: 'fecha sesion',
            dataIndex: 'fechasesion',
            key: 'fechasesion'
          },
          {
            title: 'hora sesion',
            dataIndex: 'horasesion',
            key: 'horasesion'
          },
          {
            title: 'id cliente',
            dataIndex: 'fk_cliente',
            key: 'fk_cliente'
          },
          {
            title: 'fecha de venta',
            dataIndex: 'fechaventa',
            key: 'fechaventa'
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
			<Table columns={columns} dataSource={sessions} size={'large'} style={{ width: '100%' }}/>
		</>
	);
};

export default SessionsTable;