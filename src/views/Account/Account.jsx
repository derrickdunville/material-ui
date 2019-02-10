import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import withStyles from "@material-ui/core/styles/withStyles"
import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx"
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ArrowBack from '@material-ui/icons/ArrowBack'
import { NavLink } from 'react-router-dom'
import { withRouter } from "react-router-dom"
import { logout } from "actions/authActions"
import Button from '@material-ui/core/Button'

class Account extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this)
  }
  head(){
    return (
      <Helmet>
        <title>{`Account`}</title>
        <meta property="og:title" content="Account"/>
      </Helmet>
    )
  }

  logout(){
    this.props.logout()
  }
  render(){
    const { classes, route, ...rest } = this.props;
    return (
      <div className={`slide${route.zIndex}`}>
        {this.head()}
        <div className={classes.route} ref="mainPanel">
          <div className={classes.content}>
            Account Details Stuff
            <div style={{width: '100%'}}>
              <NavLink style={{width: '100%'}} to={"/app/account/profile/"}>
                Profile
              </NavLink>
            </div>
            <div style={{width: '100%'}}>
              <NavLink to={"/app/account/billing/"} style={{width: '100%'}}>
                Billing
              </NavLink>
            </div>
            <div style={{width: '100%'}}>
              <NavLink to={"/app/account/connections/"} style={{width: '100%'}}>
                Connections
              </NavLink>
            </div>
            <div style={{width: '100%'}}>
              <NavLink to={"/app/account/purchases/"} style={{width: '100%'}}>
                My Purchases
              </NavLink>
            </div>
            <div style={{width: '100%'}}>
                <Button onClick={this.logout}>Logout</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
function mapStateToProps(state){
  return {}
}

export default {
  component: connect(mapStateToProps, {logout})(withRouter(withStyles(dashboardStyle)(Account)))
}
