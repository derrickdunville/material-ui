/**
 * @jest-environment node
 */
import expect from 'expect'
import { subscriptionsReducer, initialState } from '../../src/reducers/subscriptionsReducer'
import * as types from '../../src/constants/subscription-action-types'
import { mockSubscriptionData, loadedState, mockNewSubscription } from '../data/mockSubscriptionData'
import { internalServerError, notFoundError, alreadyExistsError, notAuthorizedError } from '../data/mockErrors'
import { updateDoc, deleteDoc } from '../../src/reducers/utils/reducerUtils'

describe('subscriptions reducer', () => {
  it('should return the initial state', () => {
    expect(subscriptionsReducer(undefined, {})).toEqual(
      initialState
    )
  })

  describe('get (list)', () => {
    it('GET_SUBSCRIPTIONS', () => {
      expect(
        subscriptionsReducer(initialState, {
          type: types.GET_SUBSCRIPTIONS
        })
      ).toEqual({
        ...initialState,
        gettingSubscriptions: true
      })
    })
    it('GET_SUBSCRIPTIONS_SUCCESS', () => {
      expect(
        subscriptionsReducer(initialState, {
          type: types.GET_SUBSCRIPTIONS_SUCCESS,
          payload: mockSubscriptionData
        })
      ).toEqual({
        ...initialState,
        gettingSubscriptions: false,
        loaded: true,
        ...mockSubscriptionData
      })
    })
    it('GET_SUBSCRIPTIONS_FAIL', () => {
      expect(
        subscriptionsReducer(initialState, {
          type: types.GET_SUBSCRIPTIONS_FAIL,
          payload: internalServerError
        })
      ).toEqual({
        ...initialState,
        gettingSubscription: false,
        getSubscriptionsErrorMessage: internalServerError.err.message
      })
    })
  })
  describe('get', () => {
    it('GET_SUBSCRIPTION', () => {
      expect(
        subscriptionsReducer(initialState, {
          type: types.GET_SUBSCRIPTION
        })
      ).toEqual({
        ...initialState,
        gettingSubscription: true
      })
    })
    it('GET_SUBSCRIPTION_SUCCESS', () => {
      expect(
        subscriptionsReducer(initialState, {
          type: types.GET_SUBSCRIPTION_SUCCESS,
          payload: mockSubscriptionData[0]
        })
      ).toEqual({
        ...initialState,
        gettingSubscription: false,
        subscription: mockSubscriptionData[0]
      })
    })
    it('GET_SUBSCRIPTION_FAIL', () => {
      expect(
        subscriptionsReducer(initialState, {
          type: types.GET_SUBSCRIPTION_FAIL,
          payload: notFoundError("subscription")
        })
      ).toEqual({
        ...initialState,
        gettingSubscription: false,
        getSubscriptionErrorMessage: notFoundError("subscription").err.message
      })
    })
  })
  describe('put', () => {
    it('PUT_SUBSCRIPTION', () => {
      expect(
        subscriptionsReducer(loadedState, {
          type: types.PUT_SUBSCRIPTION
        })
      ).toEqual({
        ...loadedState,
        puttingSubscription: true
      })
    })
    it('PUT_SUBSCRIPTION_SUCCESS', () => {
      let updatedSubscription = loadedState.docs[0]
      updatedSubscription.cancel_at_period_end = true
      expect(
        subscriptionsReducer(loadedState, {
          type: types.PUT_SUBSCRIPTION_SUCCESS,
          payload: {
            ...updatedSubscription
          }
        })
      ).toEqual({
        ...loadedState,
        puttingSubscription: false,
        subscription: {...updatedSubscription},
        docs: [{...updatedSubscription}],
        putSubscriptionSuccessMessage: 'Subscription successfully updated.',
      })
    })
    it('PUT_SUBSCRIPTION_FAIL', () => {
      expect(
        subscriptionsReducer(loadedState, {
          type: types.PUT_SUBSCRIPTION_FAIL,
          payload: notAuthorizedError("subscription")
        })
      ).toEqual({
        ...loadedState,
        puttingSubscription: false,
        putSubscriptionErrorMessage: notAuthorizedError("subscription").err.message
      })
    })
  })
  describe('delete', () => {
    it('DELETE_SUBSCRIPTION', () => {
      expect(
        subscriptionsReducer(loadedState, {
          type: types.DELETE_SUBSCRIPTION
        })
      ).toEqual({
        ...loadedState,
        deletingSubscription: true
      })
    })
    it('DELETE_SUBSCRIPTION_SUCCESS', () => {
      expect(
        subscriptionsReducer(loadedState, {
          type: types.DELETE_SUBSCRIPTION_SUCCESS,
          payload: {
            _id: loadedState.docs[0]._id,
            messsage: "Subscription successfully deleted."
          }
        })
      ).toEqual({
        ...loadedState,
        deletingSubscription: false,
        deleteSubscriptionSuccessMessage: "Subscription successfully deleted.",
        docs: []
      })
    })
    it('DELETE_SUBSCRIPTION_FAIL', () => {
      expect(
        subscriptionsReducer(loadedState, {
          type: types.DELETE_SUBSCRIPTION_FAIL,
          payload: notFoundError("subscription")
        })
      ).toEqual({
        ...loadedState,
        deletingSubscription: false,
        deleteSubscriptionErrorMessage: notFoundError("subscription").err.message
      })
    })
  })
  describe('clear', () => {
    it('CLEAR_SUBSCRIPTION', () => {
      expect(
        subscriptionsReducer(loadedState, {
          type: types.CLEAR_SUBSCRIPTION
        })
      ).toEqual({
        ...loadedState,
        subscription: false
      })
    })
    it('CLEAR_DELETE_SUBSCRIPTION', () => {
      let deleteState = {
        ...loadedState,
        deleteSubscriptionErrorMessage: "Subscription not found",
        deleteSubscriptionSuccessMessage: "Subscription successfully deleted."
      }
      expect(
        subscriptionsReducer(deleteState, {
          type: types.CLEAR_DELETE_SUBSCRIPTION
        })
      ).toEqual({
        ...deleteState,
        deleteSubscriptionErrorMessage: false,
        deleteSubscriptionSuccessMessage: false
      })
    })
    it('CLEAR_PUT_SUBSCRIPTION', () => {
      let putState = {
        ...loadedState,
        putSubscriptionErrorMessage: "Subscription not found",
        putSubscriptionSuccessMessage: "Subscription successfully updated."
      }
      expect(
        subscriptionsReducer(putState, {
          type: types.CLEAR_PUT_SUBSCRIPTION
        })
      ).toEqual({
        ...loadedState,
        putSubscriptionErrorMessage: false,
        putSubscriptionSuccessMessage: false
      })
    })
  })
  describe('socket', () => {
    it('SUBSCRIPTION_UPDATED', () => {
      expect(
        subscriptionsReducer(loadedState, {
          type: types.SUBSCRIPTION_UPDATED,
          payload: {
            ...loadedState.docs[0],
            description: "this is an updated subscription description"
          }
        })
      ).toEqual({
        ...loadedState,
        docs: updateDoc(loadedState.docs, {...loadedState.docs[0], description: "this is an updated subscription description"})
      })
    })
    it('SUBSCRIPTION_CREATED', () => {
      expect(
        subscriptionsReducer(loadedState, {
          type: types.SUBSCRIPTION_CREATED,
          payload: mockNewSubscription
        })
      ).toEqual({
        ...loadedState
      })
    })
    it('SUBSCRIPTION_DELETED', () => {
      expect(
        subscriptionsReducer(loadedState, {
          type: types.SUBSCRIPTION_DELETED,
          payload: { _id: loadedState.docs[0]._id }
        })
      ).toEqual({
        ...loadedState,
        docs: []
      })
    })
  })
})
