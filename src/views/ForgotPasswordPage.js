import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { loginUser } from '../actions'
import { Helmet } from 'react-helmet'
import { NavLink } from "react-router-dom";
import { forgotPassword, resetAuth } from '../actions/authActions'
import Button from "../components/CustomButtons/Button.jsx";
import CustomTextField from '../components/CustomTextField/CustomTextField.jsx'
import withStyles from "@material-ui/core/styles/withStyles";
import authStyle from "../assets/jss/material-dashboard-react/views/authStyle.jsx"
import logo from "../assets/img/reactlogo.png";

class ForgotPasswordPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentWillUnmount(){
    this.props.resetAuth()
  }
  handleChange(event){
    if (event.target.name === 'email') {
      this.setState({ email: event.target.value });
    }
  }
  handleSubmit(event){
    event.preventDefault()
    this.props.forgotPassword(this.state.email)
  }
  head(){
    return (
      <Helmet>
        <title>{`Forgot Password`}</title>
        <meta property="og:title" content="Forgot Password"/>
      </Helmet>
    )
  }
  render(){
    const { classes } = this.props;
    return(
      <div className={classes.authWrapper}>
        {this.head()}
        <div className={classes.authContainer}>
          <div className={classes.authLeft}>
            <NavLink exact to="/">
              <img src={logo} className={classes.img} />
            </NavLink>
          </div>
          {this.props.auth.message ? (
            <div className={classes.authRight}>
                {this.props.auth.message && (
                  <div>{this.props.auth.message}</div>
                )}
                <div>
                  {`Check your inbox `}
                  <a href={`http://${this.state.email.replace(/.*@/, "")}`}>
                    {this.state.email.replace(/.*@/, "")}
                  </a>
                </div>
            </div>
          ):(
            <div className={classes.authRight}>
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
                {this.props.auth.error && (
                  <div>{this.props.auth.error}</div>
                )}
                {this.props.auth.message && (
                  <div>{this.props.auth.message}</div>
                )}
                <Button style={{width: '100%', height: '50px'}} color="primary" type="submit" onClick={this.handleSubmit}>Submit</Button>
              </form>
              <div>
                {`Oops... I remember now. `}
                <NavLink to={'/login'}>
                  Login
                </NavLink>
              </div>
            </div>
          )}
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
  component: connect(mapStateToProps, { forgotPassword, resetAuth })(withStyles(authStyle)(ForgotPasswordPage))
}
