import * as types from '../constants/terms-action-types'

export const postTerms = (content) => async (dispatch, getState, api) => {
  dispatch({ type: types.POST_TERMS })
  try {
    const res = await api.post('/terms', {content: content})
    dispatch({
      type: types.POST_TERMS_SUCCESS,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: types.POST_TERMS_FAIL,
       payload: error.response
     })
  }
}

export const getTerms = () => async (dispatch, getState, api) => {
  dispatch({ type: types.GET_TERMS })
  try {
    const res = await api.get('/terms')
    dispatch({
      type: types.GET_TERMS_SUCCESS,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: types.GET_TERMS_FAIL,
       payload: error.response
     })
  }
}
