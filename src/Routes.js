import React from 'react'
import App from './App'
import NotFoundPage from './views/NotFoundPage'
import HomePage from './views/HomePage'
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
        navbarName: "",
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
        ...UsersListPage,
        path: '/users',
        sidebarName: "Users",
        navbarName: "Users List",
        icon: Dashboard,
        routes: [
          {
            ...UserPage,
            path: '/users/:id'
          },
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
