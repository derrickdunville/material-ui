import * as types from '../constants/user-action-types'

export const getUsers = () => async (dispatch, getState, api) => {
  dispatch({
    type: types.GET_USERS
  })
  try {
    const res = await api.get('/users')
    dispatch({
      type: types.GET_USERS_SUCCESS,
      payload: res
    })
  } catch (error) {
    dispatch({
      type: types.GET_USERS_FAIL,
       payload: error.response
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
      payload: res
    })
  } catch (error) {
    dispatch({
      type: types.GET_USER_FAIL,
       payload: error.response
     })
  }
}
export const postUser = (user) => async (dispatch, getState, api) => {
  dispatch({
    type: types.POST_USER
  })
  try {
    const res = await api.post('/users', user)
    dispatch({
      type: types.POST_USER_SUCCESS,
      payload: res
    })
  } catch (error) {
    dispatch({
      type: types.POST_USER_FAIL,
       payload: error.response
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
      payload: res
    })
  } catch (error) {
    dispatch({
      type: types.PUT_USER_FAIL,
       payload: error.response
     })
  }
}
export const deleteUser = (user_id) => async (dispatch, getState, api) => {
  dispatch({
    type: types.DELETE_USER
  })
  try {
    const res = await api.delete(`/users/${user_id}`)
    dispatch({
      type: types.DELETE_USER_SUCCESS,
      payload: res
    })
  } catch (error) {
    dispatch({
      type: types.DELETE_USER_FAIL,
       payload: error.response
     })
  }
}

export const clearUser = () => async (dispatch, getState, api) => {
  dispatch({ type: types.CLEAR_USER })
}
