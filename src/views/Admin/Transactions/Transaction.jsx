import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, Switch, Route, Redirect, withRouter } from "react-router-dom"
import { Helmet } from 'react-helmet'
import { getTransaction, deleteTransaction, clearTransaction } from 'actions/transactionActions'
import EditTransactionForm from './EditTransactionForm.jsx'
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

class Transaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editOpen: false,
      deleteOpen: false
    }
    this.openEdit = this.openEdit.bind(this)
    this.closeEdit = this.closeEdit.bind(this)
    this.openDelete = this.openDelete.bind(this)
    this.closeDelete = this.closeDelete.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }
  openEdit(){
    this.setState({editOpen: true})
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
  componentDidMount(){
    console.log("Transaction componentDidMount")
    this.props.getTransaction(this.props.match.params.transactionname)
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
            {this.props.transaction.transactionname}
          </Typography>
        </Toolbar>
      </AppBar>
    )

    const deleteTransaction = (
      <div>
        Are you sure you want to delete transaction {this.props.transaction.transactionname}?
          <Button onClick={this.handleDelete}>
            Delete
          </Button>
          <Button onClick={this.closeDelete}>
            Cancel
          </Button>
      </div>
    )
    const editTransaction = (
      <div>
        <Button onClick={this.closeEdit}>
          Cancel
        </Button>
        <EditTransactionForm />
      </div>
    )
    return (
      <div className={`admin-slide${route.zIndex}`}>
        {this.head()}
        {appBar}
        <div className={classes.route} ref="mainPanel">
          {(!this.state.deleteOpen && !this.state.editOpen) ? (
            <div className={classes.content}>
              <IconButton onClick={this.openDelete} color="inherit" aria-label="Menu">
                <Delete />
              </IconButton>
              <IconButton onClick={this.openEdit} color="inherit" aria-label="Menu">
                <Edit />
              </IconButton>
              <h5>{this.props.transaction.transactionname}</h5>
              <h5>{this.props.transaction.email}</h5>
              <h5>{this.props.transaction.created_at}</h5>
            </div>
          ):(
            <div>
              {this.state.deleteOpen && (
                <div className={classes.content}>
                  {deleteTransaction}
                </div>
              )}
              {this.state.editOpen && (
                <div className={classes.content}>
                  {editTransaction}
                </div>
              )}
            </div>
          )}
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
  return store.dispatch(getTransaction(match.params.transactionname))
}

export default {
  loadData,
  component: withRouter(connect(mapStateToProps, {getTransaction, clearTransaction, deleteTransaction})(withStyles(dashboardStyle)(Transaction)))
}
