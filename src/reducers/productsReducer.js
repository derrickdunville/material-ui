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
  CLEAR_PRODUCT,
  CLEAR_MESSAGE,
  TOGGLE_EDITING_PRODUCT,
  DOWNLOAD_PRODUCT,
  DOWNLOAD_PRODUCT_SUCCESS,
  DOWNLOAD_PRODUCT_FAIL,
  CLEAR_POST_PRODUCT,
  CLEAR_PUT_PRODUCT,
  CLEAR_DELETE_PRODUCT
} from '../constants/product-action-types'
import fileSaver from 'file-saver'
import { updateDoc, deleteDoc } from './utils/reducerUtils'

const initialState = {
  loaded: false,
  loading: false,
  message: false,
  error: false,
  editOpen: false,

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
  postProductErrorMessage: false,
  postProductSuccessMessage: false,

  puttingProduct: false,
  putProductSuccessMessage: false,
  putProductErrorMessage: false,

  deletingProduct: false,
  deleteProductSuccessMessage: false,
  deleteProductErrorMessage: false
}

const productsReducer = (state=initialState, action) => {
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
        product: action.payload
      }
    case GET_PRODUCT_FAIL:
      return {
        ...state,
        gettingProduct: false,
        gettingProductError: action.payload.err.message
      }
    case GET_PRODUCTS:
      return {
        ...state,
        gettingProducts: true,
      }
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        loaded: true,
        gettingProducts: false,
        ...action.payload
      }
    case GET_PRODUCTS_FAIL:
      return {
        ...state,
        gettingProducts: false,
        gettingProductsError: action.payload.err.message
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
        docs: [action.payload, ...state.docs],
        postProductSuccessMessage: "Product created successfully"
      }
    case POST_PRODUCT_FAIL:
      return {
        ...state,
        postingProduct: false,
        postProductErrorMessage: action.payload.err.message
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
        editOpen: false,
        docs: updateDoc(state.docs, action.payload),
        product: action.payload,
        putProductSuccessMessage: "Product updated successfully."
      }
    case PUT_PRODUCT_FAIL:
      return {
        ...state,
        puttingProduct: false,
        putProductErrorMessage: action.payload.err.message
      }
    case DELETE_PRODUCT:
      return {
        ...state,
        deletingProduct: true
      }
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        docs: deleteDoc(state.docs, action.payload),
        deletingProduct: false,
        deleteProductSuccessMessage: "Product deleted successfully."
      }
    case DELETE_PRODUCT_FAIL:
      return {
        ...state,
        deletingProduct: false,
        deleteProductErrorMessage: action.payload.err.message
      }
    case CLEAR_PRODUCT:
      return {
        ...state,
        product: false,
        gettingProductError: false
      }
    case CLEAR_MESSAGE:
      return {
        ...state,
        message: false
      }
    case TOGGLE_EDITING_PRODUCT:
      return {
        ...state,
        editOpen: !state.editOpen
      }
    case DOWNLOAD_PRODUCT:
      return {
        ...state,
        downloadingProduct: true
      }
    case DOWNLOAD_PRODUCT_SUCCESS:
      return {
        ...state,
        downloadingProduct: false
      }
    case DOWNLOAD_PRODUCT_FAIL:
      alert(action.payload.message)
      return {
        ...state,
        downloadingProduct: false,
        downloadProductErrorMessage: action.payload.message
      }
    case CLEAR_POST_PRODUCT:
      return{
        ...state,
        postProductErrorMessage: false,
        postProductSuccessMessage: false
      }
    case CLEAR_PUT_PRODUCT:
      return {
        ...state,
        putProductErrorMessage: false,
        putProductSuccessMessage: false
      }
    case CLEAR_DELETE_PRODUCT:
      return {
        ...state,
        deleteProductErrorMessage: false,
        deleteProductSuccessMessage: false
      }
    default:
      return state
  }
}
