import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, Switch, Route, Redirect, withRouter } from "react-router-dom"
import { Helmet } from 'react-helmet'
import { getTransaction, deleteTransaction, clearTransaction } from 'actions/transactionActions'
import TransactionForm from './TransactionForm.jsx'
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
import AlertDialog from "components/AlertDialog/AlertDialog.jsx"

class Transaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editOpen: false,
      deleteOpen: false,
      refundOpen: false,
    }
    this.toggleEdit = this.toggleEdit.bind(this)
    this.closeEdit = this.closeEdit.bind(this)
    this.openDelete = this.openDelete.bind(this)
    this.toggleRefund = this.toggleRefund.bind(this)
    this.closeDelete = this.closeDelete.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleRefund = this.handleRefund.bind(this)
  }
  toggleEdit(){
    this.setState({editOpen: !this.state.editOpen})
  }
  closeEdit(){
    this.setState({editOpen: false})
  }
  openDelete(){
    this.setState({deleteOpen: true})
  }
  closeDelete(){
    this.setState({deleteOpen: false})
  }
  handleDelete(){
    this.props.deleteTransaction(this.props.transaction._id)
  }
  toggleRefund(){
    this.setState({refundOpen: !this.state.refundOpen})
  }
  handleRefund(){
    console.log("handle refund")
  }
  componentDidMount(){
    console.log("Transaction componentDidMount")
    this.props.getTransaction(this.props.match.params.id)
  }
  componentWillUnmount(){
    this.props.clearTransaction();
  }

  head(){
    return (
      <Helmet>
        <title>{`Transaction`}</title>
        <meta property="og:title" content="Transaction"/>
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
          <NavLink exact to={"/admin/transactions"} style={{color: "#FFF"}}>
            <IconButton color="inherit" aria-label="Menu">
              <ArrowBack />
            </IconButton>
          </NavLink>
          <Typography variant="title" color="inherit">
            Transaction  >  {this.props.transaction._id}
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
            {this.props.transaction ? (
              <div>
                <div style={{display: "flex", marginBottom: "10px"}}>
                  <Button style={{width: "100%", marginRight: "10px"}} variant="outlined" color="default" onClick={this.toggleEdit}>
                    {this.state.editOpen ? "Cancel" : "Edit"}
                  </Button>
                  <AlertDialog
                    style={{marginRight: "10px", width: "100%"}}
                    buttonText="Refund"
                    buttonColor="default"
                    open={this.state.refundOpen}
                    title="Refund Transaction?"
                    text="Are you sure you would like to refund this transaction? This will result in this transaction being refunded. The user will be notified by email of the refund."
                    leftAction={this.toggleRefund}
                    leftActionText="Cancel"
                    leftActionColor="default"
                    rightAction={this.handleRefund}
                    rightActionText="Refund"
                    rightActionColor="secondary"
                    onClick={this.toggleRefund}
                    onClose={this.toggleRefund}
                    />
                  <AlertDialog
                    style={{width: "100%"}}
                    buttonText="Delete"
                    buttonColor="secondary"
                    open={this.state.deleteOpen}
                    title="Delete Transaction?"
                    text="Are you sure you would like to delete this transaction? This will result in this transaction being end-dated. It will not actually be deleted permenantly but it will no longer appear in the admin dashboard or the users billing history."
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
                  <TransactionForm editing={true} disabled={!this.state.editOpen}/>
                </div>
              </div>
            ):(
              <div>Loading...</div>
            )}
          </div>

        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    transaction: state.transactions.transaction
  }
}

function loadData(store, match){
  console.log("admin/transactions/transaction.loadData")
  console.dir(match.params)
  return store.dispatch(getTransaction(match.params.id))
}

export default {
  loadData,
  component: withRouter(connect(mapStateToProps, {getTransaction, clearTransaction, deleteTransaction})(withStyles(dashboardStyle)(Transaction)))
}
