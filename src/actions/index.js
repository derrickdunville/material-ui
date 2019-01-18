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

export const OPEN_NAV = "OPEN_NAV"
export const CLOSE_NAV = "CLOSE_NAV"
export const openNav = () => async (dispatch, getState, api) => {
  dispatch({ type: OPEN_NAV })
}
export const closeNav = () => async (dispatch, getState, api) => {
  dispatch({ type: CLOSE_NAV })
}
export const OPEN_ADMIN_NAV = "OPEN_ADMIN_NAV"
export const CLOSE_ADMIN_NAV = "CLOSE_ADMIN_NAV"
export const openAdminNav = () => async (dispatch, getState, api) => {
  dispatch({ type: OPEN_ADMIN_NAV })
}
export const closeAdminNav = () => async (dispatch, getState, api) => {
  dispatch({ type: CLOSE_ADMIN_NAV })
}
