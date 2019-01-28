import {
  GET_TRANSACTION,
  GET_TRANSACTION_SUCCESS,
  GET_TRANSACTION_FAIL,
  GET_TRANSACTIONS,
  GET_TRANSACTIONS_SUCCESS,
  GET_TRANSACTIONS_FAIL,
  POST_TRANSACTION,
  POST_TRANSACTION_SUCCESS,
  POST_TRANSACTION_FAIL,
  PUT_TRANSACTION,
  PUT_TRANSACTION_SUCCESS,
  PUT_TRANSACTION_FAIL,
  DELETE_TRANSACTION,
  DELETE_TRANSACTION_SUCCESS,
  DELETE_TRANSACTION_FAIL,
  CLEAR_TRANSACTION
} from '../constants/transaction-action-types'

const initialState = {
  loaded: false,
  loading: false,
  message: false,
  error: false,

  transaction: false,

  gettingTransaction: false,
  gettingTransactionError: false,
  gettingTransactions: false,
  gettingTransactionsError: false,
  postingTransaction: false,
  postingTransactionError: false,
  puttingTransaction: false,
  puttingTransactionError: false,
  deletingTransaction: false,
  deletingTransactionError: false
}
export default (state=initialState, action) => {
  switch (action.type) {
    case GET_TRANSACTION:
      return {
        ...state,
        gettingTransaction: true
      }
    case GET_TRANSACTION_SUCCESS:
      return {
        ...state,
        gettingTransaction: false,
        transaction: action.payload.data
      }
    case GET_TRANSACTION_FAIL:
      return {
        ...state,
        gettingTransaction: false,
        gettingTransactionError: action.payload.data.err.message
      }
    case GET_TRANSACTIONS:
      return {
        ...state,
        gettingTransactions: true,
      }
    case GET_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        gettingTransactions: false,
        ...action.payload.data
      }
    case GET_TRANSACTIONS_FAIL:
      return {
        ...state,
        gettingTransactions: false,
        gettingTransactionsError: action.payload.data.err.message
      }
    case POST_TRANSACTION:
      return {
        ...state,
        postingTransaction: true
      }
    case POST_TRANSACTION_SUCCESS:
      return {
        ...state,
        postingTransaction: false,
        // hmmmm, how should we handle posting success result
        message: "created successfully"
      }
    case POST_TRANSACTION_FAIL:
      return {
        ...state,
        postingTransaction: false,
        postingTransactionError: action.payload.data.err.message
      }
    case PUT_TRANSACTION:
      return {
        ...state,
        puttingTransaction: true
      }
    case PUT_TRANSACTION_SUCCESS:
      return {
        ...state,
        puttingTransaction: false,
      }
    case PUT_TRANSACTION_FAIL:
      return {
        ...state,
        puttingTransaction: false,
        puttingTransactionError: action.payload.data.err.message
      }
    case DELETE_TRANSACTION:
      return {
        ...state,
        deletingTransaction: true
      }
    case DELETE_TRANSACTION_SUCCESS:
      return {
        ...state,
        deletingTransaction: false
      }
    case DELETE_TRANSACTION_FAIL:
      return {
        ...state,
        deletingTransaction: false,
        deletingTransactionError: action.payload.data.err.message
      }
    case CLEAR_TRANSACTION:
      return {
        ...state,
        transaction: false,
        gettingTransactionError: false
      }
    default:
      return state
  }
}
