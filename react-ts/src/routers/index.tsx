import { Navigate, useRoutes } from "react-router-dom";
import { RouteObject } from "@/routers/interface";
import Login from "@/views/login/index";
import Register from "@/views/register/index";

// * import all routers
// const metaRouters = import.meta.globEager("./modules/*.tsx");
const metaRouters: Record<string, {
	[key: string]: any;
}> = import.meta.glob('./modules/*.tsx', { eager: true })

export const routerArray: RouteObject[] = [];
Object.keys(metaRouters).forEach(item => {
	Object.keys(metaRouters[item]).forEach((key) => {
		routerArray.push(...metaRouters[item][key]);
	});
});

export const rootRouter: RouteObject[] = [
	{
		path: "/",
		element: <Navigate to="/login" />
	},
	{
		path: "/login",
		element: <Login />,
		meta: {
			requiresAuth: false,
			title: "login page",
			key: "login"
		}
	},
	{
		path: "/register",
		element: <Register />,
		meta: {
			requiresAuth: false,
			title: "register page",
			key: "register"
		}
	},
	...routerArray,
	{
		path: "*",
		element: <Navigate to="/404" />
	}
];

const Router = () => {
	const routes = useRoutes(rootRouter);
	return routes;
};

export default Router;
