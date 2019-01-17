import {
  OPEN_NAV,
  CLOSE_NAV
} from '../actions'
const initialState = {
  message: "this is our initial state, awesome reducer hot loading is working",
  auth: "no authorization yet",
  navOpen: false,
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
    default:
      return state
  }
}
