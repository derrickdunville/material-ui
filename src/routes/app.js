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

// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";

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
        ...NotFoundPage,
        path: '',
      }
    ]
  }
]
