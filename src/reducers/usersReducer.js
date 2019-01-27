import {
  FETCH_USERS,
  CREATE_USER,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAIL
} from '../actions'

const initialState = {

}
export default (state= [], action) => {
  switch (action.type) {
    case FETCH_USERS:
      return action.payload.data
    default:
      return state
  }
}
