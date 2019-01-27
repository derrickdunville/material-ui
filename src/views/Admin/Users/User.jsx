import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import withStyles from "@material-ui/core/styles/withStyles"
import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx"
import { withRouter } from "react-router-dom"
import { fetchUser, clearUser } from 'actions'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { NavLink } from 'react-router-dom'
import { Switch, Route, Redirect } from "react-router-dom";

class User extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    console.log("User componentDidMount")
    this.props.fetchUser(this.props.match.params.username)
  }
  componentWillUnmount(){
    this.props.clearUser();
  }

  head(){
    return (
      <Helmet>
        <title>{`User`}</title>
        <meta property="og:title" content="User"/>
      </Helmet>
    )
  }

  render(){
    const { classes, route, ...rest } = this.props;
    const appBar = (
      <AppBar
        position="static"
        color="default"
        style={{backgroundColor: "#454545", color: "#FFFFFF"}}
        className="app-bar-slide2"
        >
        <Toolbar>
          <NavLink exact to={"/admin/users"} style={{color: "#FFF"}}>
            <IconButton color="inherit" aria-label="Menu">
              <ArrowBack />
            </IconButton>
          </NavLink>
          <Typography variant="title" color="inherit">
            {this.props.user.username}
          </Typography>
        </Toolbar>
      </AppBar>
    )
    return (
      <div className={`admin-slide${route.zIndex}`}>
        {this.head()}
        {appBar}
        <div className={classes.route} ref="mainPanel">
          <div className={classes.content}>
            <h5>{this.props.user.username}</h5>
            <h5>{this.props.user.email}</h5>
            <h5>{this.props.user.created_at}</h5>
          </div>
        </div>
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
  console.log("admin/users/user.loadData")
  console.dir(match.params)
  return store.dispatch(fetchUser(match.params.username))
}

export default {
  loadData,
  component: withRouter(connect(mapStateToProps, {fetchUser, clearUser})(withStyles(dashboardStyle)(User)))
}
