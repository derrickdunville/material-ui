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
import Contact from "views/Contact/Contact.jsx"

import Classes from 'views/Products/Classes.jsx'
import Scripts from 'views/Products/Scripts.jsx'
import Scanners from 'views/Products/Scanners.jsx'
import Product from 'views/Products/Product.jsx'

import Chat from 'views/Chat/Chat.jsx'

import accountRoutes from '../routes/account'
import adminRoutes from '../routes/admin'
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard"
import MessageIcon from "@material-ui/icons/Message"
import OnDemandVideoIcon from "@material-ui/icons/OndemandVideo"
import WhatsHotIcon from "@material-ui/icons/Whatshot"
import CodeIcon from "@material-ui/icons/Code"
export default [
  {
    ...App,
    routes: [
      {
        ...LoginPage,
        hidden: true,
        path: '/login',
      },
      {
        ...SignUpPage,
        hidden: true,
        path: '/sign-up',
      },
      {
        ...ForgotPasswordPage,
        hidden: true,
        path: '/forgot-password',
      },
      {
        ...ResetPasswordPage,
        hidden: true,
        path: '/reset-password/:reset_token',
      },
      ...adminRoutes,
      {
        ...UserDashboard,
        path: '/',
        zIndex: "",
        routes: [
          {
            ...Contact,
            hidden: true,
            title: "Contact",
            path: '/contact',
          },
          {
            ...AppPage,
            hidden: true,
            title: "Terms",
            path: '/tos',
          },
          {
            ...ForgotPasswordPage,
            hidden: true,
            path: '/forgot-password',
          },
          {
            ...HomePage,
            path: '/',
            exact: true,
            title: "Welcome",
            hidden: true,
            zIndex: "1"
          },
          {
            ...Chat,
            path: '/chat',
            title: "Chat",
            zIndex: "1",
            exact: true,
            icon: <MessageIcon/>
          },
          {
            ...Classes,
            path: '/classes',
            title: "Classes",
            zIndex: "1",
            exact: true,
            icon: <OnDemandVideoIcon/>
          },
          {
            ...Product,
            path: '/classes/:id',
            title: "Classes",
            hidden: true,
            zIndex: "2"
          },
          {
            ...Scanners,
            path: '/scanners',
            title: "Scanners",
            zIndex: "1",
            exact: true,
            icon: <WhatsHotIcon/>
          },
          {
            ...Product,
            path: '/scanners/:id',
            title: "Scanners",
            hidden: true,
            zIndex: "2"
          },
          {
            ...Scripts,
            path: '/scripts',
            title: "Scripts",
            zIndex: "1",
            exact: true,
            icon: <CodeIcon/>
          },
          {
            ...Product,
            path: '/scripts/:id',
            title: "Script",
            hidden: true,
            zIndex: "2"
          },
          ...accountRoutes,
          {
            ...NotFoundPage,
            hidden: true,
            path: '',
          }
        ]
      },
      {
        ...NotFoundPage,
        path: '',
      }
    ]
  }
]
