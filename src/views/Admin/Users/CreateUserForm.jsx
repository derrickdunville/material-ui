import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postUser } from 'actions/userActions'
import Button from "components/CustomButtons/Button.jsx";
import CustomTextField from 'components/CustomTextField/CustomTextField.jsx'
import withStyles from "@material-ui/core/styles/withStyles";
import formStyle from "assets/jss/material-dashboard-react/views/formStyle.jsx"

class CreateUserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username:'',
      email:'',
      password:'',
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
    let user = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    }
    this.props.postUser(user)
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
          Create
        </Button>
        </form>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps, { postUser })(withStyles(formStyle)(CreateUserForm))
