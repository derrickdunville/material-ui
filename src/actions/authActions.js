import * as types from '../constants/auth-action-types'
const redirect = encodeURIComponent(process.env.DISCORD_CALLBACK)
const discord_client_id = process.env.DISCORD_CLIENT_ID


// AUTH ACTIONS
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
    history.push('/')
  } catch (error) {
    dispatch({
      type: types.LOGIN_USER_FAIL,
       payload: error.response
     })
  }
}
export const logout = () => async (dispatch, getState, api) => {
  try {
    console.log("logging out")
    const res = await api.get(`logout`)
    if(res.status == 200){
      console.log("redirecting")
      window.location.href = "/"
    }
  } catch (error) {
    console.dir(error)
    console.log("error logging out");
  }
}
export const signUpUser = (history, email, username, password, confirm_password) => async (dispatch, getState, api) => {
  dispatch({ type: types.SIGN_UP_USER })
  try {
    const res = await api.post('/signup', {
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

// SUBSCRIPTION ACTIONS
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
export const clearCreateSubscription = () => async (dispatch, getState, api) => {
  dispatch({ type: types.CLEAR_CREATE_SUBSCRIPTION })
}
export const toggleCancelSubscriptionOpen = () => async (dispatch, getState, api) => {
  dispatch({ type: types.TOGGLE_CANCEL_SUBSCRIPTION_OPEN })
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

// PAYMENT METHOD ACTIONS
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
export const clearUpdatePaymentMethod = () => async (dispatch, getState, api) => {
  dispatch({ type: types.CLEAR_UPDATE_PAYMENT_METHOD})
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

// DISCORD OAUTH ACTIONS
function openInNewTab(state) {
  console.log("opening new tab")
  var win = window.open(`https://discordapp.com/api/oauth2/authorize?client_id=${discord_client_id}&redirect_uri=${redirect}&state=${state}&response_type=code&scope=identify%20guilds.join`, '_blank')
  win.focus();
}
export const discordOAuthStateLoad = () => async (dispatch, getState, api) => {
  dispatch({ type: types.DISCORD_OAUTH_STATE_LOAD })
  try {
    const res = await api.post(`/oauth/discord/state`)
    dispatch({ type: types.DISCORD_OAUTH_STATE_LOAD_SUCCESS, payload: res })
    try {
      console.log("about to open new tab")
      openInNewTab(res.data.oauth_state)
    } catch(error) {
      console.log("error opening new tab to discord oauth")
    }
  } catch (error) {
    dispatch({ type: types.DISCORD_OAUTH_STATE_LOAD_FAIL, payload: error.response })
  }
}
export const discordOAuthRevoke = () => async (dispatch, getState, api) => {
  dispatch({ type: types.DISCORD_OAUTH_REVOKE })
  try {
    const res = await api.post(`/oauth/discord/revoke`)
    dispatch({ type: types.DISCORD_OAUTH_REVOKE_SUCCESS, payload: res })
  } catch (error) {
    dispatch({ type: types.DISCORD_OAUTH_REVOKE_FAIL, payload: error.response })
  }
}
export const getMyDiscordGuildMember = () => async (dispatch, getState, api) => {
  dispatch({ type: types.GET_MY_DISCORD_GUILD_MEMBER })
  try {
    const res = await api.get(`oauth/discord/`)
    dispatch({ type: types.GET_MY_DISCORD_GUILD_MEMBER_SUCCESS, payload: res })
  } catch (error) {
    dispatch({ type: types.GET_MY_DISCORD_GUILD_MEMBER_FAIL, payload: error.response })
  }
}
export const joinDiscordServer = () => async (dispatch, getState, api) => {
  dispatch({ type: types.JOIN_DISCORD_SERVER })
  try {
    const res = await api.put(`oauth/discord/join`)
    dispatch({ type: types.JOIN_DISCORD_SERVER_SUCCESS, payload: res })
  } catch (error) {
    dispatch({ type: types.JOIN_DISCORD_SERVER_FAIL, payload: error.response })
  }
}

// TRANSACTION ACTIONS (one-time products)
export const toggleCreateTransactionOpen = () => async (dispatch, getState, api) => {
  dispatch({type: types.TOGGLE_CREATE_TRANSACTION_OPEN})
}
export const createTransaction = (transaction) => async (dispatch, getState, api) => {
  dispatch({ type: types.CREATE_TRANSACTION })
  try {
    const res = await api.post(`/transactions/`, transaction)
    console.dir(res)
    dispatch({ type: types.CREATE_TRANSACTION_SUCCESS, payload: res })
  } catch (error) {
    console.dir(error.response)
    if(error.response.status == 500){
      dispatch({ type: types.CREATE_TRANSACTION_FAIL, payload: {data: {err: {message: "Could not connect to server"} }} })
    } else {
      dispatch({ type: types.CREATE_TRANSACTION_FAIL, payload: error.response })
    }
  }
}
export const clearCreateTransaction = () => async (dispatch, getState, api) => {
  dispatch({type: types.CLEAR_CREATE_TRANSACTION})
}

// PROFILE
export const updateProfile = (id, user) => async (dispatch, getState, api) => {
  dispatch({
    type: types.UPDATE_PROFILE
  })
  try {
    const res = await api.put(`/users/${id}`, user)
    dispatch({
      type: types.UPDATE_PROFILE_SUCCESS,
      payload: res
    })
  } catch (error) {
    dispatch({
      type: types.UPDATE_PROFILE_FAIL,
       payload: error.response
     })
  }
}

export const clearUpdateProfile = () => async (dispatch, getState, api) => {
  dispatch({type: types.CLEAR_UPDATE_PROFILE})
}

export const paymentMethodUpdated = (payment_method) => async (dispatch, getState, api) => {
  dispatch({type: types.PAYMENT_METHOD_UPDATED, payload: payment_method})
}
