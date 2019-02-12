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
import SubscribeDialog from "components/Dialog/SubscribeDialog.jsx"

import { loadMemberships } from 'actions'
import {
  toggleCreateSubscriptionOpen,
  cancelSubscription,
  toggleCancelSubscriptionOpen,
  clearCancelSubscription,
  resumeSubscription,
  toggleResumeSubscriptionOpen,
  clearResumeSubscription
} from "actions/authActions"

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openMembership: {},
      cancelMembership: "",
      resumeMembership: "",
      checked: false
    };
    this.getActiveStep = this.getActiveStep.bind(this)
    this.joinServer = this.joinServer.bind(this)
    this.openSubscribe = this.openSubscribe.bind(this)
    this.closeSubscribe = this.closeSubscribe.bind(this)
    this.getOpenProduct = this.getOpenProduct.bind(this)
  }

  componentDidMount(){
    if(!this.props.discord_guild_member){
      this.props.getMyDiscordGuildMember()
    }
    if(!this.props.memberships){
      this.props.loadMemberships()
    }
  }
  componentDidUpdate(prevProps, prevState){
    // tries to get the discord_guild_member after connecting discord account
    // this is an edge case for when a user is currently in the discord server before connecting
    if(!prevProps.discordUsername && this.props.discordUsername != false){
      this.props.getDiscordGuildMember()
    }
  }

  componentWillUnmount(){

  }
  joinServer(){
    this.props.joinDiscordServer()
  }
  closeSubscribe() {
    this.props.toggleCreateSubscriptionOpen()
  }
  openSubscribe(event) {
    console.log("name: ", event.target.name)
    this.setState({ openMembership: this.getOpenProduct(event.target.name)}, () =>
    this.props.toggleCreateSubscriptionOpen())
  }
  getOpenProduct(id){
    console.log("getting open product")
    console.log("memberships: ", this.props.memberships.docs.length)
    for(let i = 0; i < this.props.memberships.docs.length; ++i){
      console.dir(this.props.memberships.docs[i]._id)
      if(this.props.memberships.docs[i]._id == id){
        return this.props.memberships.docs[i]
      }
    }
    return {}
  }
  handleSubscribe(){
    console.log("handle subscribe")
  }

  head(){
    return (
      <Helmet>
        <title>{`Chat`}</title>
        <meta property="og:title" content="Chat"/>
      </Helmet>
    )
  }
  renderAboutChat(){
    return (
      <div>
        <div style={{
            minHeight: "80px",
            display: "flex",
            alignItems: "center",
            padding: "10px",
            backgroundColor: "#7289da",
            borderRadius: "4px",
          }}>
          <div
            style={{
              position: "relative",
              bottom: "-0.12em",
              fontSize: "1.7em",
              letterSpacing: "0.06em",
              fontStyle: "normal",
              fontFamily: "Orbitron",
              verticalAlign: "baseline",
              lineHeight: "42px"
            }}>
            Discord Server Name
          </div>
        </div>
        <div style={{padding: "10px", color: "#d7d7d7"}}>
          We currently use Discord as our chat platform for its extensive customization
          and reliablity. Not familiar with Discord? That's, ok it's very simple to use and
          easy to learn. Take a minute to go check it out and create an account if you don't
          have one yet.
        </div>

      </div>
    )
  }
  getActiveStep(){
    let active = 0
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
    if(this.props.activeMembership == false){
      active = 1
    }
    return active
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
  renderMemberships(){
    return (
      <div>
      {this.props.memberships ? (
        <div>
          {this.props.memberships.docs.length == 0 && (
            <div>Empty</div>
          )}
          {this.props.memberships.docs.map(membership => (
            <div key={membership._id}
              style={{
                display: "flex",
                height: "80px",
                alignItems: "center",
                backgroundColor: "#202225",
                marginBottom: "10px",
                borderRadius: "4px",
                paddingLeft: "10px",
                paddingRight: "10px"
              }}>
              <div style={{
                  height: "60px",
                  width: "60px",
                  marginRight: "10px"
                }}>
                <img src={logo} style={{width: "60px", height: "60px"}}/>
              </div>
              <div style={{width: "100%"}}>
                <div style={{fontSize: '18px', fontWeight: '1'}}>
                {membership.name}
                </div>
                <div style={{fontSize: '15px'}}>
                  ${(membership.amount/100).toFixed(2)} {membership.interval}
                </div>
              </div>
              <div>
                <Button variant="outlined" name={membership._id} color="primary" onClick={this.openSubscribe}>Subscribe</Button>
              </div>
            </div>
          ))}
        </div>
      ):(<div></div>)}
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
          <div style={{padding: "10px"}}>
            <div style={{fontSize: "22px", fontWeight: "1"}}>Success!</div>
            <div style={{paddingTop: "10px", paddingBottom: "10px"}}>
              You are currently in the discord server. Head on over there when you are ready to get to chatting with the team.
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

  render(){
    const { classes, title, route, ...rest } = this.props;
    console.log("render chat")
    console.log("has active membership: ", this.props.activeMembership)
    return (
      <div className={`slide${route.zIndex}`}>
        {this.head()}
        <div className={classes.content}>
          <div style={{marginBottom: "10px"}}>
            {this.renderAboutChat()}
            <Paper style={{backgroundColor: "#383838", padding: "10px", marginBottom: "10px"}}>
              {(!this.props.discord_guild_member || !this.props.activeMembership)  ? (
                <div style={{padding: "10px"}}>
                  <div style={{fontSize: "22px", fontWeight: "1"}}>Join Our Discord</div>
                  <div style={{paddingTop: "10px", paddingBottom: "10px"}}>
                    Before you can join our Discord server there are a few things we need you to do.
                  </div>
                  <Stepper activeStep={this.getActiveStep()} orientation="vertical">
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
                        <div>
                          {this.renderJoinServer()}
                        </div>
                      </StepContent>
                    </Step>
                  </Stepper>
                </div>
              ):(
                <div>
                  {this.renderGuildMemberhsip()}
                </div>
              )}
            </Paper>
          </div>
        </div>
        <SubscribeDialog
          loading={this.props.auth.creatingSubscription}
          loadingMessage="Subscribing"
          successMessage={this.props.auth.createSubscriptionSuccessMessage}
          product={this.state.openMembership}
          style={{width: "100%"}}
          buttonText="Subscribe"
          buttonColor="primary"
          open={this.props.auth.createSubscriptionOpen}
          title={`Subscribe to ${this.state.openMembership.name}`}
          text={`Thank you for subscribing to ${this.state.openMembership.name}. You will not be charged until you click "Pay".`}
          leftAction={this.closeSubscribe}
          leftActionText="Cancel"
          leftActionColor="default"
          rightAction={this.handleSubscribe}
          rightActionText="Pay"
          rightActionColor="primary"
          onClick={this.openSubscribe}
          onClose={this.closeSubscribe}
          />
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
    auth: state.auth,
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
  component: connect(mapStateToProps, {
    getMyDiscordGuildMember,
    joinDiscordServer,
    loadMemberships,
    toggleCreateSubscriptionOpen,
    cancelSubscription,
    toggleCancelSubscriptionOpen,
    clearCancelSubscription,
    resumeSubscription,
    toggleResumeSubscriptionOpen,
    clearResumeSubscription
  })(withStyles(chatStyle)(Chat))
}
