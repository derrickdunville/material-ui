import { initialState } from '../../src/reducers/subscriptionsReducer'
import { mockProductData } from './mockProductData'
import { mockUserData } from './mockUserData'

const testDate = Date.now()
const mockSubscriptionData =
  {
    docs: [
      {
        "_id": "5ca0a2198b782f09b2cabb04",
        "user": mockUserData.docs[0]._id,
        "product": mockProductData.docs[0]._id,
        "transactions": [],
        "coupon": null,
        "subscription_id": "sub_1234567890",
        "price": mockProductData.docs[0].amount,
        "total": mockProductData.docs[0].amount,
        "tax_amount": 0,
        "tax_desc": null,
        "tax_compound": false,
        "tax_shipping": false,
        "tax_class": "standard",
        "gateway": "stripe",
        "response": null,
        "ip_address": null,
        "period": 1,
        "period_type": "month",
        "limit_cycles": false,
        "limit_cycles_num": 1,
        "limit_cycles_action": "lifetime",
        "prorated_trial": false,
        "trial": false,
        "trial_days": 1,
        "trial_amount": 0.00,
        "status": "active",
        "current_period_start": testDate,
        "current_period_end": testDate,
        "cancel_at_period_end": false,
        "created_at": testDate,
        "cc_last4": "4242",
        "cc_exp_month": "01",
        "cc_exp_year": "1999",
        "token": null,
        "end_date": null
      }
    ]
  }

const loadedState = {
  ...initialState,
  loaded: true,
  total: 1,
  subscription: {...mockSubscriptionData.docs[0]},
  docs: [...mockSubscriptionData.docs]
}

const mockNewSubscription = {
    "_id": "5ca0a2198b782f09b2cabb05",
    "user": mockUserData.docs[0]._id,
    "product": mockProductData.docs[0]._id,
    "transactions": [],
    "coupon": null,
    "subscription_id": "sub_1234567891",
    "price": mockProductData.docs[0].amount,
    "total": mockProductData.docs[0].amount,
    "tax_amount": 0,
    "tax_desc": null,
    "tax_compound": false,
    "tax_shipping": false,
    "tax_class": "standard",
    "gateway": "stripe",
    "response": null,
    "ip_address": null,
    "period": 1,
    "period_type": "month",
    "limit_cycles": false,
    "limit_cycles_num": 1,
    "limit_cycles_action": "lifetime",
    "prorated_trial": false,
    "trial": false,
    "trial_days": 1,
    "trial_amount": 0.00,
    "status": "active",
    "current_period_start": testDate,
    "current_period_end": testDate,
    "cancel_at_period_end": false,
    "created_at": testDate,
    "cc_last4": "4242",
    "cc_exp_month": "01",
    "cc_exp_year": "1999",
    "token": null,
    "end_date": null
  }

export {
  mockSubscriptionData, loadedState, mockNewSubscription
}
