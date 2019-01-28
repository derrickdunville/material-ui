import * as types from '../constants/product-action-types'

export const getProducts = () => async (dispatch, getState, api) => {
  dispatch({
    type: types.GET_PRODUCTS
  })
  try {
    const res = await api.get('/products')
    dispatch({
      type: types.GET_PRODUCTS_SUCCESS,
      payload: res
    })
  } catch (error) {
    dispatch({
      type: types.GET_PRODUCTS_FAIL,
       payload: error.response
     })
  }
}
export const getProduct = (product_id) => async (dispatch, getState, api) => {
  dispatch({
    type: types.GET_PRODUCT
  })
  try {
    const res = await api.get(`/products/${product_id}`)
    dispatch({
      type: types.GET_PRODUCT_SUCCESS,
      payload: res
    })
  } catch (error) {
    dispatch({
      type: types.GET_PRODUCT_FAIL,
       payload: error.response
     })
  }
}
export const postProduct = (product) => async (dispatch, getState, api) => {
  dispatch({
    type: types.POST_PRODUCT
  })
  try {
    const res = await api.post('/products', product)
    dispatch({
      type: types.POST_PRODUCT_SUCCESS,
      payload: res
    })
  } catch (error) {
    dispatch({
      type: types.POST_PRODUCT_FAIL,
       payload: error.response
     })
  }
}
export const putProduct = (product) => async (dispatch, getState, api) => {
  dispatch({
    type: types.PUT_PRODUCT
  })
  try {
    const res = await api.put(`/products/${product._id}`, product)
    dispatch({
      type: types.PUT_PRODUCT_SUCCESS,
      payload: res
    })
  } catch (error) {
    dispatch({
      type: types.PUT_PRODUCT_FAIL,
       payload: error.response
     })
  }
}
export const deleteProduct = (product_id) => async (dispatch, getState, api) => {
  dispatch({
    type: types.DELETE_PRODUCT
  })
  try {
    const res = await api.delete(`/products/${product._id}`)
    dispatch({
      type: types.DELETE_PRODUCT_SUCCESS,
      payload: res
    })
  } catch (error) {
    dispatch({
      type: types.DELETE_PRODUCT_FAIL,
       payload: error.response
     })
  }
}
export const clearProduct = () => async (dispatch, getState, api) => {
  dispatch({ type: types.CLEAR_PRODUCT })
}
