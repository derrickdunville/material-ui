import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { loginUser } from '../actions'
import { Helmet } from 'react-helmet'
import { NavLink } from "react-router-dom";
import { resetAuth } from '../actions/authActions'
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
    // this.props.loginUser(this.props.history, this.state.username, this.state.password)
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
              <Button style={{width: '100%', height: '50px'}} color="primary" type="submit" onClick={this.handleSubmit}>Submit</Button>
            </form>
            <div>
              {`Oops... I remember now. `}
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
  component: connect(mapStateToProps, { resetAuth })(withStyles(authStyle)(ForgotPasswordPage))
}
