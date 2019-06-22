import * as types from '../constants/user-action-types'
import { updateDoc, deleteDoc } from './utils/reducerUtils'

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

const usersReducer = (state=initialState, action) => {
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
        user: action.payload
      }
    case types.GET_USER_FAIL:
      return {
        ...state,
        gettingUser: false,
        getUserErrorMessage: action.payload.err.message
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
        ...action.payload
      }
    case types.GET_USERS_FAIL:
      return {
        ...state,
        gettingUsers: false,
        getUsersErrorMessage: action.payload.err.message
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
        docs: [action.payload, ...state.docs],// hmmmm, how should we handle posting success result
        total: state.total + 1,
        postUserSuccessMessage: "User successfully created.",
        postUserErrorMessage: false
      }
    case types.POST_USER_FAIL:
      return {
        ...state,
        postingUser: false,
        postUserSuccessMessage: false,
        postUserErrorMessage: action.payload.err.message
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
        user: action.payload,
        docs: updateDoc(state.docs, action.payload),
        putUserSuccessMessage: "User successfully updated.",
        editOpen: false
      }
    case types.PUT_USER_FAIL:
      return {
        ...state,
        puttingUser: false,
        putUserErrorMessage: action.payload.err.message
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
        deleteUserErrorMessage: false,
        docs: deleteDoc(state.docs, action.payload)
      }
    case types.DELETE_USER_FAIL:
      return {
        ...state,
        deletingUser: false,
        deleteUserSuccessMessage: false,
        deleteUserErrorMessage: action.payload.err.message
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
        getUserErrorMessage: false
      }

    /* SocketIO Event Reducers */

    // If a user is updated and it is currently within the store
    // we should update it in the store.
    case types.USER_UPDATED:
      return {
        ...state,
        docs: updateDoc(state.docs, action.payload)
      }
    // If a user is created we should determine if it needs to be
    // added to the store. This depends on the current sort/order of the docs
    case types.USER_CREATED:
      return {
        ...state
      }
    // If a user is deleted and it is currently within the store
    // we should delete it from the store.
    case types.USER_DELETED:
      return {
        ...state,
        docs: deleteDoc(state.docs, action.payload)
      }
    default:
      return state
  }
}

export { initialState, usersReducer }
