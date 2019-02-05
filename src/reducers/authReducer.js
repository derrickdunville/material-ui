import * as types from '../constants/auth-action-types'

const initialState = {
  loading: false,
  user: false,
  message: false,
  error: false,
  validResetToken: false,
  verifyMessage: false,

  cancelSubscriptionOpen: false,
  cancelingSubscription: false,
  cancelingSubscriptionSuccessMessage: false,
  cancelingSubscriptionFailMessage: false,

  resumeSubscriptionOpen: false,
  resumingSubscription: false,
  resumingSubscriptionSuccessMessage: false,
  resumingSubscriptionFailMessage: false

}
export default function(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_CURRENT_USER:
      return {
        ...state,
        user: action.payload.data || false
      }
    case types.LOGIN_USER:
      return {
        ...state,
        loading: true
      }
    case types.LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.data,
        error: false,
      }
    case types.LOGIN_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.data.err.message
      }
    case types.LOGOUT_USER:
      return {
        ...state,
        user: false,
        loading: false,
        error: false
      }
    case types.SIGN_UP_USER:
      return {
        ...state,
        loading: true
      }
    case types.SIGN_UP_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.data,
        loading: false
      }
    case types.SIGN_UP_USER_FAIL:
      return {
        ...state,
        error: action.payload.data.message,
        loading: false
      }
    case types.FORGOT_PASSWORD:
      return {
        ...state,
        loading: true,
        message: false,
        error: false
      }
    case types.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        message: action.payload.data.message,
        loading: false
      }
    case types.FORGOT_PASSWORD_FAIL:
      return {
        ...state,
        error: action.payload.data.err.message,
        loading: false
      }
    case types.RESET_PASSWORD:
      return {
        ...state,
        loading: true,
        message: false,
        error: false
      }
    case types.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        message: action.payload.data.message,
        loading: false
      }
    case types.RESET_PASSWORD_FAIL:
      return {
        ...state,
        error: action.payload.data.err.message,
        loading: false
      }
    case types.VERIFY_RESET_PASSWORD_TOKEN:
      return {
        ...state,
        loading: true,
        message: false,
        error: false,
        validResetToken: false
      }
    case types.VERIFY_RESET_PASSWORD_TOKEN_SUCCESS:
      return {
        ...state,
        verifyMessage: action.payload.data.message,
        validResetToken: true,
        loading: false
      }
    case types.VERIFY_RESET_PASSWORD_TOKEN_FAIL:
      return {
        ...state,
        error: action.payload.data.err.message,
        validResetToken: false,
        loading: false
      }
    case types.RESET_AUTH:
      return {
        ...state,
        loading: false,
        message: false,
        error: false,
        validResetToken: false
      }

    case types.CANCEL_SUBSCRIPTION:
      return {
        ...state,
        cancelingSubscription: true
      }
    case types.CANCEL_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          subscriptions: updateSubscription(state.user.subscriptions, action)
        },
        cancelingSubscription: false,
        cancelingSubscriptionSuccessMessage: "Subscription successfully canceled.",
        cancelingSubscriptionFailMessage: false
      }
    case types.CANCEL_SUBSCRIPTION_FAIL:
      return {
        ...state,
        cancelingSubscription: false,
        cancelingSubscriptionSuccessMessage: false,
        cancelingSubscriptionFailMessage: action.payload.data.err.message || "An error occurred while canceling the subscription, please contact support if the problem persists."
      }
    case types.TOGGLE_CANCEL_SUBSCRIPTION_OPEN:
      return {
        ...state,
        cancelSubscriptionOpen: !state.cancelSubscriptionOpen
      }
    case types.CLEAR_CANCEL_SUBSCRIPTION:
      return {
        ...state,
        cancelSubscriptionOpen: false,
        cancelingSubscription: false,
        cancelingSubscriptionSuccessMessage: false,
        cancelingSubscriptionFailMessage: false,
      }
    case types.RESUME_SUBSCRIPTION:
      return {
        ...state,
        resumingSubscription: true
      }
    case types.RESUME_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          subscriptions: updateSubscription(state.user.subscriptions, action)
        },
        resumingSubscription: false,
        resumingSubscriptionSuccessMessage: "Subscription successfully resumed.",
        resumingSubscriptionFailMessage: false
      }
    case types.RESUME_SUBSCRIPTION_FAIL:
      return {
        ...state,
        resumingSubscription: false,
        resumingSubscriptionSuccessMessage: false,
        resumingSubscriptionFailMessage: action.payload.data.err.message || "An error occurred while resuming the subscription. Please contact support if the problem persists."
      }
    case types.TOGGLE_RESUME_SUBSCRIPTION_OPEN:
      return {
        ...state,
        resumeSubscriptionOpen: !state.resumeSubscriptionOpen
      }
    case types.CLEAR_RESUME_SUBSCRIPTION:
      return {
        ...state,
        resumeSubscriptionOpen: false,
        resumingSubscription: false,
        resumingSubscriptionSuccessMessage: false,
        resumingSubscriptionFailMessage: false,
      }
    default:
      return state
  }
}

function updateSubscription(subscriptions, action) {
    return subscriptions.map( (subscription, index) => {
        if(subscription._id !== action.payload.data._id) {
            // This isn't the item we care about - keep it as-is
            return subscription;
        }
        // Otherwise, this is the one we want - return an updated value
        return {
            ...subscription,
            ...action.payload.data
        };
    });
}
