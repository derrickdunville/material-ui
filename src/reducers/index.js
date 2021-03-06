import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import appReducer from './appReducer'
import authReducer from './authReducer'
import usersReducer from './usersReducer'
import adminsReducer from './adminsReducer'
import productsReducer from './productsReducer'
import transactionsReducer from './transactionsReducer'
import subscriptionsReducer from './subscriptionsReducer'
import autocompleteReducer from './autocompleteReducer'
import contactReducer from './contactReducer'

//Redux Form Reducers
import contactReduxFormReducer from './forms/contactReduxFormReducer'
import userReduxFormReducer from './forms/userReduxFormReducer'

export default combineReducers({
  app: appReducer,
  auth: authReducer,
  users: usersReducer,
  admins: adminsReducer,
  products: productsReducer,
  transactions: transactionsReducer,
  subscriptions: subscriptionsReducer,
  autocomplete: autocompleteReducer,
  contact: contactReducer,
  form: formReducer.plugin({
    contact: contactReduxFormReducer,
    userForm: userReduxFormReducer
  })
})
