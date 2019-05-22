import * as types from '../constants/product-action-types'
import fileSaver from 'file-saver'

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
    history.replace("/admin/products")
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

export const downloadProduct = (product_id) => async (dispatch, getState, api) => {
  dispatch({
    type: types.DOWNLOAD_PRODUCT
  })
  try {
    console.log("downloading file")
    const res = await api.get(`/products/${product_id}/download`, { responseTpye: 'blob'})
    console.dir(res)
    var filename = res.headers['content-disposition'].substring(22, res.headers['content-disposition'].length - 1)
    console.log(filename)
    const { data } = res
    console.log("got the data", data)
    var blob = new Blob([data], {type: res.headers['content-type']})
    fileSaver.saveAs(blob, filename)
    dispatch({
      type: types.DOWNLOAD_PRODUCT_SUCCESS,
      payload: res
    })
  } catch (error) {
    console.dir(error.response)
    dispatch({
      type: types.DOWNLOAD_PRODUCT_FAIL,
       payload: error.response
     })
  }
}

// Clear Actions
export const clearPostProduct = () => async (dispatch, getState, api) => {
  dispatch({ type: types.CLEAR_POST_PRODUCT})
}
export const clearPutProduct = () => async (dispatch, getState, api) => {
  dispatch({ type: types.CLEAR_PUT_PRODUCT})
}
export const clearDeleteProduct = () => async (dispatch, getState, api) => {
  dispatch({ type: types.CLEAR_DELETE_PRODUCT})
}

// Socket event actions
export const productCreated = () => async (dispatch, getState, api) => {
  dispatch({ type: types.PRODUCT_CREATED})
}
export const productUpdated = () => async (dispatch, getState, api) => {
  dispatch({ type: types.PRODUCT_UPDATED})
}
export const productDeleted = () => async (dispatch, getState, api) => {
  dispatch({ type: types.PRODUCT_DELETED})
}
