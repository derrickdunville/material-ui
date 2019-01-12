import {
  FETCH_CURRENT_USER,
  LOGOUT_USER,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  RESET_AUTH,
  SIGN_UP_USER,
  SIGN_UP_USER_SUCCESS,
  SIGN_UP_USER_FAIL,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  VERIFY_RESET_PASSWORD_TOKEN,
  VERIFY_RESET_PASSWORD_TOKEN_SUCCESS,
  VERIFY_RESET_PASSWORD_TOKEN_FAIL
} from '../constants/auth-action-types'

const initialState = {
  loading: false,
  user: false,
  message: false,
  error: false,
  validResetToken: false,
  verifyMessage: false
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
    case FORGOT_PASSWORD:
      return {
        ...state,
        loading: true,
        message: false,
        error: false
      }
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        message: action.payload.data.message,
        loading: false
      }
    case FORGOT_PASSWORD_FAIL:
      return {
        ...state,
        error: action.payload.data.err.message,
        loading: false
      }
    case RESET_PASSWORD:
      return {
        ...state,
        loading: true,
        message: false,
        error: false
      }
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        message: action.payload.data.message,
        loading: false
      }
    case RESET_PASSWORD_FAIL:
      return {
        ...state,
        error: action.payload.data.err.message,
        loading: false
      }
    case VERIFY_RESET_PASSWORD_TOKEN:
      return {
        ...state,
        loading: true,
        message: false,
        error: false,
        validResetToken: false
      }
    case VERIFY_RESET_PASSWORD_TOKEN_SUCCESS:
      return {
        ...state,
        verifyMessage: action.payload.data.message,
        validResetToken: true,
        loading: false
      }
    case VERIFY_RESET_PASSWORD_TOKEN_FAIL:
      return {
        ...state,
        error: action.payload.data.err.message,
        validResetToken: false,
        loading: false
      }
    case RESET_AUTH:
      return {
        ...state,
        loading: false,
        message: false,
        error: false,
        validResetToken: false
      }
    default:
      return state
  }
}
