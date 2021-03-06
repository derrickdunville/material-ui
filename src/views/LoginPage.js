import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { loginUser, resetAuth } from '../actions/authActions'
import { Helmet } from 'react-helmet'
import { NavLink } from "react-router-dom";
import Button from "../components/CustomButtons/Button.jsx";
import CustomTextField from '../components/CustomTextField/CustomTextField.jsx'
import withStyles from "@material-ui/core/styles/withStyles";
import authStyle from "../assets/jss/material-dashboard-react/views/authStyle.jsx"
import logo from "../assets/img/reactlogo.png";
import queryString from 'query-string'

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username:'',
      password:''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.username = React.createRef()
  }
  handleChange(event){
    if (event.target.name === 'username') {
      this.setState({ username: event.target.value });
      console.log(this.username)
    }
    if (event.target.name === 'password') {
      this.setState({ password: event.target.value });
      console.log("password updated: ", event.target.value)
    }
  }
  handleSubmit(event){
    event.preventDefault()
    const userCameFrom = queryString.parse(this.props.location.search).from
    console.log("user came from: ", userCameFrom)
    this.props.loginUser(this.props.history, userCameFrom || "/", this.state.username, this.state.password)
  }
  componentWillMount(){
    console.log("will mount")
    console.log(this.username.current)
  }
  componentWillUnmount(){
    this.props.resetAuth()
  }
  componentDidMount(){
    console.log("did mount")
    console.dir(this.props.location.search)
  }

  head(){
    return (
      <Helmet>
        <title>{`Login`}</title>
        <meta property="og:title" content="Login"/>
      </Helmet>
    )
  }
  render(){
    const { classes } = this.props;
    return(
      <div className={classes.authWrapper}>
        <div className={classes.authContainer}>
          <div className={classes.authLeft}>
            <NavLink exact to="/">
              <img src={logo} className={classes.img} />
            </NavLink>
          </div>
          <div className={classes.authRight}>
            {this.head()}
            <form onSubmit={this.handleSubmit}>
              <div style={{marginBottom: "10px"}}>
                <CustomTextField
                  id="outlined-username-input"
                  labelText="Username"
                  inputType="text"
                  formControlProps={{fullWidth: true}}
                  inputRef={this.username}
                  inputProps={{
                    name: 'username',
                    value: this.state.username,
                    onChange: this.handleChange
                  }}
                />
              </div>
              <div style={{marginBottom: "10px"}}>
                <CustomTextField
                  id="outlined-password-input"
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
              </div>
              {this.props.auth.error && (
                <div>{this.props.auth.error}</div>
              )}
              <NavLink to={'/forgot-password'}>Forget password?</NavLink>
            <br/>
            <Button style={{width: '100%', height: '50px'}} color="primary" type="submit" onClick={this.handleSubmit}>Log In</Button>
            </form>
            <div>
              {`Don't have an account? `}
              <NavLink to={'/sign-up'}>
                Sign Up
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
    auth: state.auth,
    users: state.users
  }
}

export default {
  component: connect(mapStateToProps, { loginUser, resetAuth })(withStyles(authStyle)(LoginPage))
}
