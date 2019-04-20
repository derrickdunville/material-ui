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
import { getActiveMemberships, getAvailableMemberships } from 'utils/UserUtils'
import Stepper from 'components/Stepper/CustomStepper.jsx'
import Step from 'components/Stepper/CustomStep.jsx'
import StepLabel from 'components/Stepper/CustomStepLabel.jsx'
import StepContent from 'components/Stepper/CustomStepContent.jsx'
import Paper from '@material-ui/core/Paper'
import logo from "assets/img/reactlogo.png";
import SubscribeDialog from "components/Dialog/SubscribeDialog.jsx"
import TransactionDialog from 'components/Dialog/TransactionDialog.jsx'

import { loadMemberships } from 'actions'
import {
  toggleCreateSubscriptionOpen,
  toggleCreateTransactionOpen,
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
    this.goToChat = this.goToChat.bind(this)
    this.openTransaction = this.openTransaction.bind(this)
    this.closeTransaction = this.closeTransaction.bind(this)
    this.handleTransaction = this.handleTransaction.bind(this)

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
      this.props.getMyDiscordGuildMember()
    }
  }

  componentWillUnmount(){

  }
  goToChat(){
    let url = `https://discordapp.com/channels/${process.env.DISCORD_GUILD_ID}/${process.env.DISCORD_WELCOME_CHANNEL_ID}`
    window.open(url,'_blank');
  }
  joinServer(){
    this.props.joinDiscordServer()
  }
  closeSubscribe() {
    this.props.toggleCreateSubscriptionOpen()
  }
  openSubscribe(event) {
    console.log("name: ", event.currentTarget.name)
    this.setState({ openMembership: this.getOpenProduct(event.currentTarget.name)}, () =>
    this.props.toggleCreateSubscriptionOpen())
  }
  openTransaction(event) {
    this.setState({ openMembership: this.getOpenProduct(event.currentTarget.name)}, () =>
    this.props.toggleCreateTransactionOpen())
  }
  closeTransaction() {
    this.props.toggleCreateTransactionOpen()
  }
  handleTransaction(){
    console.log("handle transaction")
  }
  getOpenProduct(id){
    console.log("getting open product")
    console.log("memberships: ", this.props.memberships.length)
    for(let i = 0; i < this.props.memberships.length; ++i){
      console.dir(this.props.memberships[i]._id)
      if(this.props.memberships[i]._id == id){
        return this.props.memberships[i]
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
  getActiveStep(){
    let active = 0
    if(this.props.user){
      active = 1
    }
    if(this.props.activeMemberships.length > 0){
      active = 2
    }
    if(this.props.discordUsername){
      active = 3
    }
    if(this.props.discord_guild_member){
      active = 4
    }
    if(this.props.user && this.props.activeMemberships.length == 0){
      active = 1
    }
    return active
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
  renderAccount(){
    return (
      <div>
        {!this.props.user ? (
          <div>
            <Typography style={{color: "white"}}>Go to Sign Up to create an account or Log in to your existing account</Typography>
            <div>
              <div>
                <NavLink to={'/login?from=/chat'}>
                  <Button variant="outlined" color="primary">
                    Login
                  </Button>
                </NavLink>
                <NavLink to={'/sign-up'}>
                  <Button variant="outlined" color="primary">
                    Sign Up
                  </Button>
                </NavLink>
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
    const { classes } = this.props
    return (
      <div>
      {this.props.memberships ? (
        <div>
          {this.props.memberships.length == 0 && (
            <div>Empty</div>
          )}
          {this.props.memberships.map(membership => (
            <div key={membership._id}
              className={classes.membershipContainer}
              >
              <div className={classes.membershipDetails}>
                <div className={classes.membershipIcon}>
                  <img src={logo} style={{width: "60px", height: "60px"}}/>
                </div>
                <div  className={classes.membershipName}>
                  <div style={{fontSize: '18px', fontWeight: '1'}}>
                  {membership.name}
                  </div>
                  <div style={{fontSize: '15px'}}>
                    ${(membership.amount/100).toFixed(2)} {membership.interval}
                  </div>
                </div>
              </div>
              <div className={classes.membershipButtonContainer}>
                {(membership.interval == 'month' || membership.interval == 'year') ? (
                  <Button className={classes.membershipButton} variant="outlined" name={membership._id} color="primary" onClick={this.openSubscribe}>Subscribe</Button>
                ):(
                  <Button className={classes.membershipButton} variant="outlined" name={membership._id} color="primary" onClick={this.openTransaction}>Buy</Button>
                )}
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
    const { classes } = this.props
    return (
      <div>
        {this.props.discord_guild_member && (
          <div style={{padding: "10px", paddingBottom: "0px"}}>
            <div style={{fontSize: "22px", fontWeight: "1"}}>Success!</div>
            <div style={{paddingTop: "10px", paddingBottom: "10px"}}>
              You are currently in the discord server. Head on over there when you are ready to get to chatting with the team.
            </div>
            <div className={classes.membershipContainer}>
              <div className={classes.membershipDetails}>
                <div className={classes.membershipIcon}>
                  <img className={classes.discordAvatar} src={`https://cdn.discordapp.com/avatars/${this.props.discord_guild_member.user.id}/${this.props.discord_guild_member.user.avatar}.png`}/>
                </div>
                <div style={{width: "100%", lineHeight: "1.2", marginRight: "10px"}}>
                  <div>{this.props.discord_guild_member.user.username}#{this.props.discord_guild_member.user.discriminator}</div>
                  <div style={{fontSize: "14px", fontWeight: "1"}}>Joined {parseDate(this.props.discord_guild_member.joined_at)}</div>
                </div>
              </div>
              <div className={classes.membershipButtonContainer}>
                <Button className={classes.membershipButton} color="primary" variant="outlined" onClick={this.goToChat}>Go To Chat</Button>
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
    console.log("has active membership: ", this.props.activeMemberships)
    return (
      <div className={`slide${route.zIndex}`}>
        {this.head()}
        <div className={classes.content}>
          <div style={{marginBottom: "10px"}}>
            {this.renderAboutChat()}
            <Paper style={{backgroundColor: "#383838", padding: "10px", marginBottom: "10px"}}>
              {(!this.props.discord_guild_member || this.props.activeMemberships.length == 0)  ? (
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
        <TransactionDialog
            loading={this.props.auth.creatingTransaction}
            loadingMessage="Processing..."
            successMessage={this.props.auth.createTransactionSuccessMessage}
            errorMessage={this.props.auth.createTransactionErrorMessage}
            product={this.state.openMembership}
            style={{width: "100%"}}
            buttonText="Subscribe"
            buttonColor="primary"
            open={this.props.auth.createTransactionOpen}
            title={`Purchase ${this.state.openMembership.name}`}
            text={`Thank you for purchasing ${this.state.openMembership.name}. You will not be charged until you click "Pay".`}
            leftAction={this.closeTransaction}
            leftActionText="Cancel"
            leftActionColor="default"
            rightAction={this.handleTransaction}
            rightActionText="Pay"
            rightActionColor="primary"
            onClick={this.openTransaction}
            onClose={this.closeTransaction}
            />
      </div>
    )
  }
}


function loadData(store){
  return store.dispatch(getMyDiscordGuildMember()).
    then(()=>store.dispatch(loadMemberships()))
}

function mapStateToProps(state){
  return {
    auth: state.auth,
    user: state.auth.user || false,
    activeMemberships: getActiveMemberships(state.auth.user.transactions || []),
    discord_guild_member: state.auth.discord_guild_member,
    discordUsername: state.auth.user.discordUsername || false,
    discordDiscriminator: state.auth.user.discordDiscriminator || false,
    memberships: getAvailableMemberships(state.app.memberships.docs || [], state.auth.user.transactions || [])
  }
}

export default {
  loadData,
  component: connect(mapStateToProps, {
    getMyDiscordGuildMember,
    joinDiscordServer,
    loadMemberships,
    toggleCreateSubscriptionOpen,
    toggleCreateTransactionOpen
  })(withStyles(chatStyle)(Chat))
}
