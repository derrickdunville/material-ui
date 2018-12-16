import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'


class Header extends Component {

  render(){
      return (
        <div>
            {this.props.auth ? (
              <ul>
                <li><Link to="/users">Users</Link></li>
                <li><Link to="/admins">Admins</Link></li>
                <li><a href="/api/logout">Logout</a></li>
              </ul>
            ):(
              <ul>
                <li><Link to="/login">Login</Link></li>
              </ul>
            )}
        </div>
      )
  }
}

function mapStateToProps({ auth }){
  return { auth }
}

export default connect(mapStateToProps)(Header)
