import AdminDashboard from '../layouts/AdminDashboard.jsx'
import AppPage from "../views/App/AppPage.jsx"

import RouteContainer from "../containers/RouteContainer.jsx"

import Dashboard from 'views/Admin/Dashboard/Dashboard.jsx'
import Users from "../views/Admin/Users/Users.jsx"
import User from "../views/Admin/Users/User.jsx"
import Products from "../views/Admin/Products/Products.jsx"
import Product from "../views/Admin/Products/Product.jsx"
import Transactions from "../views/Admin/Transactions/Transactions.jsx"
import Transaction from "../views/Admin/Transactions/Transaction.jsx"
import Subscriptions from "../views/Admin/Subscriptions/Subscriptions.jsx"
import Subscription from "../views/Admin/Subscriptions/Subscription.jsx"
import UserFormTest from "../views/Admin/Users/UserFormTest.jsx"

export default [
  {
    ...AdminDashboard,
    path: '/admin/',
    title: "Admin",
    routes: [
      {
        ...Dashboard,
        path: '/admin/',
        exact: true,
        title: "Dashboard",
        zIndex: 1
      },
      {
        ...UserFormTest,
        path: '/admin/form',
        exact: true,
        title: "Form Test",
        zIndex: 1
      },
      {
        ...RouteContainer,
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
        ...RouteContainer,
        path: '/admin/products',
        title: "Products",
        zIndex: 1,
        routes: [
          {
            ...Products,
            path: '/admin/products',
            backPath: '/admin/',
            exact: true,
            title: "Products",
            zIndex: 1
          },
          {
            ...Product,
            path: '/admin/products/:id',
            backPath: '/admin/product',
            exact: true,
            title: "Product",
            zIndex: 2
          },
        ]
      },
      {
        ...RouteContainer,
        path: '/admin/transactions',
        title: "Transactions",
        zIndex: 1,
        routes: [
          {
            ...Transactions,
            path: '/admin/transactions',
            backPath: '/admin/',
            exact: true,
            title: "Transactions",
            zIndex: 1
          },
          {
            ...Transaction,
            path: '/admin/transactions/:id',
            backPath: '/admin/transactions',
            exact: true,
            title: "Transaction",
            zIndex: 2
          },
        ]
      },
      {
        ...RouteContainer,
        path: '/admin/subscriptions',
        title: "Subscriptions",
        zIndex: 1,
        routes: [
          {
            ...Subscriptions,
            path: '/admin/subscriptions',
            backPath: '/admin/',
            exact: true,
            title: "Subscriptions",
            zIndex: 1
          },
          {
            ...Subscription,
            path: '/admin/subscriptions/:id',
            backPath: '/admin/subscriptions',
            exact: true,
            title: "Subscription",
            zIndex: 2
          },
        ]
      },
    ]
  }
]
