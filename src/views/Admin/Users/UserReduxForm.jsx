import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { postUser, clearPostUser, putUser, clearPutUser, deleteUser } from 'actions/userActions'
import { Field, reduxForm, formValueSelector  } from 'redux-form'
import * as regex from 'utils/regex'

import Button from '@material-ui/core/Button'
import FormTextField from 'components/FormFields/FormTextField.jsx'
import FormSelect from 'components/FormFields/FormSelect.jsx'
import FormControlLabel from 'components/FormFields/FormControlLabel.jsx'
import FormCheckbox from 'components/FormFields/FormCheckbox.jsx'
import AlertDialog from "components/Dialog/AlertDialog.jsx"

const selector = formValueSelector('user')

const validate = (values, props) => {
  const errors = {}
  if(!values.username){
    errors.username = "Required"
  }
  if(values.username && !regex.usernameRegex.test(values.username)) {
    errors.username = 'Must contain only alphanumeric characters and underscores'
  }
  if(!values.email){
    errors.email = "Required"
  }
  if(values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if(!values.password && !props.editing){
    errors.password = "Required"
  }
  if(values.password && !regex.passwordRegex.test(values.password)){
    errors.password = ""
    if(!regex.lowercaseAlphaRegex.test(values.password)){
      errors.password += "Must contain at least 1 lowercase alphabetic character. "
    }
    if(!regex.uppercaseAlphaRegex.test(values.password)){
      errors.password += "Must contain at least 1 uppercase alphabetic character. "
    }
    if(!regex.numericRegex.test(values.password)){
      errors.password += "Must contain at least 1 numeric character. "
    }
    if(!regex.specialRegex.test(values.password)){
      errors.password += "Must contain at least 1 special character. "
    }
    if(!regex.lengthRegex.test(values.password)){
      errors.password += "Must be 8 characters or longer. "
    }
  }

  if(!values.role){
    errors.role = "Required"
  }
  return errors
}


class UserReduxForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteOpen: false,
      editOpen: false,
      createOpen: false
    }
  }

  openDelete = () => {
    this.setState({deleteOpen: true})
  }
  closeDelete = () => {
    this.setState({deleteOpen: false})
  }
  handleDelete = () => {
    this.props.deleteUser(this.props.history, this.props.user._id)
  }

  openCreate = () => {
    this.setState({createOpen: true})
  }
  closeCreate = () => {
    this.setState({createOpen: false})
    let this2 = this
    setTimeout(function () {
      this2.props.clearPostUser()
    }, 200);
  }

  openEdit = () => {
    this.setState({editOpen: true})
  }
  closeEdit = () => {
    this.setState({editOpen: false})
    // clearPutUser
    let this2 = this
    setTimeout(function () {
      this2.props.clearPutUser()
    }, 200);
  }

  handleSubmit = (event) => {
    event.persist()
    event.preventDefault()

    if(this.props.editing){
      let user = {}
      if(this.props.username != this.props.user.username){
        user.username = this.props.username
      }
      if(this.props.email != this.props.user.email){
        user.email = this.props.email
      }
      if(this.props.password != ''){
        user.password = this.props.password
      }
      if(this.props.role != this.props.user.role){
        user.role = this.props.role
      }
      console.dir(user)
      let form_data = new FormData()
      form_data.append("user", JSON.stringify(user))
      this.props.putUser(this.props.user._id, form_data)
    } else {
      let user = {
        username: this.props.username,
        email: this.props.email,
        password: this.props.password,
        role: this.props.role,
        sendWelcome: this.props.sendWelcome,
        sendNotification: this.props.sendNotification
      }
      console.dir(user)
      this.props.postUser(this.props.history, user)
    }
  }

  render(){
    const { classes, invalid, pristine, editing} = this.props;
    console.dir(this.props.initialValues)
    return(
      <form onSubmit={editing ? this.openEdit : this.openCreate}>
        <Field name="username" label="Username" component={FormTextField} type="text"/>
        <Field name="email" label="Email" component={FormTextField} type="text"/>
        <Field name="password" label="Password" component={FormTextField} type="password" autoComplete="new-password"/>
        <Field name="role" label="Role" id="role-select" labelWidth={32} component={FormSelect} items={['member', 'admin']}/>
        {!editing && <Field name="sendNotification" label="Send User Notification" component={FormCheckbox}/>}
        {!editing && <Field name="sendWelcome" label="Send Welcome Email" component={FormCheckbox}/>}
        {!editing ?
          (
            <AlertDialog
              buttonProps={{
                style: {width: '100px', margin: "0 0 0 10px", height: '56px', float: "right"},
              }}
              disabled={invalid || pristine}
              buttonText="Create"
              buttonColor="primary"
              loading={this.props.postingUser}
              loadingMessage={"Creating User..."}
              successMessage={this.props.postUserSuccessMessage}
              errorMessage={this.props.postUserErrorMessage}
              open={this.state.createOpen}
              title="Create New User?"
              text="Are you sure you would like to create this new user?, I sure hope you know exactly what you are doing!"
              leftAction={this.closeCreate}
              leftActionText="Cancel"
              leftActionColor="default"
              rightAction={this.handleSubmit}
              rightActionText="Create"
              rightActionColor="primary"
              onClick={this.openCreate}
              onClose={this.closeCreate}
              />
          ):(
            <AlertDialog
              buttonProps={{
                style: {width: '100px', margin: "0 0 0 10px", height: '56px', float: "right"},
              }}
              disabled={invalid || pristine}
              buttonText="Save"
              buttonColor="primary"
              loading={this.props.puttingUser}
              loadingMessage={"Saving User..."}
              successMessage={this.props.putUserSuccessMessage}
              errorMessage={this.props.putUserErrorMessage}
              open={this.state.editOpen}
              title="Save User?"
              text="Are you sure you would like to save the changes for this user? I sure hope you know exactly what you are doing!"
              leftAction={this.closeEdit}
              leftActionText="Cancel"
              leftActionColor="default"
              rightAction={this.handleSubmit}
              rightActionText="Save"
              rightActionColor="primary"
              onClick={this.openEdit}
              onClose={this.closeEdit}
              />
          )
        }
        {editing &&
          <AlertDialog
            buttonProps={{
              style: {width: '100px', margin: "0 0 0 10px", height: '56px', float: "right"},
            }}
            buttonText="Delete"
            buttonColor="secondary"
            loading={this.props.deletingUser}
            loadingMessage={"Deleting User..."}
            successMessage={this.props.deleteUserSuccessMessage}
            errorMessage={this.props.deleteUserErrorMessage}
            open={this.state.deleteOpen}
            title={`Delete ${this.props.user.username}?`}
            text="Are you sure you would like to delete this user? This will result in this user being end-dated. It will not actually be deleted permenantly but it will be masked and all associated records will also be end-dated. This action cannot be undone."
            leftAction={this.closeDelete}
            leftActionText="Cancel"
            leftActionColor="default"
            rightAction={this.handleDelete}
            rightActionText="Delete"
            rightActionColor="secondary"
            onClick={this.openDelete}
            onClose={this.closeDelete}
            />
        }
      </form>
    )
  }
}

