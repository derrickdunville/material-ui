/**
 * @jest-environment node
 */
import expect from 'expect'
import nock from '../utils/nockSetup'
import mockStore from '../utils/mockStore'
import mockHistory from '../utils/mockHistory'
import * as actions from '../../src/actions/subscriptionActions'
import * as types from '../../src/constants/subscription-action-types'
import { initialState } from '../../src/reducers/subscriptionsReducer'
import { mockSubscriptionData, mockNewSubscription } from '../data/mockSubscriptionData'
import {
  internalServerError,
  notFoundError,
  notAuthorizedError,
  alreadyExistsError
} from '../data/mockErrors'

describe('subscriptionActions', () => {
  var store = null
  beforeEach(() => {store = mockStore({ subscriptions: initialState }) })

  describe("async", () => {
    it('getSubscriptions() 200-success', () => {
      let page = 0, limit = 10, order = "asc", orderBy = "name"
      let url = "/subscriptions?page=" + page +"&limit=" + limit + "&sort="+orderBy+":"+order+""
      nock.get(url).reply(200, mockSubscriptionData )
      const expectedActions = [
        { type: types.GET_SUBSCRIPTIONS },
        { type: types.GET_SUBSCRIPTIONS_SUCCESS, payload: mockSubscriptionData }
      ]
      return store
        .dispatch(actions.getSubscriptions())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })
    it('getSubscriptions() 500-error', () => {
      let page = 0, limit = 10, order = "asc", orderBy = "name"
      let url = "/subscriptions?page=" + page +"&limit=" + limit + "&sort="+orderBy+":"+order+""
      nock.get(url).reply(500, internalServerError)
      const expectedActions = [
        { type: types.GET_SUBSCRIPTIONS },
        { type: types.GET_SUBSCRIPTIONS_FAIL, payload: internalServerError}
      ]
      return store
        .dispatch(actions.getSubscriptions())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('getSubscription(subscription_id) success', () => {
      nock.get("/subscriptions/"+mockSubscriptionData.docs[0]._id).reply(200, mockSubscriptionData.docs[0])
      const expectedActions = [
        { type: types.GET_SUBSCRIPTION },
        { type: types.GET_SUBSCRIPTION_SUCCESS, payload: mockSubscriptionData.docs[0] }
      ]
      return store
        .dispatch(actions.getSubscription(mockSubscriptionData.docs[0]._id))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })
    it('getSubscription(subscription_id) 404-error', () => {
      nock.get("/subscriptions/"+mockSubscriptionData.docs[0]._id).reply(404, notFoundError("subscription"))
      const expectedActions = [
        { type: types.GET_SUBSCRIPTION },
        { type: types.GET_SUBSCRIPTION_FAIL, payload: notFoundError("subscription") }
      ]
      return store
        .dispatch(actions.getSubscription(mockSubscriptionData.docs[0]._id))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })
    it('getSubscription(subscription_id) 403-error', () => {
      nock.get("/subscriptions/"+mockSubscriptionData.docs[0]._id).reply(403, notAuthorizedError("subscription"))
      const expectedActions = [
        { type: types.GET_SUBSCRIPTION },
        { type: types.GET_SUBSCRIPTION_FAIL, payload: notAuthorizedError("subscription") }
      ]
      return store
        .dispatch(actions.getSubscription(mockSubscriptionData.docs[0]._id))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('postSubscription(subscription) success', () => {
      nock.post("/subscriptions").reply(200, mockSubscriptionData.docs[0])
      const expectedActions = [
        { type: types.POST_SUBSCRIPTION },
        { type: types.POST_SUBSCRIPTION_SUCCESS, payload: mockSubscriptionData.docs[0] }
      ]
      return store
        .dispatch(actions.postSubscription(mockSubscriptionData.docs[0]))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })
    it('postSubscription(subscription) 401-error', () => {
      nock.post("/subscriptions").reply(401, alreadyExistsError("subscription"))
      const expectedActions = [
        { type: types.POST_SUBSCRIPTION },
        { type: types.POST_SUBSCRIPTION_FAIL, payload: alreadyExistsError("subscription") }
      ]
      return store
        .dispatch(actions.postSubscription(mockSubscriptionData.docs[0]))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('putSubscription(id, subscription) success', () => {
      let updatedSubscription = mockSubscriptionData.docs[0]
      updatedSubscription.cancel_at_period_end = true
      nock.put("/subscriptions/"+mockSubscriptionData.docs[0]._id).reply(200, updatedSubscription)
      const expectedActions = [
        { type: types.PUT_SUBSCRIPTION },
        { type: types.PUT_SUBSCRIPTION_SUCCESS, payload: updatedSubscription }
      ]
      return store
        .dispatch(actions.putSubscription(mockSubscriptionData.docs[0]._id, updatedSubscription))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })
    it('putSubscription(id, subscription) 401-error', () => {
      let updatedSubscription = mockSubscriptionData.docs[0]
      updatedSubscription.cancel_at_period_end = true

      nock.put("/subscriptions/"+mockSubscriptionData.docs[0]._id).reply(403, notAuthorizedError("subscription"))
      const expectedActions = [
        { type: types.PUT_SUBSCRIPTION },
        { type: types.PUT_SUBSCRIPTION_FAIL, payload: notAuthorizedError("subscription") }
      ]
      return store
        .dispatch(actions.putSubscription(mockSubscriptionData.docs[0]._id, updatedSubscription))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('deleteSubscription(subscription_id) success', () => {
      nock.delete("/subscriptions/"+mockSubscriptionData.docs[0]._id).reply(200, { message: "subscription successfully deleted" })
      const expectedActions = [
        { type: types.DELETE_SUBSCRIPTION },
        { type: types.DELETE_SUBSCRIPTION_SUCCESS, payload: { message: "subscription successfully deleted" } }
      ]
      return store
        .dispatch(actions.deleteSubscription(mockSubscriptionData.docs[0]._id))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })
    it('deleteSubscription(subscription_id) 403-error', () => {
      nock.delete("/subscriptions/"+mockSubscriptionData.docs[0]._id).reply(403, notAuthorizedError("subscription"))
      const expectedActions = [
        { type: types.DELETE_SUBSCRIPTION },
        { type: types.DELETE_SUBSCRIPTION_FAIL, payload: notAuthorizedError("subscription") }
      ]
      return store
        .dispatch(actions.deleteSubscription(mockSubscriptionData.docs[0]._id))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })
  })

  describe('clear', () => {
    it('clearSubscription()', () => {
      const expectedActions = [
        { type: types.CLEAR_SUBSCRIPTION }
      ]
      return store
        .dispatch(actions.clearSubscription())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })
    // it('clearPostSubscription()', () => {
    //   const expectedActions = [
    //     { type: types.CLEAR_POST_SUBSCRIPTION }
    //   ]
    //   return store
    //     .dispatch(actions.clearPostSubscription())
    //     .then(() => {
    //       expect(store.getActions()).toEqual(expectedActions)
    //     })
    // })
    it('clearPutSubscription()', () => {
      const expectedActions = [
        { type: types.CLEAR_PUT_SUBSCRIPTION }
      ]
      return store
        .dispatch(actions.clearPutSubscription())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })
    // it('clearDeleteSubscription()', () => {
    //   const expectedActions = [
    //     { type: types.CLEAR_DELETE_SUBSCRIPTION }
    //   ]
    //   return store
    //     .dispatch(actions.clearDeleteSubscription())
    //     .then(() => {
    //       expect(store.getActions()).toEqual(expectedActions)
    //     })
    // })
  })

  describe("socket", () => {
    it('subscriptionCreated()', () => {
      const expectedActions = [
        { type: types.SUBSCRIPTION_CREATED, payload: mockNewSubscription }
      ]
      return store
        .dispatch(actions.subscriptionCreated(mockNewSubscription))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })
    it('subscriptionUpdated()', () => {
      let updatedSubscription = mockSubscriptionData.docs[0]
      updatedSubscription.cancel_at_period_end = true
      const expectedActions = [
        { type: types.SUBSCRIPTION_UPDATED, payload: updatedSubscription }
      ]
      return store
        .dispatch(actions.subscriptionUpdated(updatedSubscription))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })
    it('subscriptionDeleted()', () => {
      const expectedActions = [
        { type: types.SUBSCRIPTION_DELETED, payload: { _id: mockSubscriptionData.docs[0]._id }}
      ]
      return store
        .dispatch(actions.subscriptionDeleted({ _id: mockSubscriptionData.docs[0]._id }))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })
  })
})
