import * as types from '../constants/subscription-action-types'

export const getSubscriptions = (filter=undefined, page=0, limit=10, order="asc", orderBy="name") => async (dispatch, getState, api) => {
  dispatch({
    type: types.GET_SUBSCRIPTIONS
  })
  let url = "/subscriptions?page=" + page +"&limit=" + limit + "&sort="+orderBy+":"+order+""
  if(filter){
    if(filter._id){ url += "&_id=" + filter._id }
    if(filter.username){ url += "&username=" + filter.username }
    if(filter.email){ url += "&email=" + filter.email }
    if(filter.subscription){ url += "&subscription=" + filter.subscription}
  }
  try {
    const res = await api.get(url)
    dispatch({
      type: types.GET_SUBSCRIPTIONS_SUCCESS,
      payload: res
    })
  } catch (error) {
    dispatch({
      type: types.GET_SUBSCRIPTIONS_FAIL,
       payload: error.response
     })
  }
}
export const getSubscription = (subscription_id) => async (dispatch, getState, api) => {
  dispatch({
    type: types.GET_SUBSCRIPTION
  })
  try {
    const res = await api.get(`/subscriptions/${subscription_id}`)
    dispatch({
      type: types.GET_SUBSCRIPTION_SUCCESS,
      payload: res
    })
  } catch (error) {
    dispatch({
      type: types.GET_SUBSCRIPTION_FAIL,
       payload: error.response
     })
  }
}
export const postSubscription = (subscription) => async (dispatch, getState, api) => {
  dispatch({
    type: types.POST_SUBSCRIPTION
  })
  try {
    const res = await api.post('/subscriptions', subscription)
    dispatch({
      type: types.POST_SUBSCRIPTION_SUCCESS,
      payload: res
    })
  } catch (error) {
    dispatch({
      type: types.POST_SUBSCRIPTION_FAIL,
       payload: error.response
     })
  }
}
export const putSubscription = (subscription) => async (dispatch, getState, api) => {
  dispatch({
    type: types.PUT_SUBSCRIPTION
  })
  try {
    const res = await api.put(`/subscriptions/${subscription._id}`, subscription)
    dispatch({
      type: types.PUT_SUBSCRIPTION_SUCCESS,
      payload: res
    })
  } catch (error) {
    dispatch({
      type: types.PUT_SUBSCRIPTION_FAIL,
       payload: error.response
     })
  }
}
export const deleteSubscription = (subscription_id) => async (dispatch, getState, api) => {
  dispatch({
    type: types.DELETE_SUBSCRIPTION
  })
  try {
    const res = await api.delete(`/subscriptions/${subscription._id}`)
    dispatch({
      type: types.DELETE_SUBSCRIPTION_SUCCESS,
      payload: res
    })
  } catch (error) {
    dispatch({
      type: types.DELETE_SUBSCRIPTION_FAIL,
       payload: error.response
     })
  }
}
export const clearSubscription = () => async (dispatch, getState, api) => {
  dispatch({ type: types.CLEAR_SUBSCRIPTION })
}
export const toggleCancelSubscriptionOpen = () => async (dispatch, getState, api) => {
  dispatch({ type: types.TOGGLE_CANCEL_SUBSCRIPTION })
}
export const clearCancelSuccessMessage = () => async (dispatch, getState, api) => {
  dispatch({ type: types.CLEAR_CANCEL_SUCCESS_MESSAGE })
}

export const clearPutSubscription = () => async (dispatch, getState, api) => {
  dispatch({ type: types.CLEAR_PUT_SUBSCRIPTION })
}

export const subscriptionCreated = () => async (dispatch, getState, api) => {
  dispatch({ type: types.SUBSCRIPTION_CREATED})
}
export const subscriptionUpdated = () => async (dispatch, getState, api) => {
  dispatch({ type: types.SUBSCRIPTION_UPDATED})
}
export const subscriptionDeleted = () => async (dispatch, getState, api) => {
  dispatch({ type: types.SUBSCRIPTION_DELETED})
}
