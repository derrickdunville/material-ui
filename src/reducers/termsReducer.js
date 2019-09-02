import * as types from '../constants/terms-action-types'
import { updateDoc, deleteDoc } from './utils/reducerUtils'

const initialState = {
  loaded: false,
  terms: {},

  gettingTerms: false,
  getTermsErrorMessage: false,

  postingTerms: false,
  postTermsErrorMessage: false,
  postTermsSuccessMessage: false,
}

const termsReducer = (state=initialState, action) => {
  switch (action.type) {
    case types.GET_TERMS:
      return {
        ...state,
        gettingTerms: true
      }
    case types.GET_TERMS_SUCCESS:
      return {
        ...state,
        loaded: true,
        gettingTerms: false,
        terms: action.payload
      }
    case types.GET_TERMS_FAIL:
      return {
        ...state,
        gettingTerms: false,
        getTermsErrorMessage: action.payload.err.message
      }
    case types.POST_TERMS:
      return {
        ...state,
        postingTerms: true
      }
    case types.POST_TERMS_SUCCESS:
      return {
        ...state,
        postingTerms: false,
        terms: action.payload,
        postTermsSuccessMessage: "Terms successfully created."
      }
    case types.POST_TERMS_FAIL:
      return {
        ...state,
        postingTerms: false,
        postTermsErrorMessage: action.payload.err.message
      }
    default:
      return state
  }
}

export { initialState, termsReducer }
