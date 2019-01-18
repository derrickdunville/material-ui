import React from 'react'
import AccountContainer from '../containers/AccountContainer.jsx'
import Account from '../views/Account/Account.jsx'
import Profile from '../views/Account/Profile.jsx'
import Billing from '../views/Account/Billing.jsx'

export default [
  {
    ...AccountContainer,
    path: '/app/account',
    title: "Account",
    zIndex: 2,
    routes: [
      {
        ...Account,
        path:'/app/account',
        backPath: '/app',
        title: "Account",
        exact: true,
        zIndex: 2
      },
      {
        ...Profile,
        path: '/app/account/profile',
        backPath: '/app/account',
        title: "Profile",
        zIndex: 2
      },
      {
        ...Billing,
        path: '/app/account/billing',
        backPath: '/app/account',
        title: "Billing",
        zIndex: 2
      }
    ]
  }
]
