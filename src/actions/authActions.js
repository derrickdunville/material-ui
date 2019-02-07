import * as types from '../constants/auth-action-types'

export const fetchCurrentUser = () => async (dispatch, getState, api) => {
  const res = await api.get('/@me')
  dispatch({ type: types.FETCH_CURRENT_USER, payload: res })
}
export const resetAuth = () => async (dispatch) => {
  dispatch({ type: types.RESET_AUTH })
}
export const loginUser = (history, username, password) => async (dispatch, getState, api) => {
  dispatch({
    type: types.LOGIN_USER,
    payload: {}
  })
  try {
    const res = await api.post('/login', {"username": username, "password": password})
    dispatch({
      type: types.LOGIN_USER_SUCCESS,
      payload: res
    })
    history.push('/app/')
  } catch (error) {
    dispatch({
      type: types.LOGIN_USER_FAIL,
       payload: error.response
     })
  }
}
export const signUpUser = (history, email, username, password, confirm_password) => async (dispatch, getState, api) => {
  dispatch({ type: types.SIGN_UP_USER })
  try {
    const res = await api.post('/users', {
      "email": email,
      "username": username,
      "password": password,
      "confirm_password": confirm_password
    })
    dispatch({ type: types.SIGN_UP_USER_SUCCESS, payload: res })
    history.push('/app/')
  } catch (error) {
    dispatch({ type: types.SIGN_UP_USER_FAIL, payload: error.response })
  }
}
export const forgotPassword = (email) => async (dispatch, getState, api) => {
  dispatch({ type: types.FORGOT_PASSWORD })
  try {
    const res = await api.post('/forgot-password', { "email": email })
    dispatch({ type: types.FORGOT_PASSWORD_SUCCESS, payload: res })
  } catch (error) {
    dispatch({ type: types.FORGOT_PASSWORD_FAIL, payload: error.response })
  }
}
export const verifyPasswordResetToken = (reset_token) => async (dispatch, getState, api) => {
  dispatch({ type: types.VERIFY_RESET_PASSWORD_TOKEN })
  try {
    const res = await api.post('/verify-password-reset-token', { "resetToken": reset_token })
    dispatch({ type: types.VERIFY_RESET_PASSWORD_TOKEN_SUCCESS, payload: res })
  } catch (error) {
    dispatch({ type: types.VERIFY_RESET_PASSWORD_TOKEN_FAIL, payload: error.response })
  }
}
export const resetPassword = (reset_token, new_password) => async (dispatch, getState, api) => {
  dispatch({ type: types.RESET_PASSWORD })
  try {
    const res = await api.post('/reset-password', { "resetToken": reset_token, "newPassword": new_password })
    dispatch({ type: types.RESET_PASSWORD_SUCCESS, payload: res })
  } catch (error) {
    dispatch({ type: types.RESET_PASSWORD_FAIL, payload: error.response })
  }
}
export const logoutUser = () => async (dispatch, getState, api) => {
  const res = await api.post('/logout')
  dispatch({ type: types.LOGOUT_USER, payload: res })
}

export const toggleCreateSubscriptionOpen = () => async (dispatch, getState, api) => {
  dispatch({type: types.TOGGLE_CREATE_SUBSCRIPTION_OPEN})
}
export const createSubscription = (subscription) => async (dispatch, getState, api) => {
  dispatch({ type: types.CREATE_SUBSCRIPTION })
  try {
    const res = await api.post(`/subscriptions/`, subscription)
    console.dir(res)
    dispatch({ type: types.CREATE_SUBSCRIPTION_SUCCESS, payload: res })
  } catch (error) {
    dispatch({ type: types.CREATE_SUBSCRIPTION_FAIL, payload: error.response })
  }
}
export const toggleCancelSubscriptionOpen = () => async (dispatch, getState, api) => {
  dispatch({type: types.TOGGLE_CANCEL_SUBSCRIPTION_OPEN})
}
export const cancelSubscription = (subscription_id) => async (dispatch, getState, api) => {
  dispatch({ type: types.CANCEL_SUBSCRIPTION })
  try {
    const res = await api.put(`/subscriptions/${subscription_id}`, {cancel_at_period_end: true})
    dispatch({ type: types.CANCEL_SUBSCRIPTION_SUCCESS, payload: res })
  } catch (error) {
    dispatch({ type: types.CANCEL_SUBSCRIPTION_FAIL, payload: error.response })
  }
}
export const clearCancelSubscription = () => async (dispatch, getState, api) => {
  dispatch({type: types.CLEAR_CANCEL_SUBSCRIPTION})
}

export const toggleResumeSubscriptionOpen = () => async (dispatch, getState, api) => {
  dispatch({type: types.TOGGLE_RESUME_SUBSCRIPTION_OPEN})
}
export const resumeSubscription = (subscription_id) => async (dispatch, getState, api) => {
  dispatch({ type: types.RESUME_SUBSCRIPTION })
  try {
    const res = await api.put(`/subscriptions/${subscription_id}`, {cancel_at_period_end: false})
    dispatch({ type: types.RESUME_SUBSCRIPTION_SUCCESS, payload: res })
  } catch (error) {
    dispatch({ type: types.RESUME_SUBSCRIPTION_FAIL, payload: error.response })
  }
}
export const clearResumeSubscription = () => async (dispatch, getState, api) => {
  dispatch({type: types.CLEAR_RESUME_SUBSCRIPTION})
}

export const toggleUpdatePaymentMethodOpen = () => async (dispatch, getState, api) => {
  dispatch({ type: types.TOGGLE_UPDATE_PAYMENT_METHOD_OPEN})
}
export const updatePaymentMethod = (token) => async (dispatch, getState, api) => {
  dispatch({ type: types.UPDATE_PAYMENT_METHOD })
  try {
    const res = await api.put(`@me/payment_method`, {stripe_token: token})
    dispatch({ type: types.UPDATE_PAYMENT_METHOD_SUCCESS, payload: res })
  } catch (error) {
    dispatch({ type: types.UPDATE_PAYMENT_METHOD_FAIL, payload: error.response })
  }
}

export const getPaymentMethod = () => async (dispatch, getState, api) => {
  dispatch({ type: types.GET_PAYMENT_METHOD })
  try {
    const res = await api.get(`@me/payment_method`)
    dispatch({ type: types.GET_PAYMENT_METHOD_SUCCESS, payload: res })
  } catch (error) {
    dispatch({ type: types.GET_PAYMENT_METHOD_FAIL, payload: error.response })
  }
}
