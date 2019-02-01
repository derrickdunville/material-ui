import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types';
import withStyles from "@material-ui/core/styles/withStyles"
import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx"
import { withRouter } from "react-router-dom"
import { getSubscriptions } from 'actions/subscriptionActions'
import { NavLink } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import Add from '@material-ui/icons/Add'
import Close from '@material-ui/icons/Close'
import FormControl from "@material-ui/core/FormControl";
import TextField from
"@material-ui/core/TextField"

import CustomTextField from 'components/CustomTextField/CustomTextField.jsx'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';

import EnhancedTableHead from "components/TableHead/EnhancedTableHead.jsx"
import TablePaginationActions from "components/TablePagination/TablePaginationActions.jsx"
import CustomTableCell from "components/CustomTableCell/CustomTableCell.jsx"
import CustomTableSortLabel from "components/TableSortLabel/CustomTableSortLabel.jsx"
import CustomMenuItem from "components/MenuItem/CustomMenuItem.jsx"
import CustomSelect from "components/Select/CustomSelect.jsx"

class Subscriptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      searchColumn: "ID",
      anchorEl: null,
      labelWidth: 0,
      order: "asc",
      orderBy: "name",
      page: this.props.subscriptions.page,
      limit: this.props.subscriptions.limit
    }
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.handleChangePage = this.handleChangePage.bind(this)
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this)
    this.getFilter = this.getFilter.bind(this)
    this.handleSearchColumnChange = this.handleSearchColumnChange.bind(this)
    this.handleRequestSort = this.handleRequestSort.bind(this)
  }
  getFilter(){
    let filter = {}
    if(this.state.search !== ''){
      if(this.state.searchColumn === 'Name'){
        filter.name = this.state.search
      }
      if(this.state.searchColumn === 'ID'){
        filter._id = this.state.search
      }
    }
    return filter
  }
  load(){
    this.props.getSubscriptions(
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
    this.setState({search: event.target.value}, () => this.load())
  }
  handleChangePage(event, page){
    this.setState({page}, () => this.load())
  }
  handleChangeRowsPerPage(event){
    this.setState({limit: event.target.value, page: 0}, () => this.load())
  }
  handleSearchColumnChange(event){
    this.setState({ searchColumn: event.target.value }, () => this.load());
  }
  componentDidMount(){
    if(!this.props.subscriptions.loaded){
      this.props.getSubscriptions()
    }
    this.setState({
     labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
   })
  }
  head(){
    return (
      <Helmet>
        <title>{`Subscriptions`}</title>
        <meta property="og:title" content="Subscriptions"/>
      </Helmet>
    )
  }
  renderSubscriptions() {
    const { total, limit, page } = this.props.subscriptions;
    const emptyRows = limit - Math.min(limit, total - page * limit);
    const tableColumns = [
      {id:"_id", label:"ID", numeric: false, disablePadding: false},
      {id:"username", label:"Username", numeric: false, disablePadding: false},
      {id:"product", label:"Product", numeric: false, disablePadding: false},
      {id:"amount", label:"Amount", numeric: false, disablePadding: false}

    ]
    return (
      <Paper style={{width: "100%", backgroundColor: "#454545"}}>
        <Table style={{color: "white"}}>
          <EnhancedTableHead
            columns={tableColumns}
            order={this.state.order}
            orderBy={this.state.orderBy}
            onRequestSort={this.handleRequestSort}
            />
          <TableBody>
            {this.props.subscriptions.docs.map(subscription => (
              <TableRow key={subscription._id}>
                <CustomTableCell component="th" scope="row">
                  <NavLink
                    to={`/admin/subscriptions/${subscription._id}`}
                    key={subscription._id}
                    >
                    {subscription._id}
                  </NavLink>
                </CustomTableCell>
                <CustomTableCell align="right">{subscription.user.username}</CustomTableCell>
                <CustomTableCell align="right">{subscription.product.name}</CustomTableCell>
                <CustomTableCell align="right">{subscription.product.amount}</CustomTableCell>
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
                count={this.props.subscriptions.total}
                rowsPerPage={this.props.subscriptions.limit}
                page={this.props.subscriptions.page}
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
    const searchColumn = (
      <FormControl variant="outlined" style={{float: "right", color: "white"}}>
        <InputLabel
          style={{color: "white"}}
            ref={ref => {
              this.InputLabelRef = ref;
            }}
            htmlFor="outlined-filter-simple"
          >
            Filter
          </InputLabel>
        <CustomSelect
          value={this.state.searchColumn}
          onChange={this.handleSearchColumnChange}
          name="name"
          renderValue={value => `${value}`}
          input={<OutlinedInput
            labelWidth={this.state.labelWidth}
            name="filter"
            id="outlined-filter-simple" />
          }
        >
          <MenuItem value="Name">Name</MenuItem>
          <MenuItem value="ID">ID</MenuItem>
        </CustomSelect>
      </FormControl>
    )
    return (
      <div className={`slide${route.zIndex}`}>
        {this.head()}
        <div className={classes.route} ref="mainPanel">
          <div className={classes.content}>
            <div style={{display: "flex", alignItems: "center"}}>
              <div style={{minWidth: "160px"}}>
                {this.props.subscriptions.total} Subscriptions
              </div>
              <div style={{width: "100%"}}></div>
              <div style={{minWidth: "150px"}}>{searchColumn}</div>
              <div style={{minWidth: "200px"}}>{search}</div>
            </div>
            <div>
              {this.renderSubscriptions()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    subscriptions: state.subscriptions
  }
}

function loadData(store, match){
  console.log("Admin/Subscriptions.loadData")
  console.dir(match.params)
  return store.dispatch(getSubscriptions())
}

export default {
  loadData,
  component: withRouter(connect(mapStateToProps, {getSubscriptions})(withStyles(dashboardStyle)(Subscriptions)))
}
