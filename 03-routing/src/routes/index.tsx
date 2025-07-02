import type { ComponentType } from "react";
import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Loading from "../components/Loading";

// Lazy load page components
const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const Contact = lazy(() => import("../pages/Contact"));
const NotFound = lazy(() => import("../pages/NotFound"));

// Wrap lazy loaded components with Suspense
const withSuspense = (Component: ComponentType) => (
	<Suspense fallback={<Loading />}>
		<Component />
	</Suspense>
);

const ErrorElement = () => <h1>I am Error Element</h1>;

// Define routes configuration
export const routes: RouteObject[] = [
	{
		path: "/",
		element: <MainLayout />,
		errorElement: <ErrorElement />, // runtime error
		children: [
			{
				index: true, // This makes it the default route
				element: withSuspense(Home),
			},
			{
				path: "about",
				element: withSuspense(About),
			},
			{
				path: "contact",
				element: withSuspense(Contact),
			},
			{
				path: "*", // Catch all routes that don't match
				element: <NotFound />, // missing error
			},
		],
	},
];

// Create and export the router
export const router = createBrowserRouter(routes);

export default router;
