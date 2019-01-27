import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import withStyles from "@material-ui/core/styles/withStyles"
import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx"
import { withRouter } from "react-router-dom"
import { fetchUsers } from 'actions'
import { NavLink } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import Add from '@material-ui/icons/Add'
import CreateUserForm from './CreateUserForm.jsx'
import FormControl from "@material-ui/core/FormControl";
import TextField from
"@material-ui/core/TextField"

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createUserOpen: false
    }
    this.openNewUser = this.openNewUser.bind(this)
    this.closeNewUser = this.closeNewUser.bind(this)
  }
  openNewUser(){
    this.setState({createUserOpen: true})
  }
  closeNewUser(){
    this.setState({createUserOpen: false})
  }

  componentDidMount(){
    this.props.fetchUsers()
  }
  head(){
    return (
      <Helmet>
        <title>{`Users`}</title>
        <meta property="og:title" content="Users"/>
      </Helmet>
    )
  }
  renderUsers() {
    if(this.props.users.docs){
      return this.props.users.docs.map(user => {
        return (
          <NavLink
            to={`/admin/users/${user.username}`}
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

  render(){
    const { classes, route, ...rest } = this.props;
    return (
      <div className={`slide${route.zIndex}`}>
        {this.head()}
        <div className={classes.route} ref="mainPanel">
          <div className={classes.content}>
            Users
            <IconButton onClick={this.openNewUser} color="inherit" aria-label="Menu">
              <Add />
            </IconButton>
            {this.state.createUserOpen ? (
              <CreateUserForm />
            ):(
              <ul>{this.renderUsers()}</ul>
            )}
          </div>
        </div>
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
  console.log("Admin/Users.loadData")
  console.dir(match.params)
  return store.dispatch(fetchUsers())
}

export default {
  loadData,
  component: withRouter(connect(mapStateToProps, {fetchUsers})(withStyles(dashboardStyle)(Users)))
}
