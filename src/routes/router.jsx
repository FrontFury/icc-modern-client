import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import About from "../pages/About/About/About"; // 1. Import your About component
import Science from "../pages/Departments/Science/Science/Science";
import Commerce from "../pages/Departments/Commerce/Commerce/Commerce";
import Arts from "../pages/Departments/Arts/Arts/Arts";
import Alumni from "../pages/Alumni/Alumni/Alumni";

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
      {
        path: "departments/commerce", 
        element: <Commerce></Commerce>
      },
      {
        path: "departments/arts", 
        element: <Arts></Arts>
      },
      {
        path: "alumni", 
        element: <Alumni></Alumni>
      },
    ],
  },
]);