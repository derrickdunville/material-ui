import React from 'react'
import App from '../layouts/App/App'
import NotFoundPage from '../views/NotFoundPage'
import HomePage from '../views/HomePage'
import UsersListPage from '../views/UsersListPage'
import UserPage from '../views/User/UserPage'
import AdminsListPage from '../views/AdminsListPage'
import LoginPage from '../views/LoginPage'
import SignUpPage from '../views/SignUpPage'
import ForgotPasswordPage from '../views/ForgotPasswordPage'
import ResetPasswordPage from '../views/ResetPasswordPage'
import UserDashboard from '../layouts/UserDashboard.jsx'
import AppPage from "../views/App/AppPage.jsx"

import Classes from 'views/Products/Classes.jsx'
import Scripts from 'views/Products/Scripts.jsx'
import Product from 'views/Products/Product.jsx'

import Scanners from 'views/Products/Scanners.jsx'

import accountRoutes from '../routes/account'
import adminRoutes from '../routes/admin'
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard"

export default [
  {
    ...App,
    routes: [
      {
        ...HomePage,
        path: '/',
        exact: true,
      },
      {
        ...LoginPage,
        path: '/login',
      },
      {
        ...SignUpPage,
        path: '/sign-up',
      },
      {
        ...ForgotPasswordPage,
        path: '/forgot-password',
      },
      {
        ...ResetPasswordPage,
        path: '/reset-password/:reset_token',
      },
      {
        ...UserDashboard,
        path: '/app/',
        zIndex: "",
        routes: [
          {
            ...AppPage,
            path: '/app/',
            exact: true,
            title: "Home",
            hidden: true,
            zIndex: "1"
          },
          {
            ...Classes,
            path: '/app/classes',
            title: "Classes",
            zIndex: "1",
            exact: true
          },
          {
            ...Product,
            path: '/app/classes/:id',
            title: "Classes",
            hidden: true,
            zIndex: "2"
          },
          {
            ...Scanners,
            path: '/app/scanners',
            title: "Scanners",
            zIndex: "1",
            exact: true
          },
          {
            ...Product,
            path: '/app/scanners/:id',
            title: "Scanners",
            hidden: true,
            zIndex: "2"
          },
          {
            ...Scripts,
            path: '/app/scripts',
            title: "Scripts",
            zIndex: "1",
            exact: true
          },
          {
            ...Product,
            path: '/app/scripts/:id',
            title: "Script",
            hidden: true,
            zIndex: "2"
          },
          ...accountRoutes
        ]
      },
      ...adminRoutes,
      {
        ...NotFoundPage,
        path: '',
      }

    ]
  }
]
