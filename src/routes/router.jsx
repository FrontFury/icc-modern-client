import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import About from "../pages/About/About/About";
import Science from "../pages/Departments/Science/Science/Science";
import Commerce from "../pages/Departments/Commerce/Commerce/Commerce";
import Arts from "../pages/Departments/Arts/Arts/Arts";
import Alumni from "../pages/Alumni/Alumni/Alumni";
import ContactPage from "../pages/ContactPage/ContactPage/ContactPage";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import Faculty from "../pages/FacultyDirectory/Faculty/Faculty";
import NoticeBoard from "../pages/NoticeBoard/NoticeBoard";
import Admission from "../pages/Admission/Admission/Admission";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage />,
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
        element: <Science />,
      },
      {
        path: "departments/commerce",
        element: <Commerce />,
      },
      {
        path: "departments/arts",
        element: <Arts />,
      },
      {
        path: "alumni",
        element: (
          <PrivateRoute>
            <Alumni />
          </PrivateRoute>
        ),
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "signIn",
        element: <SignIn />,
      },
      {
        path: "signUp",
        element: <SignUp />,
      },
      {
        path: "faculty",
        element: <Faculty />,
      },
      {
        path: "notices",
        element: <NoticeBoard />,
        loader: () => fetch("/notices.json").then((res) => res.json()),
      },
      {
        path: "admission",
        element: (
          <PrivateRoute>
            <Admission />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
