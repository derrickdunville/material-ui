import React from 'react'
import App from './App'
import NotFoundPage from './views/NotFoundPage'
import HomePage from './views/HomePage'
import UsersContainer from './containers/UsersContainer.jsx'
import UsersListPage from './views/UsersListPage'
import UserPage from './views/User/UserPage'
import AdminsListPage from './views/AdminsListPage'
import LoginPage from './views/LoginPage'
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
        sidebarName: "Home",
        navbarName: "Welcome",
        icon: Dashboard,
      },
      {
        ...LoginPage,
        path: '/login',
        exact: true,
        sidebarName: "Login",
        navbarName: "Login",
        icon: Dashboard,
      },
      {
        ...AdminsListPage,
        path: '/admins',
        exact: true,
        sidebarName: "Admins",
        navbarName: "Admins List",
        icon: Dashboard,
      },
      {
        ...UsersContainer,
        path: '/users',
        sidebarName: "Users",
        navbarName: "Users List",
        icon: Dashboard,
        routes: [
          {
            ...UsersListPage,
            path: '/users',
            exact: true
          },
          {
            ...UserPage,
            path: '/users/:id',
            navbarName: "User",
          }
        ]
      },
      {
        ...NotFoundPage,
        path: '',
        sidebarName: "Page Not Found",
        navbarName: "Page Not Found",
        icon: Dashboard,
      }
    ]
  }
]
