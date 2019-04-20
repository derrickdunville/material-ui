import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import {
  postUser,
  clearPostUser,
  putUser,
  clearPutUser
} from 'actions/userActions'
import Button from 'components/CustomButtons/Button.jsx'
import CustomTextField from 'components/CustomTextField/CustomTextField.jsx'
import withStyles from '@material-ui/core/styles/withStyles'
import formStyle from 'assets/jss/material-dashboard-react/views/formStyle.jsx'
import AlertDialog from 'components/Dialog/AlertDialog.jsx'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from "@material-ui/core/FormControl"
import CustomSelect from "components/Select/CustomSelect.jsx"
import CustomOutlinedInput from 'components/OutlinedInput/CustomOutlinedInput.jsx'

class UserForm extends Component {
  constructor(props) {
    super(props);
    if(this.props.editing){
      this.state = {
        editOpen: false,
        createOpen: false,
        ...this.props.user
      }
    } else {
      this.state = {
        editOpen: false,
        createOpen: false,
        username:'',
        email:'',
        password:'',
        roles: [],
      }
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    // Confirm Edit Dialog Actions
    this.openEdit = this.openEdit.bind(this)
    this.closeEdit = this.closeEdit.bind(this)
    // Confirm Create Dialog Actions
    this.openCreate = this.openCreate.bind(this)
    this.closeCreate = this.closeCreate.bind(this)

  }
  handleChange(event){
    if(event.target.name === 'username'){
        this.setState({ username: event.target.value })
    }
    if(event.target.name === 'email'){
      this.setState({ email: event.target.value })
    }
    if(event.target.name === 'password'){
      this.setState({ password: event.target.value })
    }
  }

  openEdit(){
    this.setState({editOpen: true})
  }
  closeEdit(){
    this.setState({editOpen: false})
    // clearPutUser
    let this2 = this
    setTimeout(function () {
      this2.props.clearPutUser()
    }, 200);
  }

  openCreate(){
    this.setState({createOpen: true})
  }
  closeCreate(){
    this.setState({createOpen: false})
    let this2 = this
    setTimeout(function () {
      this2.props.clearPostUser()
    }, 200);
  }
  handleSubmit(event){
    event.preventDefault()
    console.log("Handle submit")

    let user = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    }
    if(this.props.editing){
      console.log("putUser")
      let form_data = new FormData()
      form_data.append("user", JSON.stringify(user))
      this.props.putUser(this.props.user._id, form_data)
    } else {
      this.props.postUser(this.props.history, user)
    }
  }

  render(){
    const { classes } = this.props;
    return(
      <div className={classes.formWrapper}>
        <form onSubmit={this.openCreate}>
          <CustomTextField
            labelText="Username"
            inputType="text"
            formControlProps={{classes: { root: classes.formControl}, fullWidth: true}}
            inputProps={{
              name: 'username',
              value: this.state.username,
              onChange: this.handleChange,
              disabled: this.props.disabled
            }}
          />
          <CustomTextField
            labelText="Email"
            inputType="text"
            formControlProps={{classes: { root: classes.formControl}, fullWidth: true}}
            inputProps={{
              name: 'email',
              value: this.state.email,
              onChange: this.handleChange,
              disabled: this.props.disabled
            }}
          />
          <CustomTextField
            labelText="Password"
            inputType="password"
            formControlProps={{classes: { root: classes.formControl}, fullWidth: true}}
            inputProps={{
              name: 'password',
              type: "password",
              value: this.state.password,
              onChange: this.handleChange,
              disabled: this.props.disabled
            }}
          />
          <FormControl classes={{root: classes.formControl}} variant="outlined" style={{width: "100%", backgroundColor: "#202225", borderRadius: "4px"}}>
            <InputLabel style={{color: "white"}}>
              Role
            </InputLabel>
            <CustomSelect
              disabled={this.props.disabled}
              value={this.state.role}
              onChange={this.handleChange}
              name="interval"
              renderValue={value => `${value}`}
              input={<CustomOutlinedInput labelWidth={26} name="filter"/>}
              items={["Admin", "Member", "Everyone"]}
              >
            </CustomSelect>
          </FormControl>
        {!this.props.disabled && (
          <Button
            style={{width: '100px', height: '50px', float: "right"}}
            color="primary"
            onClick={this.props.editing ? this.openEdit : this.openCreate}>
            {this.props.editing ? "Save" : "Create"}
          </Button>
        )}
        </form>
        <AlertDialog
          hidden={true}
          buttonText="Save"
          buttonColor="secondary"
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
          onClick={this.toggleEdit}
          onClose={this.closeEdit}
          />
        <AlertDialog
          hidden={true}
          buttonText="Create"
          buttonColor="secondary"
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
          onClick={this.toggleCreate}
          onClose={this.closeCreate}
          />
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    users: state.users,
    postingUser: state.users.postingUser,
    postUserSuccessMessage: state.users.postUserSuccessMessage,
    postUserErrorMessage: state.users.postUserErrorMessage,
    puttingUser: state.users.puttingUser,
    putUserSuccessMessage: state.users.putUserSuccessMessage,
    putUserErrorMessage: state.users.putUserErrorMessage
  }
}

export default connect(mapStateToProps,
  {
    postUser,
    clearPostUser,
    putUser,
    clearPutUser
  })(withRouter(withStyles(formStyle)(UserForm)))
