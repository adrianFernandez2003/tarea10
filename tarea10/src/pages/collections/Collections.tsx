import React from "react";
import { Space, Row, Card, Button, Typography } from "antd";
import { Link, Outlet, useOutlet } from "react-router-dom";
import { toTitleCase } from "../../utils/stringFormater";

interface Collection {
	id: number;
	title: string;
	description: string;
	key: string;
}

interface CollectionsProps {}

const Collections: React.FC<CollectionsProps> = () => {
	
	const outlet = useOutlet();
	const collectionsData: Collection[] = [
		{
			id: 1,
			title: "Productos",
			description: "Descripción de la colección 1",
			key: "productos",
		},
		{
			id: 2,
			title: "direccion",
			description: "Descripción de la colección 2",
			key: "direcciones",
		},
		{
			id: 3,
			title: "categorias",
			description: "Descripción de la colección 3",
			key: "Categorias",
		},
		{
			id: 4,
			title: "clientes",
			description: "Descripción de la colección 3",
			key: "clientes",
		},
		{
			id: 5,
			title: "generos",
			description: "Descripción de la colección 3",
			key: "generos",
		},
		{
			id: 6,
			title: "sesionProductos",
			description: "Descripción de la colección 3",
			key: "sesionProductos",
		},
		{
			id: 7,
			title: "sesiones",
			description: "Descripción de la colección 3",
			key: "sesiones",
		},
		{
			id: 8,
			title: "usuarios",
			description: "Descripción de la colección 3",
			key: "usuarios",
		},
	];

	if (!outlet) {return (
		<>
			<Typography.Title>Colecciones</Typography.Title>
			<Space direction="vertical" size={20}>
				<Row gutter={16}>
					{collectionsData.map((collection) => (
						<Space key={collection.id} direction="vertical">
							<Card
								title={toTitleCase(collection.title)}
								extra={
									<Button type="primary">
										<Link to={`/collections/${collection.key}`}>Ver</Link>
									</Button>
								}
								style={{ width: 300 }}
							>
								{collection.description}
							</Card>
						</Space>
					))}
				</Row>
			</Space>
			
		</>
	);}
	return <Outlet/>
};

export default Collections;