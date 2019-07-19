import * as types from '../constants/product-action-types'
import fileSaver from 'file-saver'
import { updateDoc, deleteDoc } from './utils/reducerUtils'

const initialState = {
  loaded: false,
  editOpen: false,

  product: false,
  page: 0,
  limit: 10,
  total: 0,
  docs: [],

  gettingProduct: false,
  getProductErrorMessage: false,

  gettingProducts: false,
  getProductsErrorMessage: false,

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
    case types.GET_PRODUCT:
      return {
        ...state,
        gettingProduct: true
      }
    case types.GET_PRODUCT_SUCCESS:
      return {
        ...state,
        gettingProduct: false,
        product: action.payload
      }
    case types.GET_PRODUCT_FAIL:
      return {
        ...state,
        gettingProduct: false,
        getProductErrorMessage: action.payload.err.message
      }
    case types.GET_PRODUCTS:
      return {
        ...state,
        gettingProducts: true,
      }
    case types.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        loaded: true,
        gettingProducts: false,
        ...action.payload
      }
    case types.GET_PRODUCTS_FAIL:
      return {
        ...state,
        gettingProducts: false,
        getProductsErrorMessage: action.payload.err.message
      }
    case types.POST_PRODUCT:
      return {
        ...state,
        postingProduct: true
      }
    case types.POST_PRODUCT_SUCCESS:
      return {
        ...state,
        postingProduct: false,
        total: state.total + 1,
        docs: [action.payload, ...state.docs],
        postProductSuccessMessage: "Product successfully created."
      }
    case types.POST_PRODUCT_FAIL:
      return {
        ...state,
        postingProduct: false,
        postProductErrorMessage: action.payload.err.message
      }
    case types.PUT_PRODUCT:
      return {
        ...state,
        puttingProduct: true
      }
    case types.PUT_PRODUCT_SUCCESS:
      return {
        ...state,
        puttingProduct: false,
        editOpen: false,
        docs: updateDoc(state.docs, action.payload),
        product: action.payload,
        putProductSuccessMessage: "Product successfully updated."
      }
    case types.PUT_PRODUCT_FAIL:
      return {
        ...state,
        puttingProduct: false,
        putProductErrorMessage: action.payload.err.message
      }
    case types.DELETE_PRODUCT:
      return {
        ...state,
        deletingProduct: true
      }
    case types.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        docs: deleteDoc(state.docs, action.payload),
        deletingProduct: false,
        deleteProductSuccessMessage: "Product successfully deleted."
      }
    case types.DELETE_PRODUCT_FAIL:
      return {
        ...state,
        deletingProduct: false,
        deleteProductErrorMessage: action.payload.err.message
      }
    case types.TOGGLE_EDITING_PRODUCT:
      return {
        ...state,
        editOpen: !state.editOpen
      }
    case types.DOWNLOAD_PRODUCT:
      return {
        ...state,
        downloadingProduct: true
      }
    case types.DOWNLOAD_PRODUCT_SUCCESS:
      return {
        ...state,
        downloadingProduct: false
      }
    case types.DOWNLOAD_PRODUCT_FAIL:
      alert(action.payload.message)
      return {
        ...state,
        downloadingProduct: false,
        downloadProductErrorMessage: action.payload.message
      }

    /* Clear Reducers */
    case types.CLEAR_PRODUCT:
      return {
        ...state,
        product: false,
        getProductErrorMessage: false
      }
    case types.CLEAR_POST_PRODUCT:
      return{
        ...state,
        postProductErrorMessage: false,
        postProductSuccessMessage: false
      }
    case types.CLEAR_PUT_PRODUCT:
      return {
        ...state,
        putProductErrorMessage: false,
        putProductSuccessMessage: false
      }
    case types.CLEAR_DELETE_PRODUCT:
      return {
        ...state,
        deleteProductErrorMessage: false,
        deleteProductSuccessMessage: false
      }

    /* SocketIO Event Reducers */
    case types.PRODUCT_CREATED:
      return {
        ...state
      }
    case types.PRODUCT_UPDATED:
      return {
        ...state,
        docs: updateDoc(state.docs, action.payload)
      }
    case types.PRODUCT_DELETED:
      return {
        ...state,
        docs: deleteDoc(state.docs, action.payload)
      }

    default:
      return state
  }
}

export { initialState, productsReducer }
