export default (state={}, action) => {
  switch(action.type) {
    case "POST_CONTACT_SUCCESS":
      console.log('contactReduxFormReduxer success')
      return undefined;       // <--- blow away form data
    default:
      return state;
  }
}
