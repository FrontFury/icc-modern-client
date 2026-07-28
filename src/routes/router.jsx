import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import About from "../pages/About/About/About"; // 1. Import your About component
import Science from "../pages/Departments/Science/Science/Science";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about", 
        element: <About />,
      },
      {
        path: "departments/science", 
        element: <Science></Science>,
      },
    ],
  },
]);