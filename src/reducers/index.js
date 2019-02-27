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

export default combineReducers({
  app: appReducer,
  auth: authReducer,
  users: usersReducer,
  admins: adminsReducer,
  products: productsReducer,
  transactions: transactionsReducer,
  subscriptions: subscriptionsReducer,
  autocomplete: autocompleteReducer,
  form: formReducer.plugin({
    contact: (state, action) => { // <------ 'account' is name of form given to reduxForm()
      switch(action.type) {
        case "POST_CONTACT_SUCCESS":
          return undefined;       // <--- blow away form data
        default:
          return state;
      }
    }
  }),
  contact: contactReducer
})
