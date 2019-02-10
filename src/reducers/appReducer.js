import {
  OPEN_NAV,
  CLOSE_NAV,
  OPEN_ADMIN_NAV,
  CLOSE_ADMIN_NAV
} from '../actions'
const initialState = {
  message: "this is our initial state, awesome reducer hot loading is working",
  auth: "no authorization yet",
  navOpen: false,
  adminNavOpen: true
}
export default (state=initialState, action) => {
  switch(action.type){
    case OPEN_NAV:
      return {
        ...state,
        navOpen: true
      }
    case CLOSE_NAV:
      return {
        ...state,
        navOpen: false
      }
    case OPEN_ADMIN_NAV:
      return {
        ...state,
        adminNavOpen: true
      }
    case CLOSE_ADMIN_NAV:
      return {
        ...state,
        adminNavOpen: false
      }
    default:
      return state
  }
}
