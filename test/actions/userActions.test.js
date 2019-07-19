/**
 * @jest-environment node
 */
import expect from 'expect'
import nock from '../utils/nockSetup'
import mockStore from '../utils/mockStore'
import mockHistory from '../utils/mockHistory'
import * as actions from '../../src/actions/userActions'
import * as types from '../../src/constants/user-action-types'
import { initialState } from '../../src/reducers/usersReducer'
import { mockUserData, mockNewUser } from '../data/mockUserData'
import {
  internalServerError,
  notFoundError,
  notAuthorizedError,
  alreadyExistsError
} from '../data/mockErrors'

describe('userActions', () => {
  var store = null
  beforeEach(() => {store = mockStore({ users: initialState }) })

  describe("async", () => {
    it('getUsers() 200-success', () => {
      let page = 0, limit = 10, order = "asc", orderBy = "username"
      let url = "/users?page=" + page +"&limit=" + limit + "&sort="+orderBy+":"+order+""
      nock.get(url).reply(200, mockUserData )
      const expectedActions = [
        { type: types.GET_USERS },
        { type: types.GET_USERS_SUCCESS, payload: mockUserData }
      ]
      return store
        .dispatch(actions.getUsers())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })
    it('getUsers() 500-error', () => {
      let page = 0, limit = 10, order = "asc", orderBy = "username"
      let url = "/users?page=" + page +"&limit=" + limit + "&sort="+orderBy+":"+order+""
      nock.get(url).reply(500, internalServerError)
      const expectedActions = [
        { type: types.GET_USERS },
        { type: types.GET_USERS_FAIL, payload: internalServerError}
      ]
      return store
        .dispatch(actions.getUsers())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('getUser(username) success', () => {
      nock.get("/users/testUser").reply(200, mockUserData.docs[0])
      const expectedActions = [
        { type: types.GET_USER },
        { type: types.GET_USER_SUCCESS, payload: mockUserData.docs[0] }
      ]
      return store
        .dispatch(actions.getUser(mockUserData.docs[0].username))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })
    it('getUser(username) 404-error', () => {
      nock.get("/users/testUser").reply(404, notFoundError("user"))
      const expectedActions = [
        { type: types.GET_USER },
        { type: types.GET_USER_FAIL, payload: notFoundError("user") }
      ]
      return store
        .dispatch(actions.getUser(mockUserData.docs[0].username))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })
    it('getUser(username) 403-error', () => {
      nock.get("/users/testUser").reply(403, notAuthorizedError("user"))
      const expectedActions = [
        { type: types.GET_USER },
        { type: types.GET_USER_FAIL, payload: notAuthorizedError("user") }
      ]
      return store
        .dispatch(actions.getUser(mockUserData.docs[0].username))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('postUser(history, user) success', () => {
      nock.post("/users").reply(200, mockUserData.docs[0])
      const expectedActions = [
        { type: types.POST_USER },
        { type: types.POST_USER_SUCCESS, payload: mockUserData.docs[0] }
      ]
      return store
        .dispatch(actions.postUser(mockHistory, mockUserData.docs[0]))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })
    it('postUser(history, user) 401-error', () => {
      nock.post("/users").reply(401, alreadyExistsError("user"))
      const expectedActions = [
        { type: types.POST_USER },
        { type: types.POST_USER_FAIL, payload: alreadyExistsError("user") }
      ]
      return store
        .dispatch(actions.postUser(mockHistory, mockUserData.docs[0]))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('putUser(id, user) success', () => {
      let username = mockUserData.docs[0].username
      mockUserData.docs[0].username = "updatedTestUser"
      nock.put("/users/"+mockUserData.docs[0]._id).reply(200, mockUserData.docs[0])
      const expectedActions = [
        { type: types.PUT_USER },
        { type: types.PUT_USER_SUCCESS, payload: mockUserData.docs[0] }
      ]
      return store
        .dispatch(actions.putUser(mockUserData.docs[0]._id, mockUserData.docs[0]))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })
    it('putUser(id, user) 401-error', () => {
      let username = mockUserData.docs[0].username
      mockUserData.docs[0].username = "updatedTestUser"
      nock.put("/users/"+mockUserData.docs[0]._id).reply(401, alreadyExistsError("user"))
      const expectedActions = [
        { type: types.PUT_USER },
        { type: types.PUT_USER_FAIL, payload: alreadyExistsError("user") }
      ]
      return store
        .dispatch(actions.putUser(mockUserData.docs[0]._id, mockUserData.docs[0]))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('deleteUser(history, user_id) success', () => {
      nock.delete("/users/"+mockUserData.docs[0]._id).reply(200, { message: "user successfully deleted" })
      const expectedActions = [
        { type: types.DELETE_USER },
        { type: types.DELETE_USER_SUCCESS, payload: { message: "user successfully deleted" } }
      ]
      return store
        .dispatch(actions.deleteUser(mockHistory, mockUserData.docs[0]._id))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })
    it('deleteUser(history, user_id) 403-error', () => {
      nock.delete("/users/"+mockUserData.docs[0]._id).reply(403, notAuthorizedError("user"))
      const expectedActions = [
        { type: types.DELETE_USER },
        { type: types.DELETE_USER_FAIL, payload: notAuthorizedError("user") }
      ]
      return store
        .dispatch(actions.deleteUser(mockHistory, mockUserData.docs[0]._id))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })
  })

  describe('clear', () => {
    it('clearUser()', () => {
      const expectedActions = [
        { type: types.CLEAR_USER }
      ]
      return store
        .dispatch(actions.clearUser())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })
    it('clearPostUser()', () => {
      const expectedActions = [
        { type: types.CLEAR_POST_USER }
      ]
      return store
        .dispatch(actions.clearPostUser())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })
    it('clearPutUser()', () => {
      const expectedActions = [
        { type: types.CLEAR_PUT_USER }
      ]
      return store
        .dispatch(actions.clearPutUser())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })
    it('clearDeleteUser()', () => {
      const expectedActions = [
        { type: types.CLEAR_DELETE_USER }
      ]
      return store
        .dispatch(actions.clearDeleteUser())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })
  })

  describe("socket", () => {
    it('userCreated()', () => {
      const expectedActions = [
        { type: types.USER_CREATED, payload: mockNewUser }
      ]
      return store
        .dispatch(actions.userCreated(mockNewUser))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })
    it('userUpdated()', () => {
      let updatedUser = mockUserData.docs[0]
      updatedUser.email = "updatedEmail@test.com"
      const expectedActions = [
        { type: types.USER_UPDATED, payload: updatedUser }
      ]
      return store
        .dispatch(actions.userUpdated(updatedUser))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })
    it('userDeleted()', () => {
      const expectedActions = [
        { type: types.USER_DELETED, payload: { _id: mockUserData.docs[0]._id }}
      ]
      return store
        .dispatch(actions.userDeleted({ _id: mockUserData.docs[0]._id }))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })
  })
})
