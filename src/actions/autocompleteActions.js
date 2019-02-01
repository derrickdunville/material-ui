export const AUTOCOMPLETE_USER = 'AUTOCOMPLETE_USER'
export const AUTOCOMPLETE_USER_SUCCESS = "AUTOCOMPLETE_USER_SUCCESS"
export const AUTOCOMPLETE_USER_FAIL = "AUTOCOMPLETE_USER_FAIL"
export const autocompleteUser = (username) => async (dispatch, getState, api) => {
  dispatch({type: AUTOCOMPLETE_USER})
  try {
    const res = await api.get(`/autocomplete/user/${username}`)
    dispatch({
      type: AUTOCOMPLETE_USER_SUCCESS,
      payload: res
    })
  } catch (error) {
    dispatch({
      type: AUTOCOMPLETE_USER_FAIL,
       payload: error.response
     })
  }
}
export const CLEAR_AUTOCOMPLETE_USER = "CLEAR_AUTOCOMPLETE_USER"
export const clearAutocomleteUser = () => async (dispatch, getState, api) => {
  dispatch({type: CLEAR_AUTOCOMPLETE_USER})
}

export const AUTOCOMPLETE_PRODUCT = 'AUTOCOMPLETE_PRODUCT'
export const AUTOCOMPLETE_PRODUCT_SUCCESS = "AUTOCOMPLETE_PRODUCT_SUCCESS"
export const AUTOCOMPLETE_PRODUCT_FAIL = "AUTOCOMPLETE_PRODUCT_FAIL"
export const autocompleteProduct = (name) => async (dispatch, getState, api) => {
  dispatch({type: AUTOCOMPLETE_PRODUCT})
  try {
    const res = await api.get(`/autocomplete/product/${name}`)
    dispatch({
      type: AUTOCOMPLETE_PRODUCT_SUCCESS,
      payload: res
    })
  } catch (error) {
    dispatch({
      type: AUTOCOMPLETE_PRODUCT_FAIL,
       payload: error.response
     })
  }
}
export const CLEAR_AUTOCOMPLETE_PRODUCT = "CLEAR_AUTOCOMPLETE_PRODUCT"
export const clearAutocomleteProduct = () => async (dispatch, getState, api) => {
  dispatch({type: CLEAR_AUTOCOMPLETE_PRODUCT})
}

export const AUTOCOMPLETE_SUBSCRIPTION = 'AUTOCOMPLETE_SUBSCRIPTION'
export const AUTOCOMPLETE_SUBSCRIPTION_SUCCESS = "AUTOCOMPLETE_SUBSCRIPTION_SUCCESS"
export const AUTOCOMPLETE_SUBSCRIPTION_FAIL = "AUTOCOMPLETE_SUBSCRIPTION_FAIL"
export const autocompleteSubscription= (subscription_id) => async (dispatch, getState, api) => {
  dispatch({type: AUTOCOMPLETE_SUBSCRIPTION})
  try {
    const res = await api.get(`/autocomplete/subscription/${subscription_id}`)
    dispatch({
      type: AUTOCOMPLETE_SUBSCRIPTION_SUCCESS,
      payload: res
    })
  } catch (error) {
    dispatch({
      type: AUTOCOMPLETE_SUBSCRIPTION_FAIL,
       payload: error.response
     })
  }
}
export const CLEAR_AUTOCOMPLETE_SUBSCRIPTION = "CLEAR_AUTOCOMPLETE_SUBSCRIPTION"
export const clearAutocomleteSubscription = () => async (dispatch, getState, api) => {
  dispatch({type: CLEAR_AUTOCOMPLETE_SUBSCRIPTION})
}
