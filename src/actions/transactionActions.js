import * as types from '../constants/transaction-action-types'

export const getTransactions = (filter=undefined, page=0, limit=10, order="asc", orderBy="name") => async (dispatch, getState, api) => {
  dispatch({
    type: types.GET_TRANSACTIONS
  })
  let url = "/transaction?page=" + page +"&limit=" + limit + "&sort="+orderBy+":"+order+""

  if(filter !== undefined){
    if(filter.id !== undefined){
      url += "&id=" + filter.id
    }
  }
  try {
    const res = await api.get('/transactions')
    dispatch({
      type: types.GET_TRANSACTIONS_SUCCESS,
      payload: res
    })
  } catch (error) {
    dispatch({
      type: types.GET_TRANSACTIONS_FAIL,
       payload: error.response
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
      payload: res
    })
  } catch (error) {
    dispatch({
      type: types.GET_TRANSACTION_FAIL,
       payload: error.response
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
      payload: res
    })
  } catch (error) {
    dispatch({
      type: types.POST_TRANSACTION_FAIL,
       payload: error.response
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
      payload: res
    })
  } catch (error) {
    dispatch({
      type: types.PUT_TRANSACTION_FAIL,
       payload: error.response
     })
  }
}
export const deleteTransaction = (transaction_id) => async (dispatch, getState, api) => {
  dispatch({
    type: types.DELETE_TRANSACTION
  })
  try {
    const res = await api.delete(`/transactions/${transaction._id}`)
    dispatch({
      type: types.DELETE_TRANSACTION_SUCCESS,
      payload: res
    })
  } catch (error) {
    dispatch({
      type: types.DELETE_TRANSACTION_FAIL,
       payload: error.response
     })
  }
}
export const clearTransaction = () => async (dispatch, getState, api) => {
  dispatch({ type: types.CLEAR_TRANSACTION })
}

export const clearUpdateTransaction = () => async (dispatch, getState, api) => {
  dispatch({ type: types.CLEAR_UPDATE_TRANSACTION })
}
export const transactionCreated = () => async (dispatch, getState, api) => {
  dispatch({ type: types.TRANSACTION_CREATED})
}
export const transactionUpdated = () => async (dispatch, getState, api) => {
  dispatch({ type: types.TRANSACTION_UPDATED})
}
export const transactionDeleted = () => async (dispatch, getState, api) => {
  dispatch({ type: types.TRANSACTION_DELETED})
}
