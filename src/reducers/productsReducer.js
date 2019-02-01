import {
  GET_PRODUCT,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAIL,
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
  POST_PRODUCT,
  POST_PRODUCT_SUCCESS,
  POST_PRODUCT_FAIL,
  PUT_PRODUCT,
  PUT_PRODUCT_SUCCESS,
  PUT_PRODUCT_FAIL,
  DELETE_PRODUCT,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  CLEAR_PRODUCT
} from '../constants/product-action-types'

const initialState = {
  loaded: false,
  loading: false,
  message: false,
  error: false,

  product: false,
  page: 0,
  limit: 10,
  total: 0,
  docs: [],

  gettingProduct: false,
  gettingProductError: false,
  gettingProducts: false,
  gettingProductsError: false,
  postingProduct: false,
  postingProductError: false,
  puttingProduct: false,
  puttingProductError: false,
  deletingProduct: false,
  deletingProductError: false
}
export default (state=initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT:
      return {
        ...state,
        gettingProduct: true
      }
    case GET_PRODUCT_SUCCESS:
      return {
        ...state,
        gettingProduct: false,
        product: action.payload.data
      }
    case GET_PRODUCT_FAIL:
      return {
        ...state,
        gettingProduct: false,
        gettingProductError: action.payload.data.err.message
      }
    case GET_PRODUCTS:
      return {
        ...state,
        gettingProducts: true,
      }
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        gettingProducts: false,
        ...action.payload.data
      }
    case GET_PRODUCTS_FAIL:
      return {
        ...state,
        gettingProducts: false,
        gettingProductsError: action.payload.data.err.message
      }
    case POST_PRODUCT:
      return {
        ...state,
        postingProduct: true
      }
    case POST_PRODUCT_SUCCESS:
      return {
        ...state,
        postingProduct: false,
        // hmmmm, how should we handle posting success result
        message: "created successfully"
      }
    case POST_PRODUCT_FAIL:
      return {
        ...state,
        postingProduct: false,
        postingProductError: action.payload.data.err.message
      }
    case PUT_PRODUCT:
      return {
        ...state,
        puttingProduct: true
      }
    case PUT_PRODUCT_SUCCESS:
      return {
        ...state,
        puttingProduct: false,
      }
    case PUT_PRODUCT_FAIL:
      return {
        ...state,
        puttingProduct: false,
        puttingProductError: action.payload.data.err.message
      }
    case DELETE_PRODUCT:
      return {
        ...state,
        deletingProduct: true
      }
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        deletingProduct: false
      }
    case DELETE_PRODUCT_FAIL:
      return {
        ...state,
        deletingProduct: false,
        deletingProductError: action.payload.data.err.message
      }
    case CLEAR_PRODUCT:
      return {
        ...state,
        product: false,
        gettingProductError: false
      }
    default:
      return state
  }
}
