import { createBrowserRouter, Navigate } from "react-router-dom";
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
import AddNotice from "../pages/Shared/AdminPage/AddNotice";
import OperatorLayout from "../layouts/OperatorLayout";
import Dashboard from "../pages/Operator/Dashboard/Dashboard";
import Academic from "../pages/Operator/Academic/Academic";
import UsersPage from "../pages/Operator/UsersPage/UsersPage";
import SystemPage from "../pages/Operator/SystemPage/SystemPage";
import AllNotices from "../pages/Operator/AllNotices/AllNotices";

// Operator Sub-Page Imports


export const router = createBrowserRouter([
  // Main Public/Student Portal Routes
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
        loader: () => fetch("http://localhost:5000/notices").then((res) => res.json()),
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

  // Operator / Admin Portal Nested Routes
  {
    path: "/operator",
    element: <OperatorLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "addNotices",
        element: <AddNotice />,
      },
      {
        path: "allNotices",
        element: <AllNotices/>
      },
      {
        path: "academic",
        element: <Academic />,
      },
      {
        path: "users",
        element: <UsersPage />,
      },
      {
        path: "system",
        element: <SystemPage />,
      },
    ],
  },
]);