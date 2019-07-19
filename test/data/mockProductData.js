import { initialState } from '../../src/reducers/productsReducer'

const testDate = Date.now()
const mockProductData =
  {
    docs: [
      {
        "_id": "5ca0a2198b782f09b2cabb02",
        "name": "Test Product",
        "description": "This is a test description for a product.",
        "category": "class",
        "amount": "7777",
        "currency": "usd",
        "interval": "one-time",
        "access": "lifetime",
        "allow_renewals": false,
        "access_after_last_cycle": "lifetime access",
        "membership_level": 1,
        "created_at": testDate
      }
    ]
  }

const loadedState = {
  ...initialState,
  loaded: true,
  total: 1,
  user: {...mockProductData.docs[0]},
  docs: [...mockProductData.docs]
}

const mockNewProduct = {
  "_id": "5ca0a2198b782f09b2cabb03",
  "name": "New Product",
  "description": "This is a test description for a new product.",
  "category": "script",
  "amount": "7777",
  "currency": "usd",
  "interval": "one-time",
  "access": "lifetime",
  "allow_renewals": false,
  "access_after_last_cycle": "lifetime access",
  "membership_level": 1,
  "created_at": testDate
}

export {
  mockProductData, loadedState, mockNewProduct
}
