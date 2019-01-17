import AdminDashboard from "../layouts/AdminDashboard.jsx"
import AppPage from "../views/App/AppPage.jsx"

export default [
  {
    ...AdminDashboard,
    path: '/app/admin',
    title: "Admin",
    routes: [
      {
        ...AppPage,
        path: '/app/admin/1',
        title: "Admin Page 1"
      },
      {
        ...AppPage,
        path: '/app/admin/2',
        title: "Admin Page 2"
      },
      {
        ...AppPage,
        path: '/app/admin/3',
        title: "Admin Page 3"
      }
    ]
  }
]
