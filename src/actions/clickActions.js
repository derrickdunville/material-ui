import * as types from '../constants/click-action-types'

export const postClick = (username, clicked_url, referring_url) => async (dispatch, getState, api) => {
  console.log("post click")
  dispatch({ type: types.POST_CLICK })
  try {
    const res = await api.post('/clicks', {username: username, clicked_url: clicked_url, referring_url: referring_url})
    dispatch({
      type: types.POST_CLICK_SUCCESS,
      payload: res
    })
  } catch (error) {
    dispatch({
      type: types.POST_CLICK_FAIL,
       payload: error.response
     })
  }
}
