import { combineReducers } from 'redux'
import appReducer from './appReducer'
import authReducer from './authReducer'
import usersReducer from './usersReducer'
import adminsReducer from './adminsReducer'
import productsReducer from './productsReducer'
import transactionsReducer from './transactionsReducer'
import subscriptionsReducer from './subscriptionsReducer'

export default combineReducers({
  app: appReducer,
  auth: authReducer,
  users: usersReducer,
  admins: adminsReducer,
  products: productsReducer,
  transactions: transactionsReducer,
  subscriptions: subscriptionsReducer
})
