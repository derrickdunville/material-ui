import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import withStyles from "@material-ui/core/styles/withStyles"
import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx"
import { withRouter } from "react-router-dom"
import { getTransactions } from 'actions/transactionActions'
import { NavLink } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import Add from '@material-ui/icons/Add'
import Close from '@material-ui/icons/Close'
import CreateTransactionForm from './CreateTransactionForm.jsx'
import FormControl from "@material-ui/core/FormControl";
import TextField from
"@material-ui/core/TextField"

class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createTransactionOpen: false
    }
    this.openNewTransaction = this.openNewTransaction.bind(this)
    this.closeNewTransaction = this.closeNewTransaction.bind(this)
  }
  openNewTransaction(){
    this.setState({createTransactionOpen: true})
  }
  closeNewTransaction(){
    this.setState({createTransactionOpen: false})
  }

  componentDidMount(){
    this.props.getTransactions()
  }
  head(){
    return (
      <Helmet>
        <title>{`Transactions`}</title>
        <meta property="og:title" content="Transactions"/>
      </Helmet>
    )
  }
  renderTransactions() {
    if(this.props.transactions.docs){
      return this.props.transactions.docs.map(transaction => {
        return (
          <NavLink
            to={`/admin/transactions/${transaction.transactionname}`}
            key={transaction._id}
            >
            <li>
            {transaction.transactionname}
            </li>
          </NavLink>
        )
      })
    } else {
      return (
        <div>Hmmm... nothing here</div>
      )
    }
  }

  render(){
    const { classes, route, ...rest } = this.props;
    return (
      <div className={`slide${route.zIndex}`}>
        {this.head()}
        <div className={classes.route} ref="mainPanel">
          {this.state.createTransactionOpen ? (
            <div className={classes.content}>
              New Transaction
              <IconButton onClick={this.closeNewTransaction} color="inherit" aria-label="Menu">
                <Close />
              </IconButton>
              <CreateTransactionForm />
            </div>
          ):(
            <div className={classes.content}>
              {this.props.transactions.total} Transactions
              <IconButton onClick={this.openNewTransaction} color="inherit" aria-label="Menu">
                <Add />
              </IconButton>
              <ul>{this.renderTransactions()}</ul>
            </div>
          )}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    transactions: state.transactions
  }
}

function loadData(store, match){
  console.log("Admin/Transactions.loadData")
  console.dir(match.params)
  return store.dispatch(getTransactions())
}

export default {
  loadData,
  component: withRouter(connect(mapStateToProps, {getTransactions})(withStyles(dashboardStyle)(Transactions)))
}
