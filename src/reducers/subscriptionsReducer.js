import * as types from '../constants/subscription-action-types'
import { updateDoc, deleteDoc } from './utils/reducerUtils'

const initialState = {
  loaded: false,

  subscription: false,
  page: 0,
  limit: 10,
  total: 0,
  docs: [],

  gettingSubscription: false,
  getSubscriptionErrorMessage: false,

  gettingSubscriptions: false,
  getSubscriptionsErrorMessage: false,

  puttingSubscription: false,
  putSubscriptionErrorMessage: false,
  putSubscriptionSuccessMessage: false,

  deletingSubscription: false,
  deleteSubscriptionErrorMessage: false,
  deleteSubscriptionSuccessMessage: false
}

const subscriptionsReducer = (state=initialState, action) => {
  switch (action.type) {
    case types.GET_SUBSCRIPTION:
      return {
        ...state,
        gettingSubscription: true
      }
    case types.GET_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        gettingSubscription: false,
        subscription: action.payload
      }
    case types.GET_SUBSCRIPTION_FAIL:
      return {
        ...state,
        gettingSubscription: false,
        getSubscriptionErrorMessage: action.payload.err.message
      }
    case types.GET_SUBSCRIPTIONS:
      return {
        ...state,
        gettingSubscriptions: true,
      }
    case types.GET_SUBSCRIPTIONS_SUCCESS:
      return {
        ...state,
        loaded: true,
        gettingSubscriptions: false,
        ...action.payload
      }
    case types.GET_SUBSCRIPTIONS_FAIL:
      return {
        ...state,
        gettingSubscriptions: false,
        getSubscriptionsErrorMessage: action.payload.err.message
      }

    case types.PUT_SUBSCRIPTION:
      return {
        ...state,
        puttingSubscription: true
      }
    case types.PUT_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        puttingSubscription: false,
        subscription: action.payload,
        putSubscriptionSuccessMessage: "Subscription successfully updated.",
        putSubscriptionErrorMessage: false
      }
    case types.PUT_SUBSCRIPTION_FAIL:
      return {
        ...state,
        puttingSubscription: false,
        putSubscriptionErrorMessage: action.payload.err.message
      }

    case types.DELETE_SUBSCRIPTION:
      return {
        ...state,
        deletingSubscription: true
      }
    case types.DELETE_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        deletingSubscription: false,
        deleteSubscriptionSuccessMessage: "Subscription successfully deleted.",
        docs: deleteDoc(state.docs, action.payload)
      }
    case types.DELETE_SUBSCRIPTION_FAIL:
      return {
        ...state,
        deletingSubscription: false,
        deleteSubscriptionErrorMessage: action.payload.err.message
      }
    case types.CLEAR_SUBSCRIPTION:
      return {
        ...state,
        subscription: false,
        getSubscriptionErrorMessage: false
      }
    case types.CLEAR_PUT_SUBSCRIPTION:
      return {
        ...state,
        putSubscriptionSuccessMessage: false,
        putSubscriptionErrorMessage: false
      }
    case types.CLEAR_DELETE_SUBSCRIPTION:
      return {
        ...state,
        deleteSubscriptionSuccessMessage: false,
        deleteSubscriptionErrorMessage: false
      }
    case types.SUBSCRIPTION_CREATED:
      return {
        ...state
      }
    case types.SUBSCRIPTION_UPDATED:
      return {
        ...state,
        docs: updateDoc(state.docs, action.payload)
      }
    case types.SUBSCRIPTION_DELETED:
      return {
        ...state,
        docs: deleteDoc(state.docs, action.payload)
      }
    default:
      return state
  }
}

export { initialState, subscriptionsReducer }
