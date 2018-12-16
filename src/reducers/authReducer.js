import { FETCH_CURRENT_USER, LOGOUT_USER, LOGIN_USER } from '../actions'

export default function(state = false, action) {
  switch (action.type) {
    case FETCH_CURRENT_USER:
    // if user is not authenticated then the api will return nothing
      return action.payload.data || false
    case LOGIN_USER:
      return action.payload.data || false
    case LOGOUT_USER:
      return false
    default:
      return state
  }
}
