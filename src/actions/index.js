export const FETCH_USERS = 'FETCH_USERS'
export const fetchUsers = () => async (dispatch, getState, api) => {
  const res = await api.get('/users')
  dispatch({
    type: FETCH_USERS,
    payload: res
  })
}

export const FETCH_CURRENT_USER = "FETCH_CURRENT_USER"
export const fetchCurrentUser = () => async (dispatch, getState, api) => {
  const res = await api.get('/@me')
  dispatch({
    type: FETCH_CURRENT_USER,
    payload: res
  })
}

export const LOGIN_USER = "LOGIN_USER"
export const loginUser = (history, username, password) => async (dispatch, getState, api) => {
  const res = await api.post('/login', {"username": username, "password": password})
  dispatch({
    type: LOGIN_USER,
    payload: res
  })
  history.push('/')
}

export const LOGOUT_USER = "LOGOUT_USER"
export const logoutUser = () => async (dispatch, getState, api) => {
  const res = await api.post('/logout')
  dispatch({
    type: LOGOUT_USER,
    payload: res
  })
}


export const FETCH_ADMINS = "FETCH_ADMINS"
export const fetchAdmins = () => async (dispatch, getState, api) => {
  const res = await api.get('/users')
  dispatch({
    type: FETCH_ADMINS,
    payload: {}
  })
}
