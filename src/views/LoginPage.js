import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../actions'
import { Helmet } from 'react-helmet'

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password:''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event){
    if (event.target.name === 'username') {
      this.setState({ username: event.target.value });
    }
    if (event.target.name === 'password') {
      this.setState({ password: event.target.value });
    }
  }
  handleSubmit(event){
    event.preventDefault()
    this.props.loginUser(this.props.history, this.state.username, this.state.password)
  }
  login(){

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
    return(
      <div className="container">
        {this.head()}
        <form onSubmit={this.handleSubmit}>
          <input name="username" placeholder="Username" value={this.state.username} onChange={this.handleChange} />
          <input name="password" placeholder="Password" type="password" value={this.state.password} onChange={this.handleChange} />
        <button className="right" onClick={this.handleSubmit}>Login</button>
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

export default {
  component: connect(mapStateToProps, { loginUser })(LoginPage)
}
