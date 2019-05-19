import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from "react-router-dom"
import { Helmet } from 'react-helmet'
import { getUser, clearUser, clearPostUser } from 'actions/userActions'
import UserReduxForm from './UserReduxForm.jsx'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import ArrowBack from '@material-ui/icons/ArrowBack'
import withStyles from "@material-ui/core/styles/withStyles"
import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx"
import CustomSnackbar from "components/Snackbar/CustomSnackbar.jsx"

class User extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    console.log("User componentDidMount")
    this.props.getUser(this.props.match.params.username)
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
          {this.props.user ? (
            <div className={classes.content}>
              <UserReduxForm editing={true} user={this.props.user}/>
            </div>
          ):(
            <div> Loading ...</div>
          )}
          <CustomSnackbar
            color="success"
            message={!this.props.postUserSuccessMessage ? "" : this.props.postUserSuccessMessage}
            classes={{}}
            place="br"
            open={!this.props.postUserSuccessMessage ? false : true}
            onClose={() => this.props.clearPostUser()}
            close
            />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.users.user,
    postUserSuccessMessage: state.users.postUserSuccessMessage
  }
}

function loadData(store, match){
  console.log("admin/users/user.loadData")
  console.dir(match.params)
  return store.dispatch(getUser(match.params.username))
}

export default {
  loadData,
  component: withRouter(connect(mapStateToProps,
    {
      getUser,
      clearUser,
      clearPostUser
    }
  )(withStyles(dashboardStyle)(User)))
}
