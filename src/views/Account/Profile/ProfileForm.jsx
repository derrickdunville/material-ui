import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateProfile, clearUpdateProfile } from 'actions/authActions'
import Button from "components/CustomButtons/Button.jsx";
import Paper from "@material-ui/core/Paper"
import CustomTextField from 'components/CustomTextField/CustomTextField.jsx'
import withStyles from "@material-ui/core/styles/withStyles";
import formStyle from "assets/jss/material-dashboard-react/views/formStyle.jsx"
import FormControl from "@material-ui/core/FormControl"
import Avatar from "./Avatar.jsx"
import CustomSnackbar from "components/Snackbar/CustomSnackbar.jsx"

var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

class ProfileForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changePassword: false,
      removeAvatar: false,

      id: this.props.user._id,
      username: this.props.user.username,
      email: this.props.user.email,
      password: '',
      new_password: '',
      avatar: null // avatar is of File type,

    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChangePassword = this.handleChangePassword.bind(this)
    this.handleRemoveAvatar = this.handleRemoveAvatar.bind(this)
    this.handleChangeAvatar = this.handleChangeAvatar.bind(this)
  }
  handleChange(event){
    this.setState({ [event.target.name]: event.target.value })
  }
  handleChangePassword(event){
    this.setState({ changePassword: !this.state.changePassword })
  }
  handleChangeAvatar(file){
    console.log("avatar changed")
    this.setState({ avatar: file, removeAvatar: false })
  }
  handleRemoveAvatar(){
    this.setState({ avatar: null, removeAvatar: true })
  }
  handleSubmit(event){
    event.preventDefault()
    let form_data = new FormData()
    let user = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    }
    if(this.state.new_password !== ''){
      user.new_password = this.state.new_password
    }
    if(this.state.removeAvatar) {user.avatar = null}
    if(this.state.avatar != null){
      form_data.append('avatar', this.state.avatar)
    }
    form_data.append('user', JSON.stringify(user))
    this.props.updateProfile(this.state.id, form_data)
  }


  validate(){
    if(this.state.username != this.props.user.username ||
      this.state.email != this.props.user.email ||
      this.state.new_password != '' && this.state.password != ''){
        if(this.validateUsername() &&
          this.validateEmail() &&
          this.validatePassword() &&
          this.validateNewPassword()){
            return true
          }
      }
      return false
  }
  validateUsername(){
    console.log("validate username")
    if(this.state.username === '') return false
    return true
  }

  validateEmail(){
    if(this.state.email === '' || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.state.email)) return false
    return true
  }
  emailHelperText(){
    if(this.state.email === '') return "Required"
    if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.state.email)) return "Invalid email address"
    return null
  }

  validatePassword(){
    // if there are changes we need to validate password
    if(this.state.username != this.props.user.username ||
      this.state.email != this.props.user.email ||
      this.state.new_password != ''){
        // something was changed
        if(this.state.password == '' || this.props.updateProfileErrorMessage) return false
      }
    return true
  }
  passwordHelperText(){
    // if there are changes we need to validate password
    if(this.state.username != this.props.user.username ||
      this.state.email != this.props.user.email ||
      this.state.new_password != ''){
        // something was changed
        if(this.state.password == '') return "Required"
      }

    if(this.props.updateProfileErrorMessage){
      return this.props.updateProfileErrorMessage
    }
    return null
  }
  validateNewPassword(){
    // only validate newPassword is changePassword is open
    if(this.state.changePassword &&
      (this.state.new_password === '' ||
      this.state.new_password == this.state.password ||
      !strongRegex.test(this.state.new_password))
    ) return false
    return true
  }
  newPasswordHelperText(){
    let text = ''
    if(this.state.changePassword &&
      this.state.new_password === ''){
        text = "Required"
        return
      }
    if(this.state.changePassword &&
      this.state.new_password == this.state.password){
        text = "Password must be different"
        return
      }
    if(this.state.changePassword){
      let lowercaseAlphaRegex = new RegExp("^(?=.*[a-z])")
      let uppercaseAlphaRegex = new RegExp("^(?=.*[A-Z])")
      let numericRegex = new RegExp("^(?=.*[0-9])")
      let specialRegex = new RegExp("^(?=.*[!@#\$%\^&])")
      let lengthRegex = new RegExp("^(?=.{8,})")
      if(!lowercaseAlphaRegex.test(this.state.new_password)){
        text += "Must contain at least 1 lowercase alphabetic character. "
      }
      if(!uppercaseAlphaRegex.test(this.state.new_password)){
        text += "Must contain at least 1 uppercase alphabetic character. "
      }
      if(!numericRegex.test(this.state.new_password)){
        text += "Must contain at least 1 numeric character. "
      }
      if(!specialRegex.test(this.state.new_password)){
        text += "Must contain at least 1 special character. "
      }
      if(!lengthRegex.test(this.state.new_password)){
        text += "Must be 8 characters or longer. "
      }
      return text
    }
    return null
  }


  render(){
    const { classes } = this.props;
    return(
      <div className={classes.formWrapper}>
        <Paper style={{backgroundColor: "#383838", padding: "10px", marginBottom: "10px"}}>
          <form onSubmit={this.handleSubmit}>
            <div style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "10px",
                marginTop: "10px"
              }}>
              <Avatar
                current={this.props.user.avatar || null}
                onChange={this.handleChangeAvatar}
                onRemove={this.handleRemoveAvatar}/>
            </div>
            <CustomTextField
              labelText="Username"
              inputType="text"
              formControlProps={{classes: { root: classes.formControl}, fullWidth: true}}
              inputProps={{
                name: 'username',
                value: this.state.username,
                onChange: this.handleChange
              }}
              textFieldProps={{
                error: !this.validateUsername(),
                helperText: !this.validateUsername() ? "Required": null
              }}
            />
            <CustomTextField
              labelText="Email"
              inputType="text"
              formControlProps={{classes: { root: classes.formControl}, fullWidth: true}}
              inputProps={{
                name: 'email',
                value: this.state.email,
                onChange: this.handleChange
              }}
              textFieldProps={{
                error: !this.validateEmail(),
                helperText: this.emailHelperText()
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
                onChange: this.handleChange
              }}
              textFieldProps={{
                error: !this.validatePassword(),
                helperText: this.passwordHelperText()
              }}
            />
          {this.state.changePassword && (
            <CustomTextField
              labelText="New Password"
              inputType="password"
              formControlProps={{classes: { root: classes.formControl}, fullWidth: true}}
              inputProps={{
                name: 'new_password',
                type: "password",
                value: this.state.new_password,
                onChange: this.handleChange
              }}
              textFieldProps={{
                error: !this.validateNewPassword(),
                helperText: this.newPasswordHelperText()
              }}
            />
          )}
          <FormControl fullWidth={true}>
            <div style={{display: "flex", width: "100%"}}>
              <div style={{width: "100%"}}></div>
              <div style={{display: "flex"}}>
                {!this.state.changePassword && (
                  <Button
                    style={{boxShadow: "none", width: '140px', height: '50px', backgroundColor: "transparent"}}
                    onClick={this.handleChangePassword}>
                    Change Password?
                  </Button>
                )}
                <Button
                  style={{width: '100px', height: '50px'}}
                  color="primary"
                  type="submit"
                  disabled={!this.validate()}
                  onClick={this.handleSubmit}>
                  Save
                </Button>
              </div>
            </div>
          </FormControl>
          </form>
        </Paper>
        <CustomSnackbar
          color="success"
          message={!this.props.updateProfileSuccessMessage ? "" : this.props.updateProfileSuccessMessage}
          classes={{}}
          place="br"
          open={!this.props.updateProfileSuccessMessage ? false : true}
          onClose={() => this.props.clearUpdateProfile()}
          close
          />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    updateProfileSuccessMessage: state.auth.updateProfileSuccessMessage,
    updateProfileErrorMessage: state.auth.updateProfileErrorMessage,
    user: state.auth.user
  }
}

export default connect(mapStateToProps, { updateProfile, clearUpdateProfile })(withStyles(formStyle)(ProfileForm))
