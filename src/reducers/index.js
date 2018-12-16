import { combineReducers } from 'redux'
import appReducer from './appReducer'
import authReducer from './authReducer'
import usersReducer from './usersReducer'
import adminsReducer from './adminsReducer'

export default combineReducers({
  app: appReducer,
  auth: authReducer,
  users: usersReducer,
  admins: adminsReducer  
})
