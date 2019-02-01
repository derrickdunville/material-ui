import {
  AUTOCOMPLETE_USER,
  AUTOCOMPLETE_USER_SUCCESS,
  AUTOCOMPLETE_USER_FAIL,
  CLEAR_AUTOCOMPLETE_USER,
  AUTOCOMPLETE_PRODUCT,
  AUTOCOMPLETE_PRODUCT_SUCCESS,
  AUTOCOMPLETE_PRODUCT_FAIL,
  CLEAR_AUTOCOMPLETE_PRODUCT,
  AUTOCOMPLETE_SUBSCRIPTION,
  AUTOCOMPLETE_SUBSCRIPTION_SUCCESS,
  AUTOCOMPLETE_SUBSCRIPTION_FAIL,
  CLEAR_AUTOCOMPLETE_SUBSCRIPTION
} from '../actions/autocompleteActions'

const initialState = {
  loading: false,
  users: [],
  products: [],
  subscriptions: []
}
export default (state=initialState, action) => {
  switch(action.type){
    case AUTOCOMPLETE_USER:
      return {
        ...state,
        loading: true
      }
    case AUTOCOMPLETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload.data
      }
    case AUTOCOMPLETE_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.data.err.message
      }
    case CLEAR_AUTOCOMPLETE_USER:
      return {
        ...state,
        users: []
      }
    case AUTOCOMPLETE_PRODUCT:
      return {
        ...state,
        loading: true
      }
    case AUTOCOMPLETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.data
      }
    case AUTOCOMPLETE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.data.err.message
      }
    case CLEAR_AUTOCOMPLETE_PRODUCT:
      return {
        ...state,
        products: []
      }
    case AUTOCOMPLETE_SUBSCRIPTION:
      return {
        ...state,
        loading: true
      }
    case AUTOCOMPLETE_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        loading: false,
        subscriptions: action.payload.data
      }
    case AUTOCOMPLETE_SUBSCRIPTION_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.data.err.message
      }
    case CLEAR_AUTOCOMPLETE_SUBSCRIPTION:
      return {
        ...state,
        subscriptions: []
      }
    default:
      return state
  }
}
