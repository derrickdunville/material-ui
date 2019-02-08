import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import withStyles from '@material-ui/core/styles/withStyles'
import dashboardStyle from 'assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx'
import { withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import discord_icon from 'assets/img/discord_icon.png'
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
           height: "60px"
         }}>
        <img style={{width: "50px", height:"50px", marginRight: "10px"}} src={discord_icon}/>
        <div style={{width: "100%"}}>
          {this.props.discordUsername != null ? (
            <div>{this.props.discordUsername}#{this.props.discordDiscriminator}</div>
          ):(
            <div>Not Connected</div>
          )}
        </div>
        <div>
          {this.props.discordUsername != null ? (
            <Button variant="outlined" onClick={this.revokeDiscord}>Remove</Button>
          ):(
            <Button variant="outlined" onClick={this.connectDiscord}>Add</Button>
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
