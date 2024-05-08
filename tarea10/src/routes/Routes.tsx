import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Home";
import Collections from "../pages/collections/Collections";
import ProductsCollections from "../pages/collections/Products/ProductsCollections.tsx";
import AdressesCollections from "../pages/collections/Adresses/AdressesCollections.tsx";
import CategoriesCollections from "../pages/collections/Categories/CategoriesCollections.tsx";
import CustomersCollections from "../pages/collections/Customers/CustomersCollections.tsx";
import GendersCollections from "../pages/collections/Genders/GendersCollections.tsx";
import ProductSessionsCollections from "../pages/collections/ProductSessions/ProductSessions.tsx";
import SessionsCollections from "../pages/collections/Sessions/SessionsCollections.tsx";
import UsersCollections from "../pages/collections/Users/UsersCollections.tsx";


export const Router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{ path: "", element: <Home /> },
			{
				path: "collections",
				element: <Collections />,
				children: [
          { path: "productos", element: <ProductsCollections /> },
          { path: "direcciones", element: <AdressesCollections /> },
          { path: "categorias", element: <CategoriesCollections /> },
          { path: "clientes", element: <CustomersCollections /> },
          { path: "generos", element: <GendersCollections /> },
          { path: "sesionProductos", element: <ProductSessionsCollections /> },
          { path: "sesiones", element: <SessionsCollections /> },
          { path: "usuarios", element: <UsersCollections /> },
        ],
			},
		],
	},
]);