import React from 'react'
import App from './App'
import NotFoundPage from './views/NotFoundPage'
import HomePage from './views/HomePage'
import UsersListPage from './views/UsersListPage'
import AdminsListPage from './views/AdminsListPage'
import LoginPage from './views/LoginPage'

export default [
  {
    ...App,
    routes: [
      {
        ...HomePage,
        path: '/',
        exact: true
      },
      {
        ...LoginPage,
        path: '/login'
      },
      {
        ...AdminsListPage,
        path: '/admins'
      },
      {
        ...UsersListPage,
        path: '/users'
      },
      {
        ...NotFoundPage,
        path: ''
      }
    ]
  }
]
