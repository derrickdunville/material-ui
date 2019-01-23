import AdminDashboard from "../layouts/AdminDashboard.jsx"
import AppPage from "../views/App/AppPage.jsx"

export default [
  {
    ...AdminDashboard,
    path: '/admin/',
    title: "Admin",
    routes: [
      {
        ...AppPage,
        path: '/admin/',
        exact: true,
        title: "Admin Main Page",
        zIndex: 1
      },
      {
        ...AppPage,
        path: '/admin/1',
        title: "Admin Page 1",
        zIndex: 1
      },
      {
        ...AppPage,
        path: '/admin/2',
        title: "Admin Page 2",
        zIndex: 1
      },
      {
        ...AppPage,
        path: '/admin/3',
        title: "Admin Page 3",
        zIndex: 1
      }
    ]
  }
]
