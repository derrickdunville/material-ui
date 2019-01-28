import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import withStyles from "@material-ui/core/styles/withStyles"
import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx"
import { withRouter } from "react-router-dom"
import { getUsers } from 'actions/userActions'
import { NavLink } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import Add from '@material-ui/icons/Add'
import Close from '@material-ui/icons/Close'
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
    this.props.getUsers()
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
          {this.state.createUserOpen ? (
            <div className={classes.content}>
              New User
              <IconButton onClick={this.closeNewUser} color="inherit" aria-label="Menu">
                <Close />
              </IconButton>
              <CreateUserForm />
            </div>
          ):(
            <div className={classes.content}>
              {this.props.users.total} Users
              <IconButton onClick={this.openNewUser} color="inherit" aria-label="Menu">
                <Add />
              </IconButton>
              <ul>{this.renderUsers()}</ul>
            </div>
          )}
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
  return store.dispatch(getUsers())
}

export default {
  loadData,
  component: withRouter(connect(mapStateToProps, {getUsers})(withStyles(dashboardStyle)(Users)))
}
