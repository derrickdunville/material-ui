import * as types from '../constants/product-action-types'

export const getProducts = (filter=undefined, page=0, limit=10, order="asc", orderBy="name") => async (dispatch, getState, api) => {
  dispatch({
    type: types.GET_PRODUCTS
  })
  let url = "/products?page=" + page +"&limit=" + limit + "&sort="+orderBy+":"+order+""
  if(filter !== undefined){
    if(filter.name !== undefined){
      url += "&name=" + filter.name
    }
    if(filter.id !== undefined){
      url += "&id=" + filter.id
    }
    if(filter.category !== undefined){
      url += "&category=" + filter.category
    }
  }
  try {
    const res = await api.get(url)
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
export const postProduct = (history, product) => async (dispatch, getState, api) => {
  dispatch({
    type: types.POST_PRODUCT
  })
  try {
    const res = await api.post('/products', product)
    dispatch({
      type: types.POST_PRODUCT_SUCCESS,
      payload: res
    })
    console.log(res.data._id)
    try{
      history.push("/admin/products/" + res.data._id)
    } catch(error){
      console.dir(error)
    }
  } catch (error) {
    console.dir(error)
    dispatch({
      type: types.POST_PRODUCT_FAIL,
      payload: error.response
    })
  }
}
export const putProduct = (id, product) => async (dispatch, getState, api) => {
  dispatch({
    type: types.PUT_PRODUCT
  })
  try {
    const res = await api.put(`/products/${id}`, product)
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
export const deleteProduct = (history, product_id) => async (dispatch, getState, api) => {
  dispatch({
    type: types.DELETE_PRODUCT
  })
  try {
    const res = await api.delete(`/products/${product_id}`)
    dispatch({
      type: types.DELETE_PRODUCT_SUCCESS,
      payload: res
    })
    history.push("/admin/products")
  } catch (error) {
    console.dir(error)
    dispatch({
      type: types.DELETE_PRODUCT_FAIL,
       payload: error.response
     })
  }
}
export const clearProduct = () => async (dispatch, getState, api) => {
  dispatch({ type: types.CLEAR_PRODUCT })
}
export const clearMessage = () => async (dispatch, getState, api) => {
  dispatch({ type: types.CLEAR_MESSAGE })
}
export const toggleEditOpen = () => (dispatch, getState, api) => {
  dispatch({ type: types.TOGGLE_EDITING_PRODUCT })
}
