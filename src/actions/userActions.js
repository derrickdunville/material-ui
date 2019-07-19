import * as types from '../constants/user-action-types'

export const getUsers = (filter=undefined, page=0, limit=10, order="asc", orderBy="username") => async (dispatch, getState, api) => {
  dispatch({
    type: types.GET_USERS
  })
  let url = "/users?page=" + page +"&limit=" + limit + "&sort="+orderBy+":"+order+""
  if(filter !== undefined){
    if(filter.username !== undefined){
      url += "&username=" + filter.username
    }
    if(filter.email !== undefined){
      url += "&email=" + filter.email
    }
  }

  try {
    const res = await api.get(url)
    dispatch({
      type: types.GET_USERS_SUCCESS,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: types.GET_USERS_FAIL,
       payload: error.response.data
     })
  }
}
export const getUser = (username) => async (dispatch, getState, api) => {
  dispatch({
    type: types.GET_USER
  })
  try {
    const res = await api.get(`/users/${username}`)
    dispatch({
      type: types.GET_USER_SUCCESS,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: types.GET_USER_FAIL,
       payload: error.response.data
     })
  }
}
export const postUser = (history, user) => async (dispatch, getState, api) => {
  dispatch({
    type: types.POST_USER
  })
  try {
    const res = await api.post('/users', user)
    dispatch({
      type: types.POST_USER_SUCCESS,
      payload: res.data
    })
    try{
      history.push("/admin/users/" + res.data.username)
    } catch(error){
      console.dir(error)
    }
  } catch (error) {
    dispatch({
      type: types.POST_USER_FAIL,
       payload: error.response.data
     })
  }
}
export const putUser = (id, user) => async (dispatch, getState, api) => {
  dispatch({
    type: types.PUT_USER
  })
  try {
    const res = await api.put(`/users/${id}`, user)
    dispatch({
      type: types.PUT_USER_SUCCESS,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: types.PUT_USER_FAIL,
       payload: error.response.data
     })
  }
}
export const deleteUser = (history, user_id) => async (dispatch, getState, api) => {
  dispatch({
    type: types.DELETE_USER
  })
  try {
    const res = await api.delete(`/users/${user_id}`)
    dispatch({
      type: types.DELETE_USER_SUCCESS,
      payload: res.data
    })
    history.replace("/admin/users")
  } catch (error) {
    dispatch({
      type: types.DELETE_USER_FAIL,
       payload: error.response.data
     })
  }
}

export const toggleEditOpen = () => async (dispatch, getState, api) => {
  dispatch({ type: types.TOGGLE_EDITING_USER })
}
export const clearPostUser = () => async (dispatch, getState, api) => {
  dispatch({ type: types.CLEAR_POST_USER })
}
export const clearPutUser = () => async (dispatch, getState, api) => {
  dispatch({ type: types.CLEAR_PUT_USER })
}
export const clearDeleteUser = () => async (dispatch, getState, api) => {
  dispatch({ type: types.CLEAR_DELETE_USER })
}
export const clearUser = () => async (dispatch, getState, api) => {
  dispatch({ type: types.CLEAR_USER })
}

export const userCreated = (user) => async (dispatch, getState, api) => {
  dispatch({ type: types.USER_CREATED, payload: user})
}
export const userUpdated = (user) => async (dispatch, getState, api) => {
  dispatch({ type: types.USER_UPDATED, payload: user})
}
export const userDeleted = (payload) => async (dispatch, getState, api) => {
  dispatch({ type: types.USER_DELETED, payload: payload})
}
