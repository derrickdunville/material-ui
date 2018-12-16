import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchUsers } from '../actions'
import { Helmet } from 'react-helmet'
import requireAuth from '../components/hocs/requireAuth'

class UsersListPage extends Component {
  componentDidMount(){
    this.props.fetchUsers()
  }

  renderUsers() {
    if(this.props.users.docs){
      return this.props.users.docs.map(user => {
        return (
          <li key={user._id}>
          {user.username}
          </li>
        )
      })
    } else {
      return (
        <div>Hmmm... nothing here</div>
      )
    }
  }

  head(){
    return (
      <Helmet>
        <title>{`${this.props.users.limit} Users Loaded`}</title>
        <meta property="og:title" content="Users App"/>
      </Helmet>
    )
  }
  render(){
    return(
      <div>
        {this.head()}
        Here is a big list of users:
        <ul>{this.renderUsers()}</ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    users: state.users
  }
}

function loadData(store){
  return store.dispatch(fetchUsers())
}

export default {
  loadData,
  component: connect(mapStateToProps, {fetchUsers})(requireAuth(UsersListPage))
}
