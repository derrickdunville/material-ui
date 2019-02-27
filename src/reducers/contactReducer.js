import {
  POST_CONTACT,
  POST_CONTACT_SUCCESS,
  POST_CONTACT_FAIL,
} from '../actions'

const initialState = {
  postingContact: false
}
export default (state=initialState, action) => {
  switch(action.type){
    case POST_CONTACT:
      return {
        ...state,
        postingContact: true
      }
    case POST_CONTACT_SUCCESS:
      return {
        ...state,
        values: {
          ...state.values,
          name: undefined,
          email: undefined,
          subject: undefined,
          message: undefined
        },
        registeredFields: {
          ...state.registeredFields,
          name: undefined,
          email: undefined,
          subject: undefined,
          message: undefined // <----- clear field state, too (touched, etc.)
        },
        postingContact: false,
        postContactSuccessMessage: action.payload.data.message,
        postContactFailMessage: false
      }
    case POST_CONTACT_FAIL:
      return {
        ...state,
        postingContact: false,
        postContactSuccessMessage: false,
        postContactFailMessage: action.payload.data.message
      }
    default:
      return state
  }
}
