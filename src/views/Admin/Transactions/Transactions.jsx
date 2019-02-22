import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types';
import withStyles from "@material-ui/core/styles/withStyles"
import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx"
import { withRouter } from "react-router-dom"
import { getTransactions } from 'actions/transactionActions'
import { NavLink } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import Add from '@material-ui/icons/Add'
import Close from '@material-ui/icons/Close'
import TransactionForm from './TransactionForm.jsx'
import FormControl from "@material-ui/core/FormControl"
import TextField from "@material-ui/core/TextField"

import CustomTextField from 'components/CustomTextField/CustomTextField.jsx'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableFooter from '@material-ui/core/TableFooter'
import TablePagination from '@material-ui/core/TablePagination'
import Paper from '@material-ui/core/Paper'

import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'

import EnhancedTableHead from "components/TableHead/EnhancedTableHead.jsx"
import TablePaginationActions from "components/TablePagination/TablePaginationActions.jsx"
import CustomTableCell from "components/CustomTableCell/CustomTableCell.jsx"
import CustomTableSortLabel from "components/TableSortLabel/CustomTableSortLabel.jsx"
import CustomMenuItem from "components/MenuItem/CustomMenuItem.jsx"
import CustomSelect from "components/Select/CustomSelect.jsx"
import CustomOutlinedInput from 'components/OutlinedInput/CustomOutlinedInput.jsx'


import { parseDate } from 'utils/DateUtils'

class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createTransactionOpen: false,
      search: "",
      searchColumn: "ID",
      anchorEl: null,
      labelWidth: 0,
      order: "desc",
      orderBy: "created_at",
      page: this.props.transactions.page,
      limit: this.props.transactions.limit
    }
    this.openNewTransaction = this.openNewTransaction.bind(this)
    this.closeNewTransaction = this.closeNewTransaction.bind(this)
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.handleChangePage = this.handleChangePage.bind(this)
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this)
    this.getFilter = this.getFilter.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleRequestSort = this.handleRequestSort.bind(this)
  }
  openNewTransaction(){
    this.setState({createTransactionOpen: true})
  }
  closeNewTransaction(){
    this.setState({createTransactionOpen: false})
  }
  getFilter(){
    let filter = {}
    if(this.state.search !== ''){
      if(this.state.searchColumn === 'ID'){
        filter._id = this.state.search
      }
      if(this.state.searchColumn === 'Username'){
        filter.username = this.state.search
      }
      if(this.state.searchColumn === 'Transaction'){
        filter.trans_num = this.state.search
      }
      if(this.state.searchColumn === 'Subscription'){
        filter.subscription = this.state.search
      }
      if(this.state.searchColumn === 'Email'){
        filter.email = this.state.search
      }
    }
    return filter
  }
  load(){
    console.log("load...")
    this.props.getTransactions(
      this.getFilter(),
      this.state.page,
      this.state.limit,
      this.state.order,
      this.state.orderBy)
  }
  handleRequestSort(event, property){
    const orderBy = property;
    let order = 'desc';
    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }
    this.setState({ order, orderBy }, () => this.load())
  }
  handleSearchChange(event){
    console.log("search changed ", event.currentTarget.value)
    this.setState({search: event.currentTarget.value}, () => this.load())
  }
  handleChangePage(event, page){
    console.log("Page changed ", page)
    this.setState({page}, () => this.load())
  }
  handleChangeRowsPerPage(event){
    this.setState({limit: event.currentTarget.value, page: 0}, () => this.load())
  }
  handleChange(event){
    this.setState({ [event.target.name]: event.target.value }, () => {
      if(this.state.search != ''){
        this.load()
      }
    });
  }
  componentDidMount(){
    if(!this.props.transactions.loaded){
      this.props.getTransactions()
    }
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
    const { total, limit, page } = this.props.transactions;
    const emptyRows = limit - Math.min(limit, total - page * limit);
    const tableColumns = [
      {id:"id", label:"ID", numeric: false, disablePadding: false},
      {id:"trans_num", label:"Transaction", numeric: false, disablePadding: false},
      {id:"status", label:"Status", numeric: false, disablePadding: false},
      {id:"product", label:"Product", numeric: false, disablePadding: false},
      {id:"total", label:"Total", numeric: false, disablePadding: false},
      {id:"username", label:"Username", numeric: false, disablePadding: false},
      {id:"created_at", label:"Created At", numeric: false, disablePadding: false},
      {id:"expires_at", label:"Expires At", numeric: false, disablePadding: false}
    ]
    return (
      <Paper style={{width: "100%", backgroundColor: "#454545", overflowX: "auto"}}>
        <Table style={{color: "white"}}>
          <EnhancedTableHead
            columns={tableColumns}
            order={this.state.order}
            orderBy={this.state.orderBy}
            onRequestSort={this.handleRequestSort}
            />
          <TableBody>
            {this.props.transactions.docs.map(transaction => (
              <TableRow key={transaction._id}>
                <CustomTableCell>
                  <NavLink
                    to={`/admin/transactions/${transaction._id}`}
                    key={transaction._id}
                    >
                    {transaction._id}
                  </NavLink>
                </CustomTableCell>
                <CustomTableCell>{transaction.trans_num}</CustomTableCell>
                <CustomTableCell>{transaction.status}</CustomTableCell>
                <CustomTableCell>{transaction.product.name}</CustomTableCell>
                <CustomTableCell align={"right"}>${(transaction.total/100).toFixed(2)}</CustomTableCell>
                <CustomTableCell>{transaction.user.username}</CustomTableCell>
                <CustomTableCell>{parseDate(transaction.created_at)}</CustomTableCell>
                <CustomTableCell>{parseDate(transaction.expires_at)}</CustomTableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 48 * emptyRows }}>
                <CustomTableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[10, 25, 50, 100]}
                colSpan={3}
                style={{color: "white"}}
                count={this.props.transactions.total}
                rowsPerPage={this.props.transactions.limit}
                page={this.props.transactions.page}
                SelectProps={{
                  native: true,
                }}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </Paper>
    )
  }

  render(){
    const { classes, route, ...rest } = this.props;
    const { anchorEl } = this.state;
    const search = (
      <CustomTextField
        labelText="Search"
        inputType="text"
        formControlProps={{
          fullWidth: false,
          style: {float: "right"}
        }}
        inputProps={{
          name: 'search',
          value: this.state.search,
          onChange: this.handleSearchChange
        }}
      />
    )
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
              <TransactionForm />
            </div>
          ):(
            <div className={classes.content}>
              <div style={{display: "flex", alignItems: "center"}}>
                <div style={{minWidth: "170px"}}>
                  {this.props.transactions.total} Transactions
                  <IconButton onClick={this.openNewTransaction} color="inherit" aria-label="Menu">
                    <Add />
                  </IconButton>
                </div>
                <div style={{width: "100%"}}></div>
                <div style={{minWidth: "150px"}}>
                  <FormControl variant="outlined" style={{width: "100%", backgroundColor: "#202225", borderRadius: "4px"}}>
                    <InputLabel shrink={true} style={{color: "white"}}>
                      Filter
                    </InputLabel>
                    <CustomSelect
                      value={this.state.searchColumn}
                      name="searchColumn"
                      onChange={this.handleChange}
                      renderValue={value => `${value}`}
                      input={<CustomOutlinedInput labelWidth={40}/>}
                      items={["ID", "Username", "Email", "Transaction", "Subscription"]}
                    />
                  </FormControl>
                </div>
                <div style={{minWidth: "200px"}}>{search}</div>
              </div>
              <div>
                {this.renderTransactions()}
              </div>
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
