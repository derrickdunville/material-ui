import {
  GET_SUBSCRIPTION,
  GET_SUBSCRIPTION_SUCCESS,
  GET_SUBSCRIPTION_FAIL,
  GET_SUBSCRIPTIONS,
  GET_SUBSCRIPTIONS_SUCCESS,
  GET_SUBSCRIPTIONS_FAIL,
  POST_SUBSCRIPTION,
  POST_SUBSCRIPTION_SUCCESS,
  POST_SUBSCRIPTION_FAIL,
  PUT_SUBSCRIPTION,
  PUT_SUBSCRIPTION_SUCCESS,
  PUT_SUBSCRIPTION_FAIL,
  DELETE_SUBSCRIPTION,
  DELETE_SUBSCRIPTION_SUCCESS,
  DELETE_SUBSCRIPTION_FAIL,
  CLEAR_SUBSCRIPTION,
  TOGGLE_CANCEL_SUBSCRIPTION,
  CLEAR_CANCEL_SUCCESS_MESSAGE
} from '../constants/subscription-action-types'

const initialState = {
  loaded: false,
  loading: false,
  message: false,
  error: false,

  subscription: false,
  page: 0,
  limit: 10,
  total: 0,
  docs: [],

  gettingSubscription: false,
  gettingSubscriptionError: false,
  gettingSubscriptions: false,
  gettingSubscriptionsError: false,
  postingSubscription: false,
  postingSubscriptionError: false,
  puttingSubscription: false,
  puttingSubscriptionError: false,
  deletingSubscription: false,
  deletingSubscriptionError: false
}
export default (state=initialState, action) => {
  switch (action.type) {
    case GET_SUBSCRIPTION:
      return {
        ...state,
        gettingSubscription: true
      }
    case GET_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        gettingSubscription: false,
        subscription: action.payload.data
      }
    case GET_SUBSCRIPTION_FAIL:
      return {
        ...state,
        gettingSubscription: false,
        gettingSubscriptionError: action.payload.data.err.message
      }
    case GET_SUBSCRIPTIONS:
      return {
        ...state,
        gettingSubscriptions: true,
      }
    case GET_SUBSCRIPTIONS_SUCCESS:
      return {
        ...state,
        gettingSubscriptions: false,
        ...action.payload.data
      }
    case GET_SUBSCRIPTIONS_FAIL:
      return {
        ...state,
        gettingSubscriptions: false,
        gettingSubscriptionsError: action.payload.data.err.message
      }
    case POST_SUBSCRIPTION:
      return {
        ...state,
        postingSubscription: true
      }
    case POST_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        postingSubscription: false,
        // hmmmm, how should we handle posting success result
        message: "created successfully"
      }
    case POST_SUBSCRIPTION_FAIL:
      return {
        ...state,
        postingSubscription: false,
        postingSubscriptionError: action.payload.data.err.message
      }
    case PUT_SUBSCRIPTION:
      return {
        ...state,
        puttingSubscription: true
      }
    case PUT_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        puttingSubscription: false,
        cancelSuccessMessage: "Membership successfully canceled"
      }
    case PUT_SUBSCRIPTION_FAIL:
      return {
        ...state,
        puttingSubscription: false,
        puttingSubscriptionError: action.payload.data.err.message
      }
    case DELETE_SUBSCRIPTION:
      return {
        ...state,
        deletingSubscription: true
      }
    case DELETE_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        deletingSubscription: false
      }
    case DELETE_SUBSCRIPTION_FAIL:
      return {
        ...state,
        deletingSubscription: false,
        deletingSubscriptionError: action.payload.data.err.message
      }
    case CLEAR_SUBSCRIPTION:
      return {
        ...state,
        subscription: false,
        gettingSubscriptionError: false
      }
    default:
      return state
  }
}
