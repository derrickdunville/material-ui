import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, Switch, Route, Redirect, withRouter } from "react-router-dom"
import { Helmet } from 'react-helmet'
import { getUser, deleteUser, clearUser, toggleEditOpen, clearPostUser } from 'actions/userActions'
import UserForm from './UserForm.jsx'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import MenuIcon from '@material-ui/icons/Menu'
import ArrowBack from '@material-ui/icons/ArrowBack'
import Delete from '@material-ui/icons/Delete'
import Edit from '@material-ui/icons/Edit'
import withStyles from "@material-ui/core/styles/withStyles"
import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx"
import AlertDialog from "components/Dialog/AlertDialog.jsx"
import CustomSnackbar from "components/Snackbar/CustomSnackbar.jsx"

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editOpen: false,
      deleteOpen: false
    }
    this.toggleEdit = this.toggleEdit.bind(this)
    this.openDelete = this.openDelete.bind(this)
    this.closeDelete = this.closeDelete.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }
  toggleEdit(){
    this.props.toggleEditOpen()
  }
  openDelete(){
    this.setState({deleteOpen: true})
  }
  closeDelete(){
    this.setState({deleteOpen: false})
  }
  handleDelete(){
    this.props.deleteUser(this.props.history, this.props.user._id)
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
              <div style={{display: "flex", marginBottom: "10px"}}>
                <Button style={{width: "100%", marginRight: "10px"}} variant="outlined" color="default" onClick={this.toggleEdit}>
                  {this.props.editOpen ? "Cancel" : "Edit"}
                </Button>
                <AlertDialog
                  style={{width: "100%"}}
                  buttonText="Delete"
                  buttonColor="secondary"
                  loading={this.props.deletingUser}
                  loadingMessage={"Deleting User..."}
                  successMessage={this.props.deleteUserSuccessMessage}
                  errorMessage={this.props.deleteUserErrorMessage}
                  open={this.state.deleteOpen}
                  title={`Delete ${this.props.user.username}?`}
                  text="Are you sure you would like to delete this user? This will result in this user being end-dated. It will not actually be deleted permenantly but it will be masked and all associated records will also be end-dated. This action cannot be undone."
                  leftAction={this.closeDelete}
                  leftActionText="Cancel"
                  leftActionColor="default"
                  rightAction={this.handleDelete}
                  rightActionText="Delete"
                  rightActionColor="secondary"
                  onClick={this.openDelete}
                  onClose={this.closeDelete}
                  />
              </div>
              <div>
                <UserForm editing={true} disabled={!this.props.editOpen} user={this.props.user}/>
              </div>
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
    editOpen: state.users.editOpen,
    deletingUser: state.users.deletingUser,
    deleteUserErrorMessage: state.users.deleteUserErrorMessage,
    deleteUserSuccessMessage: state.users.deleteUserSuccessMessage,
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
      deleteUser,
      toggleEditOpen,
      clearPostUser
    }
  )(withStyles(dashboardStyle)(User)))
}
