import { FETCH_USER, CLEAR_USER } from '../actions'

export default (state= {}, action) => {
  switch (action.type) {
    case FETCH_USER:
      return action.payload.data
    case CLEAR_USER:
      return {}
    default:
      return state
  }
}
