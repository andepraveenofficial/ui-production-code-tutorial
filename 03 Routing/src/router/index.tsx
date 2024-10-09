// router.ts
import { lazy } from "react";

// Lazy loading for performance
const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const Contact = lazy(() => import("../pages/Contact"));

interface IRoute {
  path: string;
  element: JSX.Element;
}

const router: IRoute[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
];

export default router;
