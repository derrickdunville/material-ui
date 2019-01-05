import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchUsers } from '../actions'
import { Helmet } from 'react-helmet'
import requireAuth from '../components/hocs/requireAuth'
import { renderRoutes } from 'react-router-config'
import { NavLink } from 'react-router-dom'

class UsersListPage extends Component {
  componentDidMount(){
    this.props.fetchUsers()
  }

  renderUsers() {
    if(this.props.users.docs){
      return this.props.users.docs.map(user => {
        return (
          <NavLink
            to={`/users/${user.username}`}
            key={user._id}
            >
            <li>
            {user.username}
            </li>
          </NavLink>
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
    console.dir(this.props.route.routes)
    return(
      <div>
        {this.head()}
        Here is a big list of users:
        <ul>{this.renderUsers()}</ul>
        <div>{renderRoutes(this.props.route.routes)}</div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    users: state.users
  }
}

function loadData(store, match){
  console.log("UserListPage.loadData")
  console.dir(match.params)
  return store.dispatch(fetchUsers())
}

export default {
  loadData,
  component: connect(mapStateToProps, {fetchUsers})(requireAuth(UsersListPage))
}
