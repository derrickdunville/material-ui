/**
 * @jest-environment node
 */
import expect from 'expect'
import { usersReducer, initialState } from '../../src/reducers/usersReducer'
import * as types from '../../src/constants/user-action-types'
import { mockUserData, loadedState, mockNewUser } from '../data/mockUserData'
import { internalServerError, notFoundError, alreadyExistsError } from '../data/mockErrors'
import { updateDoc, deleteDoc } from '../../src/reducers/utils/reducerUtils'

describe('users reducer', () => {
  it('should return the initial state', () => {
    expect(usersReducer(undefined, {})).toEqual(
      initialState
    )
  })

  describe('post', () => {
    it('POST_USER', () => {
      expect(
        usersReducer(initialState, {
          type: types.POST_USER
        })
      ).toEqual({
        ...initialState,
        postingUser: true
      })
    })
    it('POST_USER_SUCCESS', () => {
      expect(
        usersReducer(initialState, {
          type: types.POST_USER_SUCCESS,
          payload: mockUserData.docs[0]
        })
      ).toEqual({
        ...initialState,
        postingUser: false,
        postUserSuccessMessage: "User successfully created.",
        total: initialState.total + 1,
        docs: [...initialState.docs, mockUserData.docs[0]]
      })
    })
    it('POST_USER_FAIL', () => {
      expect(
        usersReducer(initialState, {
          type: types.POST_USER_FAIL,
          payload: alreadyExistsError("user")
        })
      ).toEqual({
        ...initialState,
        postingUser: false,
        postUserErrorMessage: alreadyExistsError("user").err.message
      })
    })
  })
  describe('get (list)', () => {
    it('GET_USERS', () => {
      expect(
        usersReducer(initialState, {
          type: types.GET_USERS
        })
      ).toEqual({
        ...initialState,
        gettingUsers: true
      })
    })
    it('GET_USERS_SUCCESS', () => {
      expect(
        usersReducer(initialState, {
          type: types.GET_USERS_SUCCESS,
          payload: mockUserData
        })
      ).toEqual({
        ...initialState,
        gettingUsers: false,
        loaded: true,
        ...mockUserData
      })
    })
    it('GET_USERS_FAIL', () => {
      expect(
        usersReducer(initialState, {
          type: types.GET_USERS_FAIL,
          payload: internalServerError
        })
      ).toEqual({
        ...initialState,
        gettingUser: false,
        getUsersErrorMessage: internalServerError.err.message
      })
    })
  })
  describe('get', () => {
    it('GET_USER', () => {
      expect(
        usersReducer(initialState, {
          type: types.GET_USER
        })
      ).toEqual({
        ...initialState,
        gettingUser: true
      })
    })
    it('GET_USER_SUCCESS', () => {
      expect(
        usersReducer(initialState, {
          type: types.GET_USER_SUCCESS,
          payload: mockUserData[0]
        })
      ).toEqual({
        ...initialState,
        gettingUser: false,
        user: mockUserData[0]
      })
    })
    it('GET_USER_FAIL', () => {
      expect(
        usersReducer(initialState, {
          type: types.GET_USER_FAIL,
          payload: notFoundError("user")
        })
      ).toEqual({
        ...initialState,
        gettingUser: false,
        getUserErrorMessage: notFoundError("user").err.message
      })
    })
  })
  describe('put', () => {
    it('PUT_USER', () => {
      expect(
        usersReducer(loadedState, {
          type: types.PUT_USER
        })
      ).toEqual({
        ...loadedState,
        puttingUser: true
      })
    })
    it('PUT_USER_SUCCESS', () => {
      expect(
        usersReducer(loadedState, {
          type: types.PUT_USER_SUCCESS,
          payload: {
            ...loadedState.docs[0],
            username: "updated" + loadedState.docs[0].username
          }
        })
      ).toEqual({
        ...loadedState,
        puttingUser: false,
        user: {
          ...loadedState.docs[0],
          username: "updated" + loadedState.docs[0].username
        },
        docs: [{
          ...loadedState.docs[0],
          username: "updated" + loadedState.docs[0].username
        }],
        putUserSuccessMessage: 'User successfully updated.',
        editOpen: false,
      })
    })
    it('PUT_USER_FAIL', () => {
      expect(
        usersReducer(loadedState, {
          type: types.PUT_USER_FAIL,
          payload: alreadyExistsError("user")
        })
      ).toEqual({
        ...loadedState,
        puttingUser: false,
        putUserErrorMessage: alreadyExistsError("user").err.message
      })
    })
  })
  describe('delete', () => {
    it('DELETE_USER', () => {
      expect(
        usersReducer(loadedState, {
          type: types.DELETE_USER
        })
      ).toEqual({
        ...loadedState,
        deletingUser: true
      })
    })
    it('DELETE_USER_SUCCESS', () => {
      expect(
        usersReducer(loadedState, {
          type: types.DELETE_USER_SUCCESS,
          payload: {
            _id: loadedState.docs[0]._id,
            messsage: "User successfully deleted."
          }
        })
      ).toEqual({
        ...loadedState,
        deletingUser: false,
        deleteUserSuccessMessage: "User successfully deleted.",
        docs: []
      })
    })
    it('DELETE_USER_FAIL', () => {
      expect(
        usersReducer(loadedState, {
          type: types.DELETE_USER_FAIL,
          payload: notFoundError("user")
        })
      ).toEqual({
        ...loadedState,
        deletingUser: false,
        deleteUserErrorMessage: notFoundError("user").err.message
      })
    })
  })
  describe('clear', () => {
    it('CLEAR_USER', () => {
      expect(
        usersReducer(loadedState, {
          type: types.CLEAR_USER
        })
      ).toEqual({
        ...loadedState,
        user: false
      })
    })
    it('CLEAR_DELETE_USER', () => {
      let deleteState = {
        ...loadedState,
        deleteUserErrorMessage: "User not found",
        deleteUserSuccessMessage: "User successfully deleted."
      }
      expect(
        usersReducer(deleteState, {
          type: types.CLEAR_DELETE_USER
        })
      ).toEqual({
        ...deleteState,
        deleteUserErrorMessage: false,
        deleteUserSuccessMessage: false
      })
    })
    it('CLEAR_PUT_USER', () => {
      let putState = {
        ...loadedState,
        putUserErrorMessage: "User not found",
        putUserSuccessMessage: "User successfully updated."
      }
      expect(
        usersReducer(putState, {
          type: types.CLEAR_PUT_USER
        })
      ).toEqual({
        ...loadedState,
        putUserErrorMessage: false,
        putUserSuccessMessage: false
      })
    })
    it('CLEAR_POST_USER', () => {
      let postState = {
        ...loadedState,
        postUserErrorMessage: "Error creating user.",
        postUserSuccessMessage: "User successfully created."
      }
      expect(
        usersReducer(postState, {
          type: types.CLEAR_POST_USER
        })
      ).toEqual({
        ...loadedState,
        postUserErrorMessage: false,
        postUserSuccessMessage: false
      })
    })
  })
  describe('socket', () => {
    it('USER_UPDATED', () => {
      expect(
        usersReducer(loadedState, {
          type: types.USER_UPDATED,
          payload: {
            ...loadedState.docs[0],
            email: "updatedUserEmail@test.com"
          }
        })
      ).toEqual({
        ...loadedState,
        docs: updateDoc(loadedState.docs, {...loadedState.docs[0], email: "updatedUserEmail@test.com"})
      })
    })
    it('USER_CREATED', () => {
      expect(
        usersReducer(loadedState, {
          type: types.USER_CREATED,
          payload: mockNewUser
        })
      ).toEqual({
        ...loadedState
      })
    })
    it('USER_DELETED', () => {
      expect(
        usersReducer(loadedState, {
          type: types.USER_DELETED,
          payload: { _id: loadedState.docs[0]._id }
        })
      ).toEqual({
        ...loadedState,
        docs: []
      })
    })
  })
})
