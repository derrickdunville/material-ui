import * as types from '../constants/subscription-action-types'

export const getSubscriptions = () => async (dispatch, getState, api) => {
  dispatch({
    type: types.GET_SUBSCRIPTIONS
  })
  try {
    const res = await api.get('/subscriptions')
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