function mapStateToProps(state, props) {
  let initialValues = {}
  if(props.editing){
    initialValues = {...props.user}
  } else {
    initialValues = {
      role: 'member',
      sendNotification: true,
      sendWelcome: true
    }
  }
  return {
    initialValues: initialValues,
    username: selector(state, 'username'),
    email: selector(state, 'email'),
    password: selector(state, 'password'),
    role: selector(state, 'role'),
    created: selector(state, 'created'),
    sendNotification: selector(state, 'sendNotification'),
    sendWelcome: selector(state, 'sendWelcome'),
    postingUser: state.users.postingUser,
    postUserSuccessMessage: state.users.postUserSuccessMessage,
    postUserErrorMessage: state.users.postUserErrorMessage,
    puttingUser: state.users.puttingUser,
    putUserSuccessMessage: state.users.putUserSuccessMessage,
    putUserErrorMessage: state.users.putUserErrorMessage,
    deletingUser: state.users.deletingUser,
    deleteUserErrorMessage: state.users.deleteUserErrorMessage,
    deleteUserSuccessMessage: state.users.deleteUserSuccessMessage,
  }
}

UserReduxForm = reduxForm({
  form: 'user',
  validate,
  enableReinitialize: true
})(withRouter(UserReduxForm))

export default connect(
  mapStateToProps,
  {
    postUser,
    clearPostUser,
    putUser,
    clearPutUser,
    deleteUser
  }
)(UserReduxForm)
