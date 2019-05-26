import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import withStyles from '@material-ui/core/styles/withStyles'
import dashboardStyle from 'assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx'
import { withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import discord_icon from 'assets/img/discord_icon.png'
import Add from '@material-ui/icons/Add'
import Close from '@material-ui/icons/Close'

import { discordOAuthStateLoad, discordOAuthRevoke } from 'actions/authActions'

class Discord extends Component {
  constructor(props) {
    super(props);
    this.connectDiscord = this.connectDiscord.bind(this)
    this.revokeDiscord = this.revokeDiscord.bind(this)
  }

  connectDiscord(){
    this.props.discordOAuthStateLoad()
  }
  revokeDiscord(){
    this.props.discordOAuthRevoke()
  }

  render(){
    return (
      <div style={{
          display: "flex",
          borderRadius: "4px",
           backgroundColor: "#7289da",
           alignItems: "center",
           padding: "10px",
           height: "80px"
         }}>
         <div style={{minWidth: "60px", height: "60px", marginLeft: "-3px", marginRight: '10px'}}>
           <img style={{width: "60px", height:"60px"}} src={discord_icon}/>
        </div>
        <div style={{width: "100%", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}}>
          {this.props.discordUsername != null ? (
            <div>{this.props.discordUsername}#{this.props.discordDiscriminator}</div>
          ):(
            <div>Not Connected</div>
          )}
        </div>
        <div style={{display: "flex", alignItems: "center"}}>
          {this.props.discordUsername != null ? (
            <Close style={{cursor: "pointer"}} onClick={this.revokeDiscord}/>
          ):(
            <Add style={{cursor: "pointer"}}  onClick={this.connectDiscord}/>
          )}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    discordUsername: state.auth.user.discordUsername || null,
    discordDiscriminator: state.auth.user.discordDiscriminator || null
  }
}
export default connect(mapStateToProps, { discordOAuthStateLoad, discordOAuthRevoke })(withStyles(dashboardStyle)(Discord))
