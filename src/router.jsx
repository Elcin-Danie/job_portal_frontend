import { createBrowserRouter } from "react-router-dom";
import Admin from "./Components/Admin.jsx";
import Users from "./Components/Users.jsx";
import Seekers from "./Components/Seekers.jsx";
import Employ from "./Components/employs.jsx";
import Auth from "./Components/Auth.jsx";
import Home from "./pages/commen_files/Home.jsx";
import Notfound from "./pages/404/NotFound.jsx";
import Employ_form from "./pages/companies/form_one.jsx"
import Employ_form_two from "./pages/companies/form_two.jsx";
import Dashbord from "./pages/companies/dashbord.jsx";
// studens=================
import Studenst_dashbord from "./pages/studens/dashbord.jsx";
// auth ======================
import Register from "./pages/register/Register.jsx";
import Company_register_form from "./pages/register/company_hire_form.jsx";
// test modal
import Log_modal from "./pages/register/antd/login_modal.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Users />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/registration",
    element: <Auth />,
    children: [
      {
        path: "students",
        element: <Register />,
      },
      {
        path: "hire",
        element: <Company_register_form />,
      },
      {
        path: "register_1",
        element: <Employ_form />
      },
      {
        path: "rgs_2",
        element: <Employ_form_two />
      },
      {
        path: "modal",
        element: <Log_modal />,
      },
    ],
  },
  {
    path: "studens",
    element: <Seekers />,
    children: [
      {
        path: "dashboard",
        element: <Studenst_dashbord />,
      },
    ],
  },
  {
    path: "companie",
    element: <Employ />,
    children: [
      {
        path: "dashboard",
        element: <Dashbord />,
      },
    ],
  },
  {
    path: "*",
    element: <Notfound />,
  },
]);
export default router;
