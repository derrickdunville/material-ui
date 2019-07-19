import { initialState } from '../../src/reducers/transactionsReducer'
import { mockProductData } from './mockProductData'
import { mockUserData } from './mockUserData'

const testDate = Date.now()
const mockTransactionData =
  {
    docs: [
      {
        "_id": "5ca0a2198b782f09b2cabb06",
        "user": mockUserData.docs[0]._id,
        "product": mockProductData.docs[0]._id,
        "coupon": null,
        "subscription": null,
        "trans_num": "man_124567890",
        "amount": mockProductData.docs[0].amount,
        "amount_refunded": 0,
        "total": mockProductData.docs[0].amount,
        "tax_amount": 0,
        "tax_desc": null,
        "tax_compound": false,
        "tax_shipping": false,
        "tax_class": "standard",
        "status": "succeeded",
        "txn_type": null,
        "response": null,
        "gateway": "stripe",
        "ip_address": null,
        "prorated": false,
        "created_at": testDate,
        "expires_at": null,
        "refunded_at": null,
        "end_date": null
      }
    ]
  }

const loadedState = {
  ...initialState,
  loaded: true,
  total: 1,
  transaction: {...mockTransactionData.docs[0]},
  docs: [...mockTransactionData.docs]
}

const mockNewTransaction = {
  "_id": "5ca0a2198b782f09b2cabb07",
  "user": mockUserData.docs[0]._id,
  "product": mockProductData.docs[0]._id,
  "coupon": null,
  "subscription": null,
  "trans_num": "man_124567890",
  "amount": mockProductData.docs[0].amount,
  "amount_refunded": 0,
  "total": mockProductData.docs[0].amount,
  "tax_amount": 0,
  "tax_desc": null,
  "tax_compound": false,
  "tax_shipping": false,
  "tax_class": "standard",
  "status": "succeeded",
  "txn_type": null,
  "response": null,
  "gateway": "stripe",
  "ip_address": null,
  "prorated": false,
  "created_at": testDate,
  "expires_at": null,
  "refunded_at": null,
  "end_date": null
  }

export {
  mockTransactionData, loadedState, mockNewTransaction
}
