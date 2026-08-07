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
import AdminRoute from "./RoleRoute";
import ForbiddenPage from "../pages/Shared/ForbiddenPage/ForbiddenPage";
import RoleRoute from "./RoleRoute";
import AddFaculty from "../pages/Operator/AddFaculty/AddFaculty";
import AllFaculty from "../pages/Operator/AllFaculty/AllFaculty";
import AddGallery from "../pages/Operator/AddGallery/AddGallery";
import ManageGallery from "../pages/Operator/ManageGallery/ManageGallery";
import AllGallery from "../pages/Home/AllGallery/AllGallery";

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
        path: "allGallery",
        element: <AllGallery/>,
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
    element: (
      <PrivateRoute>
        <OperatorLayout />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" replace />,
      },

      // Both Admin & Operator
      {
        path: "dashboard",
        element: (
          <RoleRoute allowedRoles={["admin", "operator"]}>
            <Dashboard />
          </RoleRoute>
        ),
      },

      // Operator Only
      {
        path: "addNotices",
        element: (
          <RoleRoute allowedRoles={["operator"]}>
            <AddNotice />
          </RoleRoute>
        ),
      },
      {
        path: "allNotices",
        element: (
          <RoleRoute allowedRoles={["operator"]}>
            <AllNotices />
          </RoleRoute>
        ),
      },
      {
        path: "addFaculty",
        element: (
          <RoleRoute allowedRoles={["operator"]}>
            <AddFaculty/>
          </RoleRoute>
        ),
      },
      {
        path: "allFaculty",
        element: (
          <RoleRoute allowedRoles={["operator"]}>
            <AllFaculty/>
          </RoleRoute>
        ),
      },
      {
        path: "addGallery",
        element: (
          <RoleRoute allowedRoles={["operator"]}>
            <AddGallery/>
          </RoleRoute>
        ),
      },
      {
        path: "manageGallery",
        element: (
          <RoleRoute allowedRoles={["operator"]}>
            <ManageGallery/>
          </RoleRoute>
        ),
      },
      {
        path: "academic",
        element: (
          <RoleRoute allowedRoles={["operator"]}>
            <Academic />
          </RoleRoute>
        ),
      },
      {
        path: "system",
        element: (
          <RoleRoute allowedRoles={["operator"]}>
            <SystemPage />
          </RoleRoute>
        ),
      },

      // Admin Only
      {
        path: "users",
        element: (
          <RoleRoute allowedRoles={["admin"]}>
            <UsersPage />
          </RoleRoute>
        ),
      },

      {
        path: "forbidden",
        element: <ForbiddenPage />,
      },
    ],
  },
]);