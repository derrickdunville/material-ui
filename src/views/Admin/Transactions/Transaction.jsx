import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, Switch, Route, Redirect, withRouter } from "react-router-dom"
import { Helmet } from 'react-helmet'
import { getTransaction, clearTransaction } from 'actions/transactionActions'
import TransactionReduxForm from './TransactionReduxForm.jsx'
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
import RefundDialog from "components/Dialog/RefundDialog.jsx"

class Transaction extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    console.log("Transaction componentDidMount")
    if(!this.props.transaction){
      this.props.getTransaction(this.props.match.params.id)
    }
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
    console.log("render transaction")
    const { transaction, classes, route, ...rest } = this.props;
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
            Transaction  >  {transaction._id}
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
            {transaction ? (
              <TransactionReduxForm transaction={this.props.transaction} editing={true}/>
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
  component: withRouter(connect(mapStateToProps,
    {
      getTransaction,
      clearTransaction
    }
  )(withStyles(dashboardStyle)(Transaction)))
}
