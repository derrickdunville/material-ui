/**
 * @jest-environment node
 */
import expect from 'expect'
import nock from '../utils/nockSetup'
import mockStore from '../utils/mockStore'
import mockHistory from '../utils/mockHistory'
import * as actions from '../../src/actions/productActions'
import * as types from '../../src/constants/product-action-types'
import { initialState } from '../../src/reducers/productsReducer'
import { mockProductData, mockNewProduct } from '../data/mockProductData'
import {
  internalServerError,
  notFoundError,
  notAuthorizedError,
  alreadyExistsError
} from '../data/mockErrors'

describe('productActions', () => {
  var store = null
  beforeEach(() => {store = mockStore({ products: initialState }) })

  describe("async", () => {
    it('getProducts() 200-success', () => {
      let page = 0, limit = 10, order = "asc", orderBy = "name"
      let url = "/products?page=" + page +"&limit=" + limit + "&sort="+orderBy+":"+order+""
      nock.get(url).reply(200, mockProductData )
      const expectedActions = [
        { type: types.GET_PRODUCTS },
        { type: types.GET_PRODUCTS_SUCCESS, payload: mockProductData }
      ]
      return store
        .dispatch(actions.getProducts())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })
    it('getProducts() 500-error', () => {
      let page = 0, limit = 10, order = "asc", orderBy = "name"
      let url = "/products?page=" + page +"&limit=" + limit + "&sort="+orderBy+":"+order+""
      nock.get(url).reply(500, internalServerError)
      const expectedActions = [
        { type: types.GET_PRODUCTS },
        { type: types.GET_PRODUCTS_FAIL, payload: internalServerError}
      ]
      return store
        .dispatch(actions.getProducts())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('getProduct(product_id) success', () => {
      nock.get("/products/"+mockProductData.docs[0]._id).reply(200, mockProductData.docs[0])
      const expectedActions = [
        { type: types.GET_PRODUCT },
        { type: types.GET_PRODUCT_SUCCESS, payload: mockProductData.docs[0] }
      ]
      return store
        .dispatch(actions.getProduct(mockProductData.docs[0]._id))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })
    it('getProduct(product_id) 404-error', () => {
      nock.get("/products/"+mockProductData.docs[0]._id).reply(404, notFoundError("product"))
      const expectedActions = [
        { type: types.GET_PRODUCT },
        { type: types.GET_PRODUCT_FAIL, payload: notFoundError("product") }
      ]
      return store
        .dispatch(actions.getProduct(mockProductData.docs[0]._id))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })
    it('getProduct(product_id) 403-error', () => {
      nock.get("/products/"+mockProductData.docs[0]._id).reply(403, notAuthorizedError("product"))
      const expectedActions = [
        { type: types.GET_PRODUCT },
        { type: types.GET_PRODUCT_FAIL, payload: notAuthorizedError("product") }
      ]
      return store
        .dispatch(actions.getProduct(mockProductData.docs[0]._id))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('postProduct(history, product) success', () => {
      nock.post("/products").reply(200, mockProductData.docs[0])
      const expectedActions = [
        { type: types.POST_PRODUCT },
        { type: types.POST_PRODUCT_SUCCESS, payload: mockProductData.docs[0] }
      ]
      return store
        .dispatch(actions.postProduct(mockHistory, mockProductData.docs[0]))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })
    it('postProduct(history, product) 401-error', () => {
      nock.post("/products").reply(401, alreadyExistsError("product"))
      const expectedActions = [
        { type: types.POST_PRODUCT },
        { type: types.POST_PRODUCT_FAIL, payload: alreadyExistsError("product") }
      ]
      return store
        .dispatch(actions.postProduct(mockHistory, mockProductData.docs[0]))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('putProduct(id, product) success', () => {
      let productname = mockProductData.docs[0].productname
      mockProductData.docs[0].productname = "updatedTestProduct"
      nock.put("/products/"+mockProductData.docs[0]._id).reply(200, mockProductData.docs[0])
      const expectedActions = [
        { type: types.PUT_PRODUCT },
        { type: types.PUT_PRODUCT_SUCCESS, payload: mockProductData.docs[0] }
      ]
      return store
        .dispatch(actions.putProduct(mockProductData.docs[0]._id, mockProductData.docs[0]))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })
    it('putProduct(id, product) 401-error', () => {
      let productname = mockProductData.docs[0].productname
      mockProductData.docs[0].productname = "updatedTestProduct"
      nock.put("/products/"+mockProductData.docs[0]._id).reply(401, alreadyExistsError("product"))
      const expectedActions = [
        { type: types.PUT_PRODUCT },
        { type: types.PUT_PRODUCT_FAIL, payload: alreadyExistsError("product") }
      ]
      return store
        .dispatch(actions.putProduct(mockProductData.docs[0]._id, mockProductData.docs[0]))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('deleteProduct(history, product_id) success', () => {
      nock.delete("/products/"+mockProductData.docs[0]._id).reply(200, { message: "product successfully deleted" })
      const expectedActions = [
        { type: types.DELETE_PRODUCT },
        { type: types.DELETE_PRODUCT_SUCCESS, payload: { message: "product successfully deleted" } }
      ]
      return store
        .dispatch(actions.deleteProduct(mockHistory, mockProductData.docs[0]._id))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })
    it('deleteProduct(history, product_id) 403-error', () => {
      nock.delete("/products/"+mockProductData.docs[0]._id).reply(403, notAuthorizedError("product"))
      const expectedActions = [
        { type: types.DELETE_PRODUCT },
        { type: types.DELETE_PRODUCT_FAIL, payload: notAuthorizedError("product") }
      ]
      return store
        .dispatch(actions.deleteProduct(mockHistory, mockProductData.docs[0]._id))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })
  })

  describe('clear', () => {
    it('clearProduct()', () => {
      const expectedActions = [
        { type: types.CLEAR_PRODUCT }
      ]
      return store
        .dispatch(actions.clearProduct())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })
    it('clearPostProduct()', () => {
      const expectedActions = [
        { type: types.CLEAR_POST_PRODUCT }
      ]
      return store
        .dispatch(actions.clearPostProduct())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })
    it('clearPutProduct()', () => {
      const expectedActions = [
        { type: types.CLEAR_PUT_PRODUCT }
      ]
      return store
        .dispatch(actions.clearPutProduct())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })
    it('clearDeleteProduct()', () => {
      const expectedActions = [
        { type: types.CLEAR_DELETE_PRODUCT }
      ]
      return store
        .dispatch(actions.clearDeleteProduct())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })
  })

  describe("socket", () => {
    it('productCreated()', () => {
      const expectedActions = [
        { type: types.PRODUCT_CREATED, payload: mockNewProduct }
      ]
      return store
        .dispatch(actions.productCreated(mockNewProduct))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })
    it('productUpdated()', () => {
      let updatedProduct = mockProductData.docs[0]
      updatedProduct.description = "This is an updated product description."
      const expectedActions = [
        { type: types.PRODUCT_UPDATED, payload: updatedProduct }
      ]
      return store
        .dispatch(actions.productUpdated(updatedProduct))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })
    it('productDeleted()', () => {
      const expectedActions = [
        { type: types.PRODUCT_DELETED, payload: { _id: mockProductData.docs[0]._id }}
      ]
      return store
        .dispatch(actions.productDeleted({ _id: mockProductData.docs[0]._id }))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })
  })
})
