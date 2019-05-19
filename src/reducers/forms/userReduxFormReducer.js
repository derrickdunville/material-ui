import {
  POST_USER_SUCCESS,
} from '../../constants/user-action-types'

export default (state={}, action) => {
  switch(action.type) {
    case "POST_USER_SUCCESS":
      return undefined;       // <--- blow away form data
    default:
      return state;
  }
}
