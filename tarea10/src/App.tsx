import React, { useEffect, useState } from "react";
import { getProducts } from "./services/product";
import { Table } from "antd";
import { Product } from "./models/product";

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

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
      dataIndex: 'idProduct',
      key: 'idProduct',
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
    },
    {
      title: 'Fecha de Actualización',
      dataIndex: 'fechaActualizacion',
      key: 'fechaActualizacion',
    },
    {
      title: 'Creado Por',
      dataIndex: 'fk_creadoPor',
      key: 'fk_creadoPor',
    },
    {
      title: 'Actualizado Por',
      dataIndex: 'fk_actualizadopor',
      key: 'fk_actualizadopor',
    },
    {
      title: 'Fecha de Eliminación',
      dataIndex: 'fechaeliminacion',
      key: 'fechaeliminacion',
    },
    {
      title: 'Eliminado Por',
      dataIndex: 'fk_eliminadopor',
      key: 'fk_eliminadopor',
    },


  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={products}
      />
        
    </>
  );
}

export default App;