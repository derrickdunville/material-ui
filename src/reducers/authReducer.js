import {
  FETCH_CURRENT_USER,
  LOGOUT_USER,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  RESET_AUTH,
  SIGN_UP_USER,
  SIGN_UP_USER_SUCCESS,
  SIGN_UP_USER_FAIL
} from '../constants/auth-action-types'

const initialState = {
  loading: false,
  user: false,
  error: false
}
export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_CURRENT_USER:
    // if user is not authenticated then the api will return nothing
      return {
        ...state,
        user: action.payload.data || false
      }
    case LOGIN_USER:
      return {
        ...state,
        loading: true
      }
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.data,
        error: false,
      }
    case LOGIN_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.data.err.message
      }
    case LOGOUT_USER:
      return {
        ...state,
        user: false,
        loading: false,
        error: false
      }
    case SIGN_UP_USER:
      return {
        ...state,
        loading: true
      }
    case SIGN_UP_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.data,
        loading: false
      }
    case SIGN_UP_USER_FAIL:
      return {
        ...state,
        error: action.payload.data.message,
        loading: false
      }
    case RESET_AUTH:
      return {
        ...state,
        loading: false,
        error: false
      }
    default:
      return state
  }
}
