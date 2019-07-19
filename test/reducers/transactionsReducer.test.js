/**
 * @jest-environment node
 */
import expect from 'expect'
import { transactionsReducer, initialState } from '../../src/reducers/transactionsReducer'
import * as types from '../../src/constants/transaction-action-types'
import { mockTransactionData, loadedState, mockNewTransaction } from '../data/mockTransactionData'
import { internalServerError, notFoundError, alreadyExistsError } from '../data/mockErrors'
import { updateDoc, deleteDoc } from '../../src/reducers/utils/reducerUtils'

describe('transactions reducer', () => {
  it('should return the initial state', () => {
    expect(transactionsReducer(undefined, {})).toEqual(
      initialState
    )
  })

  describe('post', () => {
    it('POST_TRANSACTION', () => {
      expect(
        transactionsReducer(initialState, {
          type: types.POST_TRANSACTION
        })
      ).toEqual({
        ...initialState,
        postingTransaction: true
      })
    })
    it('POST_TRANSACTION_SUCCESS', () => {
      expect(
        transactionsReducer(initialState, {
          type: types.POST_TRANSACTION_SUCCESS,
          payload: mockTransactionData.docs[0]
        })
      ).toEqual({
        ...initialState,
        postingTransaction: false,
        postTransactionSuccessMessage: "Transaction successfully created.",
        total: initialState.total + 1,
        docs: [...initialState.docs, mockTransactionData.docs[0]]
      })
    })
    it('POST_TRANSACTION_FAIL', () => {
      expect(
        transactionsReducer(initialState, {
          type: types.POST_TRANSACTION_FAIL,
          payload: alreadyExistsError("transaction")
        })
      ).toEqual({
        ...initialState,
        postingTransaction: false,
        postTransactionErrorMessage: alreadyExistsError("transaction").err.message
      })
    })
  })
  describe('get (list)', () => {
    it('GET_TRANSACTIONS', () => {
      expect(
        transactionsReducer(initialState, {
          type: types.GET_TRANSACTIONS
        })
      ).toEqual({
        ...initialState,
        gettingTransactions: true
      })
    })
    it('GET_TRANSACTIONS_SUCCESS', () => {
      expect(
        transactionsReducer(initialState, {
          type: types.GET_TRANSACTIONS_SUCCESS,
          payload: mockTransactionData
        })
      ).toEqual({
        ...initialState,
        gettingTransactions: false,
        loaded: true,
        ...mockTransactionData
      })
    })
    it('GET_TRANSACTIONS_FAIL', () => {
      expect(
        transactionsReducer(initialState, {
          type: types.GET_TRANSACTIONS_FAIL,
          payload: internalServerError
        })
      ).toEqual({
        ...initialState,
        gettingTransaction: false,
        getTransactionsErrorMessage: internalServerError.err.message
      })
    })
  })
  describe('get', () => {
    it('GET_TRANSACTION', () => {
      expect(
        transactionsReducer(initialState, {
          type: types.GET_TRANSACTION
        })
      ).toEqual({
        ...initialState,
        gettingTransaction: true
      })
    })
    it('GET_TRANSACTION_SUCCESS', () => {
      expect(
        transactionsReducer(initialState, {
          type: types.GET_TRANSACTION_SUCCESS,
          payload: mockTransactionData[0]
        })
      ).toEqual({
        ...initialState,
        gettingTransaction: false,
        transaction: mockTransactionData[0]
      })
    })
    it('GET_TRANSACTION_FAIL', () => {
      expect(
        transactionsReducer(initialState, {
          type: types.GET_TRANSACTION_FAIL,
          payload: notFoundError("transaction")
        })
      ).toEqual({
        ...initialState,
        gettingTransaction: false,
        getTransactionErrorMessage: notFoundError("transaction").err.message
      })
    })
  })
  describe('put', () => {
    it('PUT_TRANSACTION', () => {
      expect(
        transactionsReducer(loadedState, {
          type: types.PUT_TRANSACTION
        })
      ).toEqual({
        ...loadedState,
        puttingTransaction: true
      })
    })
    it('PUT_TRANSACTION_SUCCESS', () => {
      expect(
        transactionsReducer(loadedState, {
          type: types.PUT_TRANSACTION_SUCCESS,
          payload: {
            ...loadedState.docs[0],
            status: "refunded"
          }
        })
      ).toEqual({
        ...loadedState,
        puttingTransaction: false,
        transaction: {
          ...loadedState.docs[0],
          status: "refunded"
        },
        docs: [{
          ...loadedState.docs[0],
          status: "refunded"
        }],
        putTransactionSuccessMessage: 'Transaction successfully updated.'
      })
    })
    it('PUT_TRANSACTION_FAIL', () => {
      expect(
        transactionsReducer(loadedState, {
          type: types.PUT_TRANSACTION_FAIL,
          payload: alreadyExistsError("transaction")
        })
      ).toEqual({
        ...loadedState,
        puttingTransaction: false,
        putTransactionErrorMessage: alreadyExistsError("transaction").err.message
      })
    })
  })
  describe('delete', () => {
    it('DELETE_TRANSACTION', () => {
      expect(
        transactionsReducer(loadedState, {
          type: types.DELETE_TRANSACTION
        })
      ).toEqual({
        ...loadedState,
        deletingTransaction: true
      })
    })
    it('DELETE_TRANSACTION_SUCCESS', () => {
      expect(
        transactionsReducer(loadedState, {
          type: types.DELETE_TRANSACTION_SUCCESS,
          payload: {
            _id: loadedState.docs[0]._id,
            messsage: "Transaction successfully deleted."
          }
        })
      ).toEqual({
        ...loadedState,
        deletingTransaction: false,
        deleteTransactionSuccessMessage: "Transaction successfully deleted.",
        docs: []
      })
    })
    it('DELETE_TRANSACTION_FAIL', () => {
      expect(
        transactionsReducer(loadedState, {
          type: types.DELETE_TRANSACTION_FAIL,
          payload: notFoundError("transaction")
        })
      ).toEqual({
        ...loadedState,
        deletingTransaction: false,
        deleteTransactionErrorMessage: notFoundError("transaction").err.message
      })
    })
  })
  describe('clear', () => {
    it('CLEAR_TRANSACTION', () => {
      expect(
        transactionsReducer(loadedState, {
          type: types.CLEAR_TRANSACTION
        })
      ).toEqual({
        ...loadedState,
        transaction: false
      })
    })
    it('CLEAR_DELETE_TRANSACTION', () => {
      let deleteState = {
        ...loadedState,
        deleteTransactionErrorMessage: "Transaction not found",
        deleteTransactionSuccessMessage: "Transaction successfully deleted."
      }
      expect(
        transactionsReducer(deleteState, {
          type: types.CLEAR_DELETE_TRANSACTION
        })
      ).toEqual({
        ...deleteState,
        deleteTransactionErrorMessage: false,
        deleteTransactionSuccessMessage: false
      })
    })
    it('CLEAR_PUT_TRANSACTION', () => {
      let putState = {
        ...loadedState,
        putTransactionErrorMessage: "Transaction not found",
        putTransactionSuccessMessage: "Transaction successfully updated."
      }
      expect(
        transactionsReducer(putState, {
          type: types.CLEAR_PUT_TRANSACTION
        })
      ).toEqual({
        ...loadedState,
        putTransactionErrorMessage: false,
        putTransactionSuccessMessage: false
      })
    })
    it('CLEAR_POST_TRANSACTION', () => {
      let postState = {
        ...loadedState,
        postTransactionErrorMessage: "Error creating transaction.",
        postTransactionSuccessMessage: "Transaction successfully created."
      }
      expect(
        transactionsReducer(postState, {
          type: types.CLEAR_POST_TRANSACTION
        })
      ).toEqual({
        ...loadedState,
        postTransactionErrorMessage: false,
        postTransactionSuccessMessage: false
      })
    })
  })
  describe('socket', () => {
    it('TRANSACTION_UPDATED', () => {
      expect(
        transactionsReducer(loadedState, {
          type: types.TRANSACTION_UPDATED,
          payload: {
            ...loadedState.docs[0],
            description: "this is an updated transaction description"
          }
        })
      ).toEqual({
        ...loadedState,
        docs: updateDoc(loadedState.docs, {...loadedState.docs[0], description: "this is an updated transaction description"})
      })
    })
    it('TRANSACTION_CREATED', () => {
      expect(
        transactionsReducer(loadedState, {
          type: types.TRANSACTION_CREATED,
          payload: mockNewTransaction
        })
      ).toEqual({
        ...loadedState
      })
    })
    it('TRANSACTION_DELETED', () => {
      expect(
        transactionsReducer(loadedState, {
          type: types.TRANSACTION_DELETED,
          payload: { _id: loadedState.docs[0]._id }
        })
      ).toEqual({
        ...loadedState,
        docs: []
      })
    })
  })
})
