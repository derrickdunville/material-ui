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
  CLEAR_TRANSACTION,
  CLEAR_UPDATE_TRANSACTION,
  TRANSACTION_CREATED,
  TRANSACTION_UPDATED,
  TRANSACTION_DELETED
} from '../constants/transaction-action-types'

const initialState = {
  loaded: false,
  loading: false,
  message: false,
  error: false,

  transaction: false,
  page: 0,
  limit: 10,
  total: 0,
  docs: [],

  gettingTransaction: false,
  gettingTransactionError: false,
  gettingTransactions: false,
  gettingTransactionsError: false,
  postingTransaction: false,
  postingTransactionError: false,
  puttingTransaction: false,
  putTransactionSuccessMessage: false,
  putTransactionErrorMessage: false,
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
        transaction: action.payload.data.transaction,
        putTransactionSuccessMessage: action.payload.data.message,
        putTransactionErrorMessage: false
      }
    case PUT_TRANSACTION_FAIL:
      return {
        ...state,
        puttingTransaction: false,
        putTransactionSuccessMessage: false,
        putTransactionErrorMessage: action.payload.data.err.message
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
    case CLEAR_UPDATE_TRANSACTION:
      return {
        ...state,
        putTransactionErrorMessage: false,
        putTransactionSuccessMessage: false
      }
    case TRANSACTION_CREATED:
      console.log("TRANSACTION_CREATED")
      return {
        ...state,
        docs: [action.payload, ...state.docs],
        total: state.total + 1
      }
    case TRANSACTION_UPDATED:
      console.log("TRANSACTION_UPDATED")
      return {
        ...state,
        transaction: updateTransaction(state.transaction, action.payload),
        docs: updateTransactionInList(state.docs, action.payload)
      }
    case TRANSACTION_DELETED:
      console.log("TRANSACTION_DELETED")
      return {
        ...state,
        transaction: updateTransaction(state.transaction, action.payload),
      }
    default:
      return state
  }
}

function updateTransaction(transaction, payload){
  if(transaction._id == payload._id){
    return payload
  }
  return transaction
}
function updateTransactionInList(transactions, payload){

  console.log("transactions: ", transactions.length)
  return transactions.map( (transaction, index) => {
    if(transaction._id !== payload._id) {
      // This isn't the item we care about - keep it as-is
      return transaction;
    }
    // Otherwise, this is the one we want - return an updated value
    return {
      ...transaction,
      ...payload
    }
  })
}

function deleteTransactionInList(transactions, payload){
  let target_index = -1
  for(let i = 0; i < transactions.length; ++i){
    if(transactions[i]._id == payload.json._id){
      target_index = i
      break
    }
  }
  if(target_index < -1){
    return {
      ...state,
      data: [
        ...state.data.slice(0, target_index),
        ...state.data.slice(target_index + 1)
      ],
      total: state.total - 1
    }
  } else {
    return {
      state
    }
  }
}
