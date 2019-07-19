/**
 * @jest-environment node
 */
import expect from 'expect'
import { productsReducer, initialState } from '../../src/reducers/productsReducer'
import * as types from '../../src/constants/product-action-types'
import { mockProductData, loadedState, mockNewProduct } from '../data/mockProductData'
import { internalServerError, notFoundError, alreadyExistsError } from '../data/mockErrors'
import { updateDoc, deleteDoc } from '../../src/reducers/utils/reducerUtils'

describe('products reducer', () => {
  it('should return the initial state', () => {
    expect(productsReducer(undefined, {})).toEqual(
      initialState
    )
  })

  describe('post', () => {
    it('POST_PRODUCT', () => {
      expect(
        productsReducer(initialState, {
          type: types.POST_PRODUCT
        })
      ).toEqual({
        ...initialState,
        postingProduct: true
      })
    })
    it('POST_PRODUCT_SUCCESS', () => {
      expect(
        productsReducer(initialState, {
          type: types.POST_PRODUCT_SUCCESS,
          payload: mockProductData.docs[0]
        })
      ).toEqual({
        ...initialState,
        postingProduct: false,
        postProductSuccessMessage: "Product successfully created.",
        total: initialState.total + 1,
        docs: [...initialState.docs, mockProductData.docs[0]]
      })
    })
    it('POST_PRODUCT_FAIL', () => {
      expect(
        productsReducer(initialState, {
          type: types.POST_PRODUCT_FAIL,
          payload: alreadyExistsError("product")
        })
      ).toEqual({
        ...initialState,
        postingProduct: false,
        postProductErrorMessage: alreadyExistsError("product").err.message
      })
    })
  })
  describe('get (list)', () => {
    it('GET_PRODUCTS', () => {
      expect(
        productsReducer(initialState, {
          type: types.GET_PRODUCTS
        })
      ).toEqual({
        ...initialState,
        gettingProducts: true
      })
    })
    it('GET_PRODUCTS_SUCCESS', () => {
      expect(
        productsReducer(initialState, {
          type: types.GET_PRODUCTS_SUCCESS,
          payload: mockProductData
        })
      ).toEqual({
        ...initialState,
        gettingProducts: false,
        loaded: true,
        ...mockProductData
      })
    })
    it('GET_PRODUCTS_FAIL', () => {
      expect(
        productsReducer(initialState, {
          type: types.GET_PRODUCTS_FAIL,
          payload: internalServerError
        })
      ).toEqual({
        ...initialState,
        gettingProduct: false,
        getProductsErrorMessage: internalServerError.err.message
      })
    })
  })
  describe('get', () => {
    it('GET_PRODUCT', () => {
      expect(
        productsReducer(initialState, {
          type: types.GET_PRODUCT
        })
      ).toEqual({
        ...initialState,
        gettingProduct: true
      })
    })
    it('GET_PRODUCT_SUCCESS', () => {
      expect(
        productsReducer(initialState, {
          type: types.GET_PRODUCT_SUCCESS,
          payload: mockProductData[0]
        })
      ).toEqual({
        ...initialState,
        gettingProduct: false,
        product: mockProductData[0]
      })
    })
    it('GET_PRODUCT_FAIL', () => {
      expect(
        productsReducer(initialState, {
          type: types.GET_PRODUCT_FAIL,
          payload: notFoundError("product")
        })
      ).toEqual({
        ...initialState,
        gettingProduct: false,
        getProductErrorMessage: notFoundError("product").err.message
      })
    })
  })
  describe('put', () => {
    it('PUT_PRODUCT', () => {
      expect(
        productsReducer(loadedState, {
          type: types.PUT_PRODUCT
        })
      ).toEqual({
        ...loadedState,
        puttingProduct: true
      })
    })
    it('PUT_PRODUCT_SUCCESS', () => {
      expect(
        productsReducer(loadedState, {
          type: types.PUT_PRODUCT_SUCCESS,
          payload: {
            ...loadedState.docs[0],
            productname: "updated" + loadedState.docs[0].productname
          }
        })
      ).toEqual({
        ...loadedState,
        puttingProduct: false,
        product: {
          ...loadedState.docs[0],
          productname: "updated" + loadedState.docs[0].productname
        },
        docs: [{
          ...loadedState.docs[0],
          productname: "updated" + loadedState.docs[0].productname
        }],
        putProductSuccessMessage: 'Product successfully updated.',
        editOpen: false,
      })
    })
    it('PUT_PRODUCT_FAIL', () => {
      expect(
        productsReducer(loadedState, {
          type: types.PUT_PRODUCT_FAIL,
          payload: alreadyExistsError("product")
        })
      ).toEqual({
        ...loadedState,
        puttingProduct: false,
        putProductErrorMessage: alreadyExistsError("product").err.message
      })
    })
  })
  describe('delete', () => {
    it('DELETE_PRODUCT', () => {
      expect(
        productsReducer(loadedState, {
          type: types.DELETE_PRODUCT
        })
      ).toEqual({
        ...loadedState,
        deletingProduct: true
      })
    })
    it('DELETE_PRODUCT_SUCCESS', () => {
      expect(
        productsReducer(loadedState, {
          type: types.DELETE_PRODUCT_SUCCESS,
          payload: {
            _id: loadedState.docs[0]._id,
            messsage: "Product successfully deleted."
          }
        })
      ).toEqual({
        ...loadedState,
        deletingProduct: false,
        deleteProductSuccessMessage: "Product successfully deleted.",
        docs: []
      })
    })
    it('DELETE_PRODUCT_FAIL', () => {
      expect(
        productsReducer(loadedState, {
          type: types.DELETE_PRODUCT_FAIL,
          payload: notFoundError("product")
        })
      ).toEqual({
        ...loadedState,
        deletingProduct: false,
        deleteProductErrorMessage: notFoundError("product").err.message
      })
    })
  })
  describe('clear', () => {
    it('CLEAR_PRODUCT', () => {
      expect(
        productsReducer(loadedState, {
          type: types.CLEAR_PRODUCT
        })
      ).toEqual({
        ...loadedState,
        product: false
      })
    })
    it('CLEAR_DELETE_PRODUCT', () => {
      let deleteState = {
        ...loadedState,
        deleteProductErrorMessage: "Product not found",
        deleteProductSuccessMessage: "Product successfully deleted."
      }
      expect(
        productsReducer(deleteState, {
          type: types.CLEAR_DELETE_PRODUCT
        })
      ).toEqual({
        ...deleteState,
        deleteProductErrorMessage: false,
        deleteProductSuccessMessage: false
      })
    })
    it('CLEAR_PUT_PRODUCT', () => {
      let putState = {
        ...loadedState,
        putProductErrorMessage: "Product not found",
        putProductSuccessMessage: "Product successfully updated."
      }
      expect(
        productsReducer(putState, {
          type: types.CLEAR_PUT_PRODUCT
        })
      ).toEqual({
        ...loadedState,
        putProductErrorMessage: false,
        putProductSuccessMessage: false
      })
    })
    it('CLEAR_POST_PRODUCT', () => {
      let postState = {
        ...loadedState,
        postProductErrorMessage: "Error creating product.",
        postProductSuccessMessage: "Product successfully created."
      }
      expect(
        productsReducer(postState, {
          type: types.CLEAR_POST_PRODUCT
        })
      ).toEqual({
        ...loadedState,
        postProductErrorMessage: false,
        postProductSuccessMessage: false
      })
    })
  })
  describe('socket', () => {
    it('PRODUCT_UPDATED', () => {
      expect(
        productsReducer(loadedState, {
          type: types.PRODUCT_UPDATED,
          payload: {
            ...loadedState.docs[0],
            description: "this is an updated product description"
          }
        })
      ).toEqual({
        ...loadedState,
        docs: updateDoc(loadedState.docs, {...loadedState.docs[0], description: "this is an updated product description"})
      })
    })
    it('PRODUCT_CREATED', () => {
      expect(
        productsReducer(loadedState, {
          type: types.PRODUCT_CREATED,
          payload: mockNewProduct
        })
      ).toEqual({
        ...loadedState
      })
    })
    it('PRODUCT_DELETED', () => {
      expect(
        productsReducer(loadedState, {
          type: types.PRODUCT_DELETED,
          payload: { _id: loadedState.docs[0]._id }
        })
      ).toEqual({
        ...loadedState,
        docs: []
      })
    })
  })
})
