import * as types from '../constants/auth-action-types'

const initialState = {
  loading: false,
  user: false,
  message: false,
  error: false,
  validResetToken: false,
  verifyMessage: false,

  payment_method: false,

  createSubscriptionOpen: false,
  creatingSubscription: false,
  createSubscriptionSuccessMessage: false,
  createSubscriptionFailMessage: false,

  cancelSubscriptionOpen: false,
  cancelingSubscription: false,
  cancelingSubscriptionSuccessMessage: false,
  cancelingSubscriptionFailMessage: false,

  resumeSubscriptionOpen: false,
  resumingSubscription: false,
  resumingSubscriptionSuccessMessage: false,
  resumingSubscriptionFailMessage: false,

  editPaymentMethodOpen: false,
  updatingPaymentMethod: false,

  createTransactionOpen: false,
  creatingTransaction: false,
  createTransactionSuccessMessage: false,
  createTransactionErrorMessage: false,

  updatingProfile: false,
  updateProfileSuccessMessage: false,
  updateProfileErrorMessage: false

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
          subscriptions: updateSubscription(state.user.subscriptions, action.payload.data.subscription)
        },
        cancelingSubscription: false,
        cancelingSubscriptionSuccessMessage: action.payload.data.message,
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
          subscriptions: updateSubscription(state.user.subscriptions, action.payload.data.subscription)
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

    case types.CREATE_SUBSCRIPTION:
      return {
        ...state,
        creatingSubscription: true
      }
    case types.CREATE_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        creatingSubscription: false,
        user: {
          ...state.user,
          subscriptions: [...state.user.subscriptions, action.payload.data]
        },
        createSubscriptionSuccessMessage: "Congratulations! You have successfully subscribed to " + action.payload.data.product.name,
        createSubscriptionFailMessage: false
      }
    case types.CREATE_SUBSCRIPTION_FAIL:
      return {
        ...state,
        creatingSubscription: false,
        createSubscriptionSuccessMessage: false,
        createSubscriptionFailMessage: action.payload.data.err.message
      }
    case types.CLEAR_CREATE_SUBSCRIPTION:
      return {
        ...state,
        creatingTransaction: false,
        createSubscriptionSuccessMessage: false,
        createSubscriptionFailMessage: false
      }
    case types.TOGGLE_CREATE_SUBSCRIPTION_OPEN:
      return {
        ...state,
        createSubscriptionOpen: !state.createSubscriptionOpen
      }
    case types.UPDATE_PAYMENT_METHOD:
      return {
        ...state,
        updatingPaymentMethod: true,
      }
    case types.UPDATE_PAYMENT_METHOD_SUCCESS:
      return {
        ...state,
        payment_method: action.payload.data,
        editPaymentMethodOpen: false,
        updatingPaymentMethod: false,
        updatePaymentMethodErrorMessage: false
      }
    case types.UPDATE_PAYMENT_METHOD_FAIL:
      return {
        ...state,
        updatingPaymentMethod: false,
        updatePaymentMethodErrorMessage: action.payload.data.err.message
      }
    case types.CLEAR_UPDATE_PAYMENT_METHOD:
      return {
        ...state,
        updatePaymentMethodErrorMessage: false,
        updatingPaymentMethod: false
      }
    case types.GET_PAYMENT_METHOD_SUCCESS:
      return {
        ...state,
        payment_method: action.payload.data
      }
    case types.TOGGLE_UPDATE_PAYMENT_METHOD_OPEN:
      return {
        ...state,
        updatePaymentMethodErrorMessage: false,
        editPaymentMethodOpen: !state.editPaymentMethodOpen
      }
    case types.GET_MY_DISCORD_GUILD_MEMBER:
      return {
        ...state,
        gettingMyDiscordGuildMember: true
      }
    case types.GET_MY_DISCORD_GUILD_MEMBER_SUCCESS:
      return {
        ...state,
        gettingMyDiscordGuildMember: false,
        discord_guild_member: action.payload.data.discord_guild_member
      }
    case types.GET_MY_DISCORD_GUILD_MEMBER_FAIL:
      return {
        ...state,
        gettingMyDiscordGuildMember: false,
        discord_guild_member: false
      }
    case types.JOIN_DISCORD_SERVER_SUCCESS:
      return {
        ...state,
        discord_guild_member: action.payload.data.discord_guild_member
      }
    case types.CREATE_TRANSACTION:
      return {
        ...state,
        creatingTransaction: true
      }
    case types.TOGGLE_CREATE_TRANSACTION_OPEN:
      return {
        ...state,
        createTransactionOpen: !state.createTransactionOpen,
      }
    case types.CREATE_TRANSACTION_SUCCESS:
      return {
        ...state,
        creatingTransaction: false,
        user: {
          ...state.user,
          transactions: [...state.user.transactions, action.payload.data]
        },
        createTransactionSuccessMessage: "Transaction successful",
        createTransactionErrorMessage: false
      }
    case types.CREATE_TRANSACTION_FAIL:
      return {
        ...state,
        creatingTransaction: false,
        createTransactionSuccessMessage: false,
        createTransactionErrorMessage: action.payload.data.err.message,
      }
    case types.CLEAR_CREATE_TRANSACTION:
      return {
        ...state,
        creatingTransaction: false,
        createTransactionErrorMessage: false,
        createTransactionSuccessMessage: false,
      }
    case types.UPDATE_PROFILE:
      return {
        ...state,
        updatingProfile: true
      }
    case types.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          avatar: action.payload.data.avatar,
          username: action.payload.data.username,
          email: action.payload.data.email
        },
        updatingProfile: false,
        updateProfileSuccessMessage: "Successfully updated profile",
        updateProfileErrorMessage: false,
      }
    case types.UPDATE_PROFILE_FAIL:{
      return {
        ...state,
        updatingProfile: false,
        updateProfileSuccessMessage: false,
        updateProfileErrorMessage: action.payload.data.err.message
      }
    }
    case types.CLEAR_UPDATE_PROFILE:
      return {
        ...state,
        updateProfileErrorMessage: false,
        updateProfileSuccessMessage: false
      }
    default:
      return state
  }
}


function insertTransaction(transactions, action){
  return [
    ...transactions,
    action.payload.data
  ]
}
function insertSubscription(subscriptions, action){
  return [
    ...subscriptions,
    action.payload.data
  ]
}
function updateSubscription(subscriptions, updated_subscription) {
    return subscriptions.map( (subscription, index) => {
      console.log(subscription.cancel_at_period_end)
        if(subscription._id !== updated_subscription._id) {
            // This isn't the item we care about - keep it as-is
            return subscription;
        }
        // Otherwise, this is the one we want - return an updated value
        return {
            ...subscription,
            ...updated_subscription
        };
    });
}
