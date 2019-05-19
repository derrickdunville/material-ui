import {
  OPEN_NAV,
  CLOSE_NAV,
  OPEN_ADMIN_NAV,
  CLOSE_ADMIN_NAV,
  LOAD_MEMBERSHIPS,
  LOAD_MEMBERSHIPS_FAIL,
  LOAD_MEMBERSHIPS_SUCCESS
} from '../actions'
const initialState = {
  message: "this is our initial state, awesome reducer hot loading is working",
  auth: "no authorization yet",
  navOpen: false,
  adminNavOpen: false,
  memberships: {
    docs: []
  }
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
    case LOAD_MEMBERSHIPS:
      return {
        ...state,
        loadingMemberships: true
      }
    case LOAD_MEMBERSHIPS_SUCCESS:
      return {
        ...state,
        loadingMemberships: false,
        memberships: action.payload.data
      }
    case LOAD_MEMBERSHIPS_FAIL:
      return {
        ...state,
        loadingMemberships: false
      }
    default:
      return state
  }
}
