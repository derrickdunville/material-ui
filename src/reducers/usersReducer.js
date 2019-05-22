import * as types from '../constants/user-action-types'

const initialState = {
  loaded: false,
  loading: false,
  message: false,
  error: false,
  editOpen: false,

  user: false,
  page: 0,
  limit: 10,
  total: 0,
  docs: [],

  gettingUser: false,
  getUserErrorMessage: false,

  gettingUsers: false,
  getUsersErrorMessage: false,

  postingUser: false,
  postUserErrorMessage: false,
  postUserSuccessMessage: false,

  puttingUser: false,
  putUserSuccesseMessage: false,
  putUserErrorMessage: false,

  deletingUser: false,
  deleteUserSuccessMessage: false,
  deleteUserErrorMessage: false
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
        getUserErrorMessage: action.payload.data.err.message
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
        getUsersErrorMessage: action.payload.data.err.message
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
        docs: [action.payload.data, ...state.docs],// hmmmm, how should we handle posting success result
        total: state.total + 1,
        postUserSuccessMessage: "User successfully created",
        postUserErrorMessage: false
      }
    case types.POST_USER_FAIL:
      return {
        ...state,
        postingUser: false,
        postUserSuccessMessage: false,
        postUserErrorMessage: action.payload.data.err.message
      }
    case types.CLEAR_POST_USER:
      return {
        ...state,
        postUserSuccessMessage: false,
        postUserErrorMessage: false
      }
    case types.TOGGLE_EDITING_USER:
      return {
        ...state,
        editOpen: !state.editOpen
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
        docs: state.docs.map(user => (user._id === action.payload.data._id) ? action.payload.data : user),
        putUserSuccessMessage: "updated successfully",
        editOpen: false
      }
    case types.PUT_USER_FAIL:
      return {
        ...state,
        puttingUser: false,
        putUserErrorMessage: action.payload.data.err.message
      }
    case types.CLEAR_PUT_USER:
      return {
        ...state,
        putUserSuccessMessage: false,
        putUserErrorMessage: false
      }
    case types.DELETE_USER:
      return {
        ...state,
        deletingUser: true
      }
    case types.DELETE_USER_SUCCESS:
      return {
        ...state,
        deletingUser: false,
        deleteUserSuccessMessage: "User successfully deleted.",
        deleteUserErrorMessage: false
      }
    case types.DELETE_USER_FAIL:
      return {
        ...state,
        deletingUser: false,
        deleteUserSuccessMessage: false,
        deleteUserErrorMessage: action.payload.data.err.message
      }
    case types.CLEAR_DELETE_USER:
      return {
        ...state,
        deleteUserErrorMessage: false,
        deleteUserSuccessMessage: false
      }
    case types.CLEAR_USER:
      return {
        ...state,
        user: false,
        getUserError: false
      }
    default:
      return state
  }
}
