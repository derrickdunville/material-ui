/**
 * @jest-environment node
 */
import expect from 'expect'
import nock from '../utils/nockSetup'
import mockStore from '../utils/mockStore'
import mockHistory from '../utils/mockHistory'
import * as actions from '../../src/actions/transactionActions'
import * as types from '../../src/constants/transaction-action-types'
import { initialState } from '../../src/reducers/transactionsReducer'
import { mockTransactionData, mockNewTransaction } from '../data/mockTransactionData'
import {
  internalServerError,
  notFoundError,
  notAuthorizedError,
  alreadyExistsError
} from '../data/mockErrors'

describe('transactionActions', () => {
  var store = null
  beforeEach(() => {store = mockStore({ transactions: initialState }) })

  describe("async", () => {
    it('getTransactions() 200-success', () => {
      let page = 0, limit = 10, order = "asc", orderBy = "name"
      let url = "/transactions?page=" + page +"&limit=" + limit + "&sort="+orderBy+":"+order+""
      nock.get(url).reply(200, mockTransactionData )
      const expectedActions = [
        { type: types.GET_TRANSACTIONS },
        { type: types.GET_TRANSACTIONS_SUCCESS, payload: mockTransactionData }
      ]
      return store
        .dispatch(actions.getTransactions())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })
    it('getTransactions() 500-error', () => {
      let page = 0, limit = 10, order = "asc", orderBy = "name"
      let url = "/transactions?page=" + page +"&limit=" + limit + "&sort="+orderBy+":"+order+""
      nock.get(url).reply(500, internalServerError)
      const expectedActions = [
        { type: types.GET_TRANSACTIONS },
        { type: types.GET_TRANSACTIONS_FAIL, payload: internalServerError}
      ]
      return store
        .dispatch(actions.getTransactions())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('getTransaction(transaction_id) success', () => {
      nock.get("/transactions/"+mockTransactionData.docs[0]._id).reply(200, mockTransactionData.docs[0])
      const expectedActions = [
        { type: types.GET_TRANSACTION },
        { type: types.GET_TRANSACTION_SUCCESS, payload: mockTransactionData.docs[0] }
      ]
      return store
        .dispatch(actions.getTransaction(mockTransactionData.docs[0]._id))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })
    it('getTransaction(transaction_id) 404-error', () => {
      nock.get("/transactions/"+mockTransactionData.docs[0]._id).reply(404, notFoundError("transaction"))
      const expectedActions = [
        { type: types.GET_TRANSACTION },
        { type: types.GET_TRANSACTION_FAIL, payload: notFoundError("transaction") }
      ]
      return store
        .dispatch(actions.getTransaction(mockTransactionData.docs[0]._id))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })
    it('getTransaction(transaction_id) 403-error', () => {
      nock.get("/transactions/"+mockTransactionData.docs[0]._id).reply(403, notAuthorizedError("transaction"))
      const expectedActions = [
        { type: types.GET_TRANSACTION },
        { type: types.GET_TRANSACTION_FAIL, payload: notAuthorizedError("transaction") }
      ]
      return store
        .dispatch(actions.getTransaction(mockTransactionData.docs[0]._id))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('postTransaction(history, transaction) success', () => {
      nock.post("/transactions").reply(200, mockTransactionData.docs[0])
      const expectedActions = [
        { type: types.POST_TRANSACTION },
        { type: types.POST_TRANSACTION_SUCCESS, payload: mockTransactionData.docs[0] }
      ]
      return store
        .dispatch(actions.postTransaction(mockHistory, mockTransactionData.docs[0]))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })
    it('postTransaction(history, transaction) 401-error', () => {
      nock.post("/transactions").reply(401, alreadyExistsError("transaction"))
      const expectedActions = [
        { type: types.POST_TRANSACTION },
        { type: types.POST_TRANSACTION_FAIL, payload: alreadyExistsError("transaction") }
      ]
      return store
        .dispatch(actions.postTransaction(mockHistory, mockTransactionData.docs[0]))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('putTransaction(transaction) success', () => {
      let updatedTransaction = mockTransactionData.docs[0]
      mockTransactionData.docs[0].status = "refunded"
      nock.put("/transactions/"+mockTransactionData.docs[0]._id).reply(200, updatedTransaction)
      const expectedActions = [
        { type: types.PUT_TRANSACTION },
        { type: types.PUT_TRANSACTION_SUCCESS, payload: updatedTransaction }
      ]
      return store
        .dispatch(actions.putTransaction(updatedTransaction))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })
    it('putTransaction(transaction) 401-error', () => {
      let updatedTransaction = mockTransactionData.docs[0]
      mockTransactionData.docs[0].status = "refunded"
      nock.put("/transactions/"+mockTransactionData.docs[0]._id).reply(401, alreadyExistsError("transaction"))
      const expectedActions = [
        { type: types.PUT_TRANSACTION },
        { type: types.PUT_TRANSACTION_FAIL, payload: alreadyExistsError("transaction") }
      ]
      return store
        .dispatch(actions.putTransaction(updatedTransaction))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('deleteTransaction(history, transaction_id) success', () => {
      nock.delete("/transactions/"+mockTransactionData.docs[0]._id).reply(200, { message: "transaction successfully deleted" })
      const expectedActions = [
        { type: types.DELETE_TRANSACTION },
        { type: types.DELETE_TRANSACTION_SUCCESS, payload: { message: "transaction successfully deleted" } }
      ]
      return store
        .dispatch(actions.deleteTransaction(mockHistory, mockTransactionData.docs[0]._id))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })
    it('deleteTransaction(history, transaction_id) 403-error', () => {
      nock.delete("/transactions/"+mockTransactionData.docs[0]._id).reply(403, notAuthorizedError("transaction"))
      const expectedActions = [
        { type: types.DELETE_TRANSACTION },
        { type: types.DELETE_TRANSACTION_FAIL, payload: notAuthorizedError("transaction") }
      ]
      return store
        .dispatch(actions.deleteTransaction(mockHistory, mockTransactionData.docs[0]._id))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })
  })

  describe('clear', () => {
    it('clearTransaction()', () => {
      const expectedActions = [
        { type: types.CLEAR_TRANSACTION }
      ]
      return store
        .dispatch(actions.clearTransaction())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })
    it('clearPostTransaction()', () => {
      const expectedActions = [
        { type: types.CLEAR_POST_TRANSACTION }
      ]
      return store
        .dispatch(actions.clearPostTransaction())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })
    it('clearPutTransaction()', () => {
      const expectedActions = [
        { type: types.CLEAR_PUT_TRANSACTION }
      ]
      return store
        .dispatch(actions.clearPutTransaction())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })
    it('clearDeleteTransaction()', () => {
      const expectedActions = [
        { type: types.CLEAR_DELETE_TRANSACTION }
      ]
      return store
        .dispatch(actions.clearDeleteTransaction())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })
  })

  describe("socket", () => {
    it('transactionCreated()', () => {
      const expectedActions = [
        { type: types.TRANSACTION_CREATED, payload: mockNewTransaction }
      ]
      return store
        .dispatch(actions.transactionCreated(mockNewTransaction))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })
    it('transactionUpdated()', () => {
      let updatedTransaction = mockTransactionData.docs[0]
      updatedTransaction.description = "This is an updated transaction description."
      const expectedActions = [
        { type: types.TRANSACTION_UPDATED, payload: updatedTransaction }
      ]
      return store
        .dispatch(actions.transactionUpdated(updatedTransaction))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })
    it('transactionDeleted()', () => {
      const expectedActions = [
        { type: types.TRANSACTION_DELETED, payload: { _id: mockTransactionData.docs[0]._id }}
      ]
      return store
        .dispatch(actions.transactionDeleted({ _id: mockTransactionData.docs[0]._id }))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })
  })
})
