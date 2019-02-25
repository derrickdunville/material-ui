import React from 'react'
import AccountContainer from '../containers/AccountContainer.jsx'
import Account from '../views/Account/Account.jsx'
import Profile from '../views/Account/Profile.jsx'
import Billing from '../views/Account/Billing.jsx'
import Connections from 'views/Account/Connections/Connections.jsx'
import MyPurchases from 'views/Account/MyPurchases.jsx'

export default [
  {
    ...AccountContainer,
    path: '/account/',
    title: "Account",
    zIndex: 2,
    hidden: true,
    routes: [
      {
        ...Account,
        path:'/account/',
        backPath: '/',
        title: "Account",
        exact: true,
        zIndex: 2
      },
      {
        ...Profile,
        path: '/account/profile/',
        backPath: '/account/',
        title: "Profile",
        zIndex: 3
      },
      {
        ...Billing,
        path: '/account/billing/',
        backPath: '/account/',
        title: "Billing",
        zIndex: 3
      },
      {
        ...Connections,
        path: '/account/connections/',
        backPath: '/account/',
        title: "Connections",
        zIndex: 3
      },
      {
        ...MyPurchases,
        path: '/account/purchases/',
        backPath: '/account/',
        title: "My Purchases",
        zIndex: 3
      },
    ]
  }
]
