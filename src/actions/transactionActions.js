import * as types from '../constants/transaction-action-types'

export const getTransactions = (filter=undefined, page=0, limit=10, order="asc", orderBy="name") => async (dispatch, getState, api) => {
  dispatch({
    type: types.GET_TRANSACTIONS
  })
  let url = "/transactions?page=" + page +"&limit=" + limit + "&sort="+orderBy+":"+order+""

  if(filter){
    if(filter.id){url += "&id=" + filter.id}
    if(filter.username){url += "&username=" + filter.username}
    if(filter.trans_num){url += "&trans_num=" + filter.trans_num}
    if(filter.subscription){url += "&subscription=" + filter.subscription}
    if(filter.email){url += "&email=" + filter.email}
  }
  try {
    const res = await api.get(url)
    dispatch({
      type: types.GET_TRANSACTIONS_SUCCESS,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: types.GET_TRANSACTIONS_FAIL,
       payload: error.response.data
     })
  }
}
export const getTransaction = (transaction_id) => async (dispatch, getState, api) => {
  dispatch({
    type: types.GET_TRANSACTION
  })
  try {
    const res = await api.get(`/transactions/${transaction_id}`)
    dispatch({
      type: types.GET_TRANSACTION_SUCCESS,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: types.GET_TRANSACTION_FAIL,
       payload: error.response.data
     })
  }
}
export const postTransaction = (transaction) => async (dispatch, getState, api) => {
  dispatch({
    type: types.POST_TRANSACTION
  })
  try {
    const res = await api.post('/transactions', transaction)
    dispatch({
      type: types.POST_TRANSACTION_SUCCESS,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: types.POST_TRANSACTION_FAIL,
       payload: error.response.data
     })
  }
}
export const putTransaction = (transaction) => async (dispatch, getState, api) => {
  dispatch({
    type: types.PUT_TRANSACTION
  })
  try {
    const res = await api.put(`/transactions/${transaction._id}`, transaction)
    dispatch({
      type: types.PUT_TRANSACTION_SUCCESS,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: types.PUT_TRANSACTION_FAIL,
       payload: error.response.data
     })
  }
}
export const deleteTransaction = (history, transaction_id) => async (dispatch, getState, api) => {
  dispatch({
    type: types.DELETE_TRANSACTION
  })
  try {
    const res = await api.delete(`/transactions/${transaction_id}`)
    dispatch({
      type: types.DELETE_TRANSACTION_SUCCESS,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: types.DELETE_TRANSACTION_FAIL,
       payload: error.response.data
     })
  }
}

export const clearTransaction = () => async (dispatch, getState, api) => {
  dispatch({ type: types.CLEAR_TRANSACTION })
}
export const clearPostTransaction = () => async (dispatch, getState, api) => {
  dispatch({ type: types.CLEAR_POST_TRANSACTION })
}
export const clearPutTransaction = () => async (dispatch, getState, api) => {
  dispatch({ type: types.CLEAR_PUT_TRANSACTION })
}
export const clearDeleteTransaction = () => async (dispatch, getState, api) => {
  dispatch({ type: types.CLEAR_DELETE_TRANSACTION })
}
export const clearUpdateTransaction = () => async (dispatch, getState, api) => {
  dispatch({ type: types.CLEAR_UPDATE_TRANSACTION })
}

export const transactionCreated = (transaction) => async (dispatch, getState, api) => {
  dispatch({ type: types.TRANSACTION_CREATED, payload: transaction})
}
export const transactionUpdated = (transaction) => async (dispatch, getState, api) => {
  dispatch({ type: types.TRANSACTION_UPDATED, payload: transaction})
}
export const transactionDeleted = (payload) => async (dispatch, getState, api) => {
  dispatch({ type: types.TRANSACTION_DELETED, payload: payload})
}
