import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import withStyles from '@material-ui/core/styles/withStyles'
import chatStyle from 'assets/jss/material-dashboard-react/views/chatStyle.jsx'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ArrowBack from '@material-ui/icons/ArrowBack'
import { NavLink } from 'react-router-dom'
import { withRouter } from "react-router-dom"
import { getProducts, clearProducts } from 'actions/productActions'
import { getMyDiscordGuildMember, joinDiscordServer } from 'actions/authActions'
import Discord from 'views/Account/Connections/Discord.jsx'
import Button from '@material-ui/core/Button'
import { parseDate } from 'utils/DateUtils'

import Stepper from 'components/Stepper/CustomStepper.jsx'
import Step from 'components/Stepper/CustomStep.jsx'
import StepLabel from 'components/Stepper/CustomStepLabel.jsx'
import StepContent from 'components/Stepper/CustomStepContent.jsx'
import Paper from '@material-ui/core/Paper'
import logo from "assets/img/reactlogo.png";

import { loadMemberships } from 'actions'
class Chat extends Component {
  constructor(props) {
    super(props);
    this.getActiveStep = this.getActiveStep.bind(this)
    this.joinServer = this.joinServer.bind(this)
  }

  componentDidMount(){
    if(!this.props.discord_guild_member){
      this.props.getMyDiscordGuildMember()
    }
    if(!this.props.memberships){
      this.props.loadMemberships()
    }
  }

  componentWillUnmount(){

  }
  joinServer(){
    this.props.joinDiscordServer()
  }

