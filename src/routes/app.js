import React from 'react'
import App from '../layouts/App/App'
import NotFoundPage from '../views/NotFoundPage'
import HomePage from '../views/HomePage'
import UsersContainer from '../containers/UsersContainer.jsx'
import UsersListPage from '../views/UsersListPage'
import UserPage from '../views/User/UserPage'
import AdminsListPage from '../views/AdminsListPage'
import LoginPage from '../views/LoginPage'
import SignUpPage from '../views/SignUpPage'
import ForgotPasswordPage from '../views/ForgotPasswordPage'
import ResetPasswordPage from '../views/ResetPasswordPage'
import UserDashboard from '../layouts/UserDashboard.jsx'
import AppPage from "../views/App/AppPage.jsx"

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
            title: "Page 0",
            zIndex: "1"
          },
          {
            ...AppPage,
            path: '/app/1',
            title: "Page 1",
            zIndex: "1"
          },
          {
            ...AppPage,
            path: '/app/2',
            title: "Page 2",
            zIndex: "1"
          },
          {
            ...AppPage,
            path: '/app/3',
            title: "Page 3",
            zIndex: "1"
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
