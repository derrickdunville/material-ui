import Dashboard from "layouts/Dashboard/Dashboard.jsx";
import Home from "layouts/Home/Home.jsx";

const indexRoutes = [
  {
    ...Home,
    path: "/",
    exact: true
  }
];

export default indexRoutes;