  head(){
    return (
      <Helmet>
        <title>{`Chat`}</title>
        <meta property="og:title" content="Chat"/>
      </Helmet>
    )
  }
  renderAccount(){
    return (
      <div>
        {!this.props.user ? (
          <div>
            <Typography style={{color: "white"}}>Create an account with us</Typography>
            <div>
              <div>
                <Button variant="outlined" color="primary">
                  Login
                </Button>
                <Button variant="outlined" color="primary">
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        ):(
          <div>
            <Typography style={{color: "white"}}>Great, you are logged in!</Typography>
            <div style={{display:"flex", borderRadius: "4px", backgroundColor: "#202225", padding: "10px", alignItems: "center"}}>
              <div style={{width: "60px", height: "60px", minWidth: "60px", marginRight: '10px', borderRadius: "4px"}}>
                {this.props.user.avatar != null ? (
                  <img src={`https://s3.amazonaws.com/${this.props.user.avatar.bucket}/${this.props.user.avatar.key}`}  style={{width: "60px", height: "60px", borderRadius: "4px"}}/>
                ):(
                  <img src={logo} style={{width: "60px", height: "60px", borderRadius: "4px"}}/>
                )}
              </div>
              <div style={{width: "100%"}}>
                {this.props.user.username}
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
  renderDiscordOAuth(){
    return (
      <div>
        <Discord />
      </div>
    )
  }
  renderAboutChat(){
    return (
      <div>
        <div style={{
            fontSize: "36px",
            height: "80px",
            display: "flex",
            alignItems: "center",
            padding: "10px",
            backgroundColor: "#7289da",
            borderRadius: "4px"
          }}>
          Discord Server Name
        </div>
        <div style={{padding: "10px"}}>
          We currently use Discord as our chat platform for its extensive customization
          and reliablity. Not familiar with Discord? That's, ok it's very simple to use and
          easy to learn. Take a minute to go check it out and create an account if you don't
          have one yet.
        </div>
        <div style={{padding: "10px", paddingBottom: "20px"}}>
          Before you can join our Discord server there are a few things we need you to do.
        </div>
      </div>
    )
  }
  renderMemberships(){
    return (
      <div>
        Looks like we need to list the membership options here. Im thinking we should
         make the membership options have their own reducer, instead of using the
         products reducer to load them. There is likely only going to be 2-3 active
         membership options available at a time. This would help with not having to reload them.
      </div>
    )
  }
  renderJoinServer(){
    return (
      <div>
        {this.props.discordUsername && (
          <div style={{display:"flex", alignItems: "center", borderRadius: "4px", backgroundColor: "#202225", padding: "10px"}}>
            <div style={{wdith: "50px", height: "50px", minWidth: "50px", marginRight: '10px'}}>
            </div>
            <div style={{width: "100%", lineHeight: "1.2", marginRight: "10px"}}>
              <div>{this.props.discordUsername}#{this.props.discordDiscriminator}</div>
            </div>
            <div style={{minWidth: "122px"}}>
              <Button onClick={this.joinServer} variant="outlined" color="primary">
                Join Server
              </Button>
            </div>
          </div>
        )}
      </div>
    )
  }
  renderGuildMemberhsip(){
    return (
      <div>
        {this.props.discord_guild_member && (
          <div>
            <div>Success!</div>
            <div>
              You are currently in the server.
            </div>
            <div style={{display:"flex", alignItems: "center", borderRadius: "4px", backgroundColor: "#202225", padding: "10px"}}>
              <div style={{wdith: "50px", height: "50px", minWidth: "50px", marginRight: '10px'}}>
              </div>
              <div style={{width: "100%", lineHeight: "1.2", marginRight: "10px"}}>
                <div>{this.props.discord_guild_member.user.username}#{this.props.discord_guild_member.user.discriminator}</div>
                <div style={{fontSize: "14px", fontWeight: "1"}}>Joined {parseDate(this.props.discord_guild_member.joined_at)}</div>
              </div>
              <div style={{minWidth: "120px"}}>
                <Button variant="outlined" color="primary">
                  Go To Chat
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
  getActiveStep(){
    let active = 0;
    if(this.props.user){
      active = 1
    }
    if(this.props.activeMembership){
      active = 2
    }
    if(this.props.discordUsername){
      active = 3
    }
    if(this.props.discord_guild_member){
      active = 4
    }
    console.log("active step: " + active)
    return active
  }
  render(){
    const { classes, title, route, ...rest } = this.props;
    console.log("render Scripts")
    return (
      <div className={`slide${route.zIndex}`}>
        {this.head()}
        <div className={classes.content}>
          {this.renderAboutChat()}
          <Stepper classes={{root: classes.stepperRoot}} activeStep={this.getActiveStep()} orientation="vertical">
            <Step key={0}>
              <StepLabel disabled={this.getActiveStep() < 1}>
                Create An Account
              </StepLabel>
              <StepContent>
                {this.renderAccount()}
              </StepContent>
            </Step>
            <Step key={1}>
              <StepLabel disabled={this.getActiveStep() < 2}>
                Start A Membership
              </StepLabel>
              <StepContent>
                <Typography style={{color: "white"}}>Start a membership.</Typography>
                <div>
                  {this.renderMemberships()}
                </div>
              </StepContent>
            </Step>
            <Step key={2}>
              <StepLabel disabled={this.getActiveStep() < 3}>
                Connect Your Discord
              </StepLabel>
              <StepContent>
                <Typography style={{color: "white"}}>
                  Now we'll need you to connect your Discord account with our application.
                </Typography>
                <div>
                  {this.renderDiscordOAuth()}
                </div>
              </StepContent>
            </Step>
            <Step key={3}>
              <StepLabel disabled={this.getActiveStep() < 4}>
                Join The Server
              </StepLabel>
              <StepContent>
                <Typography style={{color: "white"}}>Your so close! All thats left to do is join the server.</Typography>
                <div>
                  {this.renderJoinServer()}
                </div>
              </StepContent>
            </Step>
          </Stepper>
          {this.renderGuildMemberhsip()}
        </div>
      </div>
    )
  }
}

function getActiveMembership(transactions){
  for(let i = 0; i < transactions.length; ++i){
    let transaction = transactions[i]
    if(transaction.product.category == 'membership' && transaction.status == 'succeeded'){
      console.dir(transaction)
      if(transaction.expires_at == null){
        return transaction
      } else {
        //check the expiration date
        let expires = new Date(transaction.expires_at)
        console.log("expires at: ", expires)
        let now = new Date()
        console.log("now: ", now)
        if(expires > now){
          console.log("not expired")
          return transaction
        } else {
          console.log("expired")
        }
      }
    }
  }
  return false
}
function loadData(store){
  return store.dispatch(getMyDiscordGuildMember()).
    then(()=>store.dispatch(loadMemberships()))
}
function mapStateToProps(state){
  return {
    user: state.auth.user || false,
    activeMembership: getActiveMembership(state.auth.user.transactions || []),
    discord_guild_member: state.auth.discord_guild_member,
    discordUsername: state.auth.user.discordUsername || false,
    discordDiscriminator: state.auth.user.discordDiscriminator || false,
    memberships: state.app.memberships || false
  }
}

export default {
  loadData,
  component: connect(mapStateToProps, {getMyDiscordGuildMember, joinDiscordServer, loadMemberships})(withStyles(chatStyle)(Chat))
}
