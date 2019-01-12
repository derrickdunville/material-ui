import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signUpUser, resetAuth } from '../actions/authActions'
import { Helmet } from 'react-helmet'
import { NavLink } from 'react-router-dom'
import Button from "../components/CustomButtons/Button.jsx";
import CustomTextField from '../components/CustomTextField/CustomTextField.jsx'
import withStyles from "@material-ui/core/styles/withStyles";
import authStyle from "../assets/jss/material-dashboard-react/views/authStyle.jsx"
import logo from "../assets/img/reactlogo.png";

class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password:'',
      confirm_password: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentWillUnmount(){
    this.props.resetAuth()
  }
  handleChange(event){
    if (event.target.name === "email"){
      this.setState({ email: event.target.value })
    }
    if (event.target.name === 'username') {
      this.setState({ username: event.target.value })
    }
    if (event.target.name === 'password') {
      this.setState({ password: event.target.value })
    }
    if (event.target.name === 'confirm_password') {
      this.setState({ confirm_password: event.target.value })
    }
  }
  handleSubmit(event){
    event.preventDefault()
    this.props.signUpUser(this.props.history, this.state.email, this.state.username, this.state.password, this.state.confirm_password)
  }

  head(){
    return (
      <Helmet>
        <title>{`Sign Up`}</title>
        <meta property="og:title" content="Sign Up"/>
      </Helmet>
    )
  }
  render(){
    const { classes } = this.props;
    return(
      <div className={classes.authWrapper}>
        <div className={classes.authContainer}>
          <div className={classes.authLeft}>
            <NavLink to="/">
              <img src={logo} className={classes.img} />
            </NavLink>
          </div>
          <div className={classes.authRight}>
          {this.head()}
          <form onSubmit={this.handleSubmit}>
            <CustomTextField
              id="email-input"
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
              id="username-input"
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
              id="password-input"
              labelText="Password"
              inputType="password"
              formControlProps={{fullWidth: true}}
              inputProps={{
                name: 'password',
                value: this.state.password,
                onChange: this.handleChange
              }}
            />
            <CustomTextField
              id="confirm-password-input"
              labelText="Confirm Password"
              inputType="password"
              formControlProps={{fullWidth: true}}
              inputProps={{
                name: 'confirm_password',
                value: this.state.confirm_password,
                onChange: this.handleChange
              }}
            />
            {this.props.auth.error && (
              <div>{this.props.auth.error}</div>
            )}
            <Button style={{width: '100%', height: '50px'}} color="primary" type="submit" onClick={this.handleSubmit}>Sign Up</Button>
          </form>
          <div>
            {`Already have an account? `}
            <NavLink to={'/login'}>
              Login
            </NavLink>
          </div>
        </div>
      </div>
    </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default {
  component: connect(mapStateToProps, { signUpUser, resetAuth })(withStyles(authStyle)(SignUpPage))
}
