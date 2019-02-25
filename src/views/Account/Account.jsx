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
import logo from "assets/img/faces/marc.jpg"
import { parseDate } from 'utils/DateUtils'
import AccountBox from '@material-ui/icons/AccountBox'
import AttachMoney from '@material-ui/icons/AttachMoney'
import Power from '@material-ui/icons/Power'
import GetApp from '@material-ui/icons/GetApp'
import Paper from '@material-ui/core/Paper'
import requireAuth from 'components/hocs/requireAuth'

class Account extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this)
  }
  head(){
    return (
      <Helmet key={this.props.location} title={"Account"} meta={[{name: "Account"}]}/>
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
            <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "20px", marginBottom: "20px"}}>
              {this.props.avatar != null ? (
                <div>
                  <img src={`https://s3.amazonaws.com/${this.props.avatar.bucket}/${this.props.avatar.key}`} className={classes.img} style={{width: "150px", height: "150px", borderRadius: "4px"}}/>
                  <div style={{width: "100%", textAlign: "center", fontSize: "24px"}}>{this.props.username}</div>
                  <div style={{width: "100%", textAlign: "center", fontSize: "16px", fontWeight: "1"}}>{parseDate(this.props.created_at)}</div>
                </div>
              ):(
                <div>
                  <img src={logo} className={classes.img} style={{width: "150px", height: "150px", borderRadius: "4px"}}/>
                  <div style={{width: "100%", textAlign: "center", fontSize: "24px"}}>{this.props.username}</div>
                  <div style={{width: "100%", textAlign: "center", fontSize: "16px", fontWeight: "1"}}>{parseDate(this.props.created_at)}</div>
                </div>
              )}
            </div>
            <Paper style={{backgroundColor: "#383838", padding: "10px", marginBottom: "10px"}}>
              <div style={{width: '100%'}}>
                <NavLink style={{width: '100%'}} to={"/account/profile/"}>
                  <div style={{width:"100%", height: "40px", display: "flex", alignItems: "center"}}>
                    <AccountBox style={{marginRight: "10px"}}/> Profile
                  </div>
                </NavLink>
              </div>
              <div style={{width: '100%'}}>
                <NavLink to={"/account/billing/"} style={{width: '100%'}}>
                  <div style={{width:"100%", height: "40px", display: "flex", alignItems: "center"}}>
                    <AttachMoney style={{marginRight: "10px"}}/>Billing
                  </div>
                </NavLink>
              </div>
              <div style={{width: '100%'}}>
                <NavLink to={"/account/connections/"} style={{width: '100%'}}>
                  <div style={{width:"100%", height: "40px", display: "flex", alignItems: "center"}}>
                    <Power style={{marginRight: "10px"}}/> Connections
                  </div>
                </NavLink>
              </div>
              <div style={{width: '100%', marginBottom: "10px"}}>
                <NavLink to={"/account/purchases/"} style={{width: '100%'}}>
                  <div style={{width:"100%", height: "40px", display: "flex", alignItems: "center"}}>
                    <GetApp  style={{marginRight: "10px"}}/> My Purchases
                  </div>
                </NavLink>
              </div>
              <div style={{width: '100%'}}>
                <Button style={{width: "100%", textAlign: "left"}} variant="outlined" color="secondary" onClick={this.logout}>Logout</Button>
              </div>
            </Paper>
          </div>
        </div>
      </div>
    )
  }
}
function mapStateToProps(state){
  return {
    username: state.auth.user.username,
    avatar: state.auth.user.avatar || null,
    created_at: state.auth.user.created_at|| null,
  }
}

export default {
  component: requireAuth(connect(mapStateToProps, {logout})(withRouter(withStyles(dashboardStyle)(Account))))
}
