import React from 'react'
import AccountContainer from '../containers/AccountContainer.jsx'
import Account from '../views/Account/Account.jsx'
import Profile from '../views/Account/Profile.jsx'
import Billing from '../views/Account/Billing.jsx'
import Connections from 'views/Account/Connections/Connections.jsx'

export default [
  {
    ...AccountContainer,
    path: '/app/account/',
    title: "Account",
    zIndex: 2,
    hidden: true,
    routes: [
      {
        ...Account,
        path:'/app/account/',
        backPath: '/app/',
        title: "Account",
        exact: true,
        zIndex: 2
      },
      {
        ...Profile,
        path: '/app/account/profile/',
        backPath: '/app/account/',
        title: "Profile",
        zIndex: 3
      },
      {
        ...Billing,
        path: '/app/account/billing/',
        backPath: '/app/account/',
        title: "Billing",
        zIndex: 3
      },
      {
        ...Connections,
        path: '/app/account/connections/',
        backPath: '/app/account/',
        title: "Connections",
        zIndex: 3
      },
    ]
  }
]
