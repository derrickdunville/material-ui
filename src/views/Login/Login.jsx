import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { loginUser } from '../actions'
import { Helmet } from 'react-helmet'
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";

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
    // this.props.loginUser(this.props.history, this.state.username, this.state.password)
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
        <GridContainer>
          <GridItem>Login</GridItem>
        </GridContainer>
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
  component: LoginPage
}
// export default {
//   component: connect(mapStateToProps, { loginUser })(LoginPage)
// }
