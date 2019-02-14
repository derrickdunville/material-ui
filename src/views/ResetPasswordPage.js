import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { loginUser } from '../actions'
import { Helmet } from 'react-helmet'
import { NavLink } from "react-router-dom";
import { verifyPasswordResetToken, resetPassword, resetAuth } from '../actions/authActions'
import Button from "../components/CustomButtons/Button.jsx";
import CustomTextField from '../components/CustomTextField/CustomTextField.jsx'
import withStyles from "@material-ui/core/styles/withStyles";
import authStyle from "../assets/jss/material-dashboard-react/views/authStyle.jsx"
import logo from "../assets/img/reactlogo.png";

class ResetPasswordPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      new_password: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentWillUnmount(){
    this.props.resetAuth()
  }
  handleChange(event){
    if (event.target.name === 'new_password') {
      this.setState({ new_password: event.target.value });
    }
  }
  handleSubmit(event){
    event.preventDefault()
    this.props.resetPassword(this.props.match.params.reset_token, this.state.new_password)
  }
  head(){
    return (
      <Helmet>
        <title>{`Reset Password`}</title>
        <meta property="og:title" content="Reset Password"/>
      </Helmet>
    )
  }
  render(){
    const { classes } = this.props;
    return(
      <div className="container">
        {this.head()}
        <div className={classes.authWrapper}>
          <div className={classes.authContainer}>
            <div className={classes.authLeft}>
              <NavLink exact to="/">
                <img src={logo} className={classes.img} />
              </NavLink>
            </div>
            {this.props.auth.validResetToken ? (
              this.props.auth.message ? (
                <div className={classes.authRight}>
                  {this.props.auth.message && (
                    <div>{this.props.auth.message}</div>
                  )}
                  <NavLink to={'/login'}>
                    Login
                  </NavLink>
                </div>
              ):(
                <div className={classes.authRight}>
                  <form onSubmit={this.handleSubmit}>
                    <div style={{marginBottom: "10px"}}>
                      <CustomTextField
                        id="new-password-input"
                        labelText="New Password"
                        inputType="password"
                        formControlProps={{fullWidth: true}}
                        inputProps={{
                          name: 'new_password',
                          value: this.state.new_password,
                          onChange: this.handleChange
                        }}
                      />
                    </div>
                    <Button style={{width: '100%', height: '50px'}} color="primary" type="submit" onClick={this.handleSubmit}>Submit</Button>
                  </form>
                </div>
              )
            ):(
              <div className={classes.authRight}>
                {this.props.auth.error && (
                  <div>Sorry, but your password reset token is invalid or expired.</div>
                )}
                <NavLink to={'/forgot-password'}>
                  Please, try again
                </NavLink>
              </div>
            )}
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
function loadData(store, match){
  console.log("ResetPasswordPage.loadData:")
  console.dir(match.params.reset_token)
  return store.dispatch(verifyPasswordResetToken(match.params.reset_token)) // how do i get the route param?
}

export default {
  loadData,
  component: connect(mapStateToProps, { verifyPasswordResetToken, resetPassword, resetAuth })(withStyles(authStyle)(ResetPasswordPage))
}
