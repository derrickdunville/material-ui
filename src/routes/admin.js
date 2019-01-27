import AdminDashboard from "../layouts/AdminDashboard.jsx"
import AppPage from "../views/App/AppPage.jsx"
import Products from "../views/Admin/Products/Products.jsx"
import Users from "../views/Admin/Users/Users.jsx"
import User from "../views/Admin/Users/User.jsx"
import Transactions from "../views/Admin/Transactions/Transactions.jsx"
import Subscriptions from "../views/Admin/Subscriptions/Subscriptions.jsx"
import UsersContainer from "../containers/UsersContainer.jsx"

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
        title: "Dashboard",
        zIndex: 1
      },
      {
        ...UsersContainer,
        path: '/admin/users',
        title: "Users",
        zIndex: 1,
        routes: [
          {
            ...Users,
            path: '/admin/users',
            backPath: '/admin/',
            exact: true,
            title: "Users",
            zIndex: 1
          },
          {
            ...User,
            path: '/admin/users/:username',
            backPath: '/admin/users',
            exact: true,
            title: "User",
            zIndex: 2
          },
        ]
      },
      {
        ...Products,
        path: '/admin/products',
        title: "Products",
        zIndex: 1
      },
      {
        ...Transactions,
        path: '/admin/transactions',
        title: "Transactions",
        zIndex: 1
      },
      {
        ...Subscriptions,
        path: '/admin/subscriptions',
        title: "Subscriptions",
        zIndex: 1
      }
    ]
  }
]
