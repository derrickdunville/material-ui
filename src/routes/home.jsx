// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";

// core components/views
import Home from "views/Home/Home.jsx";
import Login from "views/Login/Login.jsx";

const homeRoutes = [
  {
    ...Home,
    path: '/',
    sidebarName: "Home",
    navbarName: "Welcome Home",
    icon: Dashboard,
    exact: true,
    component: Home.component
  },
  {
    ...Login,
    path: '/login',
    navbarName: "Login",
    sidebarName: "Login",
    icon: Dashboard,
  }
];

export default homeRoutes;
