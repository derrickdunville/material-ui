export const FETCH_USER = 'FETCH_USER'
export const fetchUser = (userId) => async (dispatch, getState, api) => {
  const res = await api.get(`/users/${userId}`)
  dispatch({
    type: FETCH_USER,
    payload: res
  })
}
export const CLEAR_USER = "CLEAR_USER"
export const clearUser = () => async (dispatch, getState, api) =>{
  dispatch({ type: CLEAR_USER })
}
export const CLEAR_CREATE_USER = "CLEAR_CREATE_USER"
export const CREATE_USER = "CREATE_USER"
export const CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS"
export const CREATE_USER_FAIL = "CREATE_USER_FAIL"
export const createUser = (user) => async (dispatch, getState, api) =>{
  dispatch({ type: CREATE_USER })
  try {
    const res = await api.post('/users', user)
    dispatch({ type: CREATE_USER_SUCCESS, payload: res })
  } catch (error) {
    dispatch({ type: CREATE_USER_FAIL, payload: error.response })
  }
}
export const clearCreateUser = () => async (dispatch, getState, api) =>{
  dispatch({ type: CLEAR_CREATE_USER })
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

export const LOAD_MEMBERSHIPS = "LOAD_MEMBERSHIPS"
export const LOAD_MEMBERSHIPS_SUCCESS = "LOAD_MEMBERSHIPS_SUCCESS"
export const LOAD_MEMBERSHIPS_FAIL = "LOAD_MEMBERSHIPS_FAIL"
export const loadMemberships = (order="asc", orderBy="amount") => async (dispatch, getState, api) => {
  dispatch({
    type: LOAD_MEMBERSHIPS
  })
  let url = "/products?page=" + 0 +"&limit=" + 100 + "&sort="+orderBy+":"+order+"&category=membership"
  try {
    const res = await api.get(url)
    dispatch({
      type: LOAD_MEMBERSHIPS_SUCCESS,
      payload: res
    })
  } catch (error) {
    dispatch({
      type: LOAD_MEMBERSHIPS_FAIL,
       payload: error.response
     })
  }
}
