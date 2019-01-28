import React, { Component } from 'react'
import { connect } from 'react-redux'
import { putUser } from 'actions/userActions'
import Button from "components/CustomButtons/Button.jsx";
import CustomTextField from 'components/CustomTextField/CustomTextField.jsx'
import withStyles from "@material-ui/core/styles/withStyles";
import formStyle from "assets/jss/material-dashboard-react/views/formStyle.jsx"

class EditUserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.user._id,
      username: this.props.user.username,
      email: this.props.user.email,
      password: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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
  handleSubmit(event){
    event.preventDefault()
    let form_data = new FormData()
    let user = {
      username: this.state.username,
      email: this.state.email,
    }
    if(this.state.password !== ''){
      user.password = this.state.password
    }
    form_data.append('user', JSON.stringify(user))
    this.props.putUser(this.state.id, form_data)
  }

  render(){
    const { classes } = this.props;
    return(
      <div className={classes.formWrapper}>
        <form onSubmit={this.handleSubmit}>
          <CustomTextField
            labelText="Username"
            inputType="text"
            formControlProps={{fullWidth: true}}
            inputProps={{
              name: 'username',
              value: this.state.username,
              onChange: this.handleChange
            }}
          />
          <CustomTextField
            labelText="Email"
            inputType="text"
            formControlProps={{fullWidth: true}}
            inputProps={{
              name: 'email',
              value: this.state.email,
              onChange: this.handleChange
            }}
          />
          <CustomTextField
            labelText="Password"
            inputType="password"
            formControlProps={{fullWidth: true}}
            inputProps={{
              name: 'password',
              type: "password",
              value: this.state.password,
              onChange: this.handleChange
            }}
          />
        <Button
          style={{width: '100px', height: '50px', float: "right"}}
          color="primary"
          type="submit"
          onClick={this.handleSubmit}>
          Save
        </Button>
        </form>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    user: state.users.user,
    puttingUser : state.users.puttingUser,
    puttingUserError: state.users.puttingUserError
  }
}

export default connect(mapStateToProps, { putUser })(withStyles(formStyle)(EditUserForm))
