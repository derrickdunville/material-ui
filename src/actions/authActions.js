import * as types from '../constants/auth-action-types'

export const fetchCurrentUser = () => async (dispatch, getState, api) => {
  const res = await api.get('/@me')
  dispatch({
    type: types.FETCH_CURRENT_USER,
    payload: res
  })
}

export const resetAuth = () => async (dispatch) => {
  dispatch({ type: types.RESET_AUTH })
}

export const loginUser = (history, username, password) => async (dispatch, getState, api) => {
  dispatch({ type: types.LOGIN_USER, payload: {}})
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
export const signUpUser = (history, email, username, password, confirm_password) => async (dispatch, getState, api) => {
  dispatch({ type: types.SIGN_UP_USER })
  try {
    const res = await api.post('/users', {
      "email": email,
      "username": username,
      "password": password,
      "confirm_password": confirm_password
    })
    console.dir(res)
    dispatch({
      type: types.SIGN_UP_USER_SUCCESS,
      payload: res
    })
    history.push('/')
  } catch (error) {
    console.dir(error.response)
    dispatch({
      type: types.SIGN_UP_USER_FAIL,
      payload: error.response
    })
  }
}

export const logoutUser = () => async (dispatch, getState, api) => {
  const res = await api.post('/logout')
  dispatch({
    type: types.LOGOUT_USER,
    payload: res
  })
}
