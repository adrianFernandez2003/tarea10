import { Table } from "antd";
import { useEffect, useState } from "react";
import { Customer } from "../models/customer";
import { getCustomers } from "../services/customer";

const CustomersTable: React.FC = () => {
	const [customers, setCustomers] = useState<Customer[]>([]);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const customers = await getCustomers();
				setCustomers(customers);
			} catch (error) {
				console.error("Error fetching products:", error);
			}
		};

		fetchProducts();
	}, []);

	const columns = [
        {
            title: 'ID clientes',
            dataIndex: 'idclientes',
            key: 'idclientes'
          },
          {
            title: 'nombre',
            dataIndex: 'nombre',
            key: 'nombre'
          },
          {
            title: 'apellido',
            dataIndex: 'apellido',
            key: 'apellido'
          },
          {
            title: 'fecha nacimiento',
            dataIndex: 'fechanac',
            key: 'fechanac'
          },
          {
            title: 'genero',
            dataIndex: 'fk_genero',
            key: 'fk_genero'
          },
          {
            title: 'telefono',
            dataIndex: 'telefono',
            key: 'telefono'
          },
          {
            title: 'correo',
            dataIndex: 'correo',
            key: 'correo'
          },
          {
            title: 'direccion',
            dataIndex: 'fk_direccion',
            key: 'fk_direccion'
          },
          {
            title: 'fecha creacion',
            dataIndex: 'fechacreacion',
            key: 'fechacreacion'
          },
          {
            title: 'fecha de actualizacion',
            dataIndex: 'fechaactualizacion',
            key: 'fechaactualizacion'
          },
          {
            title: 'fk_creadorpor',
            dataIndex: 'fk_creadorpor',
            key: 'fk_creadorpor'
          },
          {
            title: 'fk_actualizadopor',
            dataIndex: 'fk_actualizadopor',
            key: 'fk_actualizadopor'
          },
          {
            title: 'fecha eliminado',
            dataIndex: 'fechaeliminado',
            key: 'fechaeliminado'
          },
          {
            title: 'eliminado por',
            dataIndex: 'fk_eliminadopor',
            key: 'fk_eliminadopor'
          },
	];

	return (
		<>
			<Table columns={columns} dataSource={customers} size={'large'} style={{ width: '100%' }}/>
		</>
	);
};

export default CustomersTable;