import * as types from '../constants/transaction-action-types'
import { updateDoc, deleteDoc } from './utils/reducerUtils'

const initialState = {
  loaded: false,

  transaction: false,
  page: 0,
  limit: 10,
  total: 0,
  docs: [],

  gettingTransaction: false,
  getTransactionErrorMessage: false,

  gettingTransactions: false,
  getTransactionsErrorMessage: false,

  postingTransaction: false,
  postTransactionErrorMessage: false,
  postTransactionSuccessMessage: false,

  puttingTransaction: false,
  putTransactionSuccessMessage: false,
  putTransactionErrorMessage: false,

  deletingTransaction: false,
  deleteTransactionErrorMessage: false,
  deleteTransactionSuccessMessage: false
}
const transactionsReducer = (state=initialState, action) => {
  switch (action.type) {
    case types.GET_TRANSACTION:
      return {
        ...state,
        gettingTransaction: true
      }
    case types.GET_TRANSACTION_SUCCESS:
      return {
        ...state,
        gettingTransaction: false,
        transaction: action.payload
      }
    case types.GET_TRANSACTION_FAIL:
      return {
        ...state,
        gettingTransaction: false,
        getTransactionErrorMessage: action.payload.err.message
      }
    case types.GET_TRANSACTIONS:
      return {
        ...state,
        gettingTransactions: true,
      }
    case types.GET_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        loaded: true,
        gettingTransactions: false,
        ...action.payload
      }
    case types.GET_TRANSACTIONS_FAIL:
      return {
        ...state,
        gettingTransactions: false,
        getTransactionsErrorMessage: action.payload.err.message
      }
    case types.POST_TRANSACTION:
      return {
        ...state,
        postingTransaction: true
      }
    case types.POST_TRANSACTION_SUCCESS:
      return {
        ...state,
        postingTransaction: false,
        total: state.total + 1,
        docs: [action.payload, ...state.docs],
        postTransactionSuccessMessage: "Transaction successfully created."
      }
    case types.POST_TRANSACTION_FAIL:
      return {
        ...state,
        postingTransaction: false,
        postTransactionErrorMessage: action.payload.err.message
      }
    case types.PUT_TRANSACTION:
      return {
        ...state,
        puttingTransaction: true
      }
    case types.PUT_TRANSACTION_SUCCESS:
      return {
        ...state,
        puttingTransaction: false,
        transaction: action.payload.transaction,
        docs: updateDoc(state.docs, action.payload.transaction),
        putTransactionSuccessMessage: "Transaction successfully updated.",
        putTransactionErrorMessage: false
      }
    case types.PUT_TRANSACTION_FAIL:
      return {
        ...state,
        puttingTransaction: false,
        putTransactionSuccessMessage: false,
        putTransactionErrorMessage: action.payload.err
      }
    case types.DELETE_TRANSACTION:
      return {
        ...state,
        deletingTransaction: true
      }
    case types.DELETE_TRANSACTION_SUCCESS:
      return {
        ...state,
        deletingTransaction: false,
        docs: deleteDoc(state.docs, action.payload),
        deleteTransactionSuccessMessage: "Transaction successfully deleted."
      }
    case types.DELETE_TRANSACTION_FAIL:
      return {
        ...state,
        deletingTransaction: false,
        deleteTransactionErrorMessage: action.payload.err.message
      }

    /* Clear Reducers */
    case types.CLEAR_TRANSACTION:
      return {
        ...state,
        transaction: false,
        getTransactionErrorMessage: false
      }
    case types.CLEAR_UPDATE_TRANSACTION:
      return {
        ...state,
        putTransactionErrorMessage: false,
        putTransactionSuccessMessage: false
      }
    case types.CLEAR_POST_TRANSACTION:
      return {
        ...state,
        postTransactionErrorMessage: false,
        postTransactionSuccessMessage: false
      }
    case types.CLEAR_PUT_TRANSACTION:
      return {
        ...state,
        putTransactionErrorMessage: false,
        putTransactionSuccessMessage: false
      }
    case types.CLEAR_DELETE_TRANSACTION:
      return {
        ...state,
        deleteTransactionErrorMessage: false,
        deleteTransactionSuccessMessage: false
      }

    /* SocketIO Event Reducers */
    case types.TRANSACTION_CREATED:
      return {
        ...state
      }
    case types.TRANSACTION_UPDATED:
      return {
        ...state,
        docs: updateDoc(state.docs, action.payload)
      }
    case types.TRANSACTION_DELETED:
      return {
        ...state,
        docs: deleteDoc(state.docs, action.payload)
      }
    default:
      return state
  }
}

export { initialState, transactionsReducer }
