import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchUser } from '../../actions'
import { Helmet } from 'react-helmet'
import requireAuth from '../../components/hocs/requireAuth'
import { withRouter } from 'react-router-dom'

class UserPage extends Component {
  componentDidMount(){
     this.props.fetchUser(this.props.match.params.id)
  }
  componentDidUpdate(prevProps){
    if(this.props.match.params.id !== prevProps.match.params.id){
      this.props.fetchUser(this.props.match.params.id)
    }
  }
  renderUser() {
    if(this.props.user){
      return (
        <li key={this.props.user._id}>
          {this.props.user.username}
        </li>
      )
    } else {
      return (
        <div>Hmmm... nothing here</div>
      )
    }
  }
  head(){
    return (
      <Helmet>
        <title>{`${this.props.user.username}`}</title>
        <meta property="og:title" content="User"/>
      </Helmet>
    )
  }
  render(){
    return(
      <div>
        {this.head()}
        Here is a user: {this.props.match.params.id}
        {this.renderUser()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

function loadData(store, match){
  console.log("UserPage.loadData:")
  console.dir(match.params.id)
  return store.dispatch(fetchUser(match.params.id)) // how do i get the route param?
}

export default {
  loadData,
  component: withRouter(connect(mapStateToProps, {fetchUser})(requireAuth(UserPage)))
}
