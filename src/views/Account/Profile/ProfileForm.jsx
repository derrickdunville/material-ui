import React, { Component } from 'react'
import { connect } from 'react-redux'
import { putUser } from 'actions/userActions'
import Button from "components/CustomButtons/Button.jsx";
import Paper from "@material-ui/core/Paper"
import CustomTextField from 'components/CustomTextField/CustomTextField.jsx'
import withStyles from "@material-ui/core/styles/withStyles";
import formStyle from "assets/jss/material-dashboard-react/views/formStyle.jsx"
import FormControl from "@material-ui/core/FormControl"
import Avatar from "./Avatar.jsx"

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
    this.setState({ removeAvatar: true })
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
    this.props.putUser(this.state.id, form_data)
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
            />
          )}
          <FormControl fullWidth={true}>
            <div style={{width: "100%"}}>
              <Button
                style={{width: '100px', height: '50px', float: "right"}}
                color="primary"
                type="submit"
                onClick={this.handleSubmit}>
                Save
              </Button>
              {!this.state.changePassword && (
                <Button
                  style={{width: '140px', height: '50px', float: "right", backgroundColor: "transparent"}}
                  onClick={this.handleChangePassword}>
                  Change Password?
                </Button>
              )}
            </div>
          </FormControl>
          </form>
        </Paper>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps, { putUser })(withStyles(formStyle)(ProfileForm))
