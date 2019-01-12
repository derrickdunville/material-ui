export const FETCH_USER = 'FETCH_USER'
export const fetchUser = (userId) => async (dispatch, getState, api) => {
  const res = await api.get(`/users/${userId}`)
  dispatch({
    type: FETCH_USER,
    payload: res
  })
}

export const FETCH_USERS = 'FETCH_USERS'
export const fetchUsers = () => async (dispatch, getState, api) => {
  const res = await api.get('/users')
  dispatch({
    type: FETCH_USERS,
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
