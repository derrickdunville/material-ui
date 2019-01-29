import * as types from '../constants/user-action-types'

const initialState = {
  loaded: false,
  loading: false,
  message: false,
  error: false,

  user: false,
  page: 0,
  limit: 10,

  gettingUser: false,
  gettingUserError: false,
  gettingUsers: false,
  gettingUsersError: false,
  postingUser: false,
  postingUserError: false,
  puttingUser: false,
  puttingUserError: false,
  deletingUser: false,
  deletingUserError: false
}
export default (state=initialState, action) => {
  switch (action.type) {
    case types.GET_USER:
      return {
        ...state,
        gettingUser: true
      }
    case types.GET_USER_SUCCESS:
      return {
        ...state,
        gettingUser: false,
        user: action.payload.data
      }
    case types.GET_USER_FAIL:
      return {
        ...state,
        gettingUser: false,
        gettingUserError: action.payload.data.err.message
      }
    case types.GET_USERS:
      return {
        ...state,
        gettingUsers: true
      }
    case types.GET_USERS_SUCCESS:
      return {
        ...state,
        gettingUsers: false,
        loaded: true,
        ...action.payload.data
      }
    case types.GET_USERS_FAIL:
      return {
        ...state,
        gettingUsers: false,
        gettingUsersError: action.payload.data.err.message
      }
    case types.POST_USER:
      return {
        ...state,
        postingUser: true
      }
    case types.POST_USER_SUCCESS:
      return {
        ...state,
        postingUser: false,
        // hmmmm, how should we handle posting success result
        message: "created successfully"
      }
    case types.POST_USER_FAIL:
      return {
        ...state,
        postingUser: false,
        postingUserError: action.payload.data.err.message
      }
    case types.PUT_USER:
      return {
        ...state,
        puttingUser: true
      }
    case types.PUT_USER_SUCCESS:
      return {
        ...state,
        puttingUser: false,
        user: action.payload.data,
        message: "updated successfully"
      }
    case types.PUT_USER_FAIL:
      return {
        ...state,
        puttingUser: false,
        puttingUserError: action.payload.data.err.message
      }
    case types.DELETE_USER:
      return {
        ...state,
        deletingUser: true
      }
    case types.DELETE_USER_SUCCESS:
      return {
        ...state,
        deletingUser: false
      }
    case types.DELETE_USER_FAIL:
      return {
        ...state,
        deletingUser: false,
        deletingUserError: action.payload.data.err.message
      }
    case types.CLEAR_USER:
      return {
        ...state,
        user: false,
        gettingUserError: false
      }
    default:
      return state
  }
}
