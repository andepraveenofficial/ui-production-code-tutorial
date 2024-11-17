import { lazy } from "react";
import PublicRoutes from "./PublicRoutes";
import ProtectedRoute from "./ProtectedRoutes";

// Lazy loading for performance
const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const Contact = lazy(() => import("../pages/Contact"));
const Login = lazy(() => import("../pages/Login"));
const Course = lazy(() => import("../pages/Course"));
const Support = lazy(() => import("../pages/Support"));
const Unauthorized = lazy(() => import("../pages/Unauthorized"));

interface IRoute {
	path: string;
	element: JSX.Element;
	children?: IRoute[];
}

const router: IRoute[] = [
	// Public routes (accessible to all users)
	{
		path: "/",
		element: <PublicRoutes />,
		children: [
			{
				path: "",
				element: <Home />, // Home will be at the root path
			},
			{
				path: "about",
				element: <About />,
			},
			{
				path: "contact",
				element: <Contact />,
			},
			{
				path: "login",
				element: <Login />,
			},
		],
	},
	// Private routes (accessible only to authenticated users)
	{
		path: "/dashboard",
		element: <ProtectedRoute allowedRoles={["admin"]} />,
		children: [
			{
				path: "course", // ->  /dashboard/course
				element: <Course />,
			},
			{
				path: "support", // -> /dashboard/support
				element: <Support />,
			},
		],
	},
];

export default router;
