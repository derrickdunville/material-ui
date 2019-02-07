import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types';
import withStyles from "@material-ui/core/styles/withStyles"
import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx"
import { withRouter } from "react-router-dom"
import { getUsers } from 'actions/userActions'
import { NavLink } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import Add from '@material-ui/icons/Add'
import Close from '@material-ui/icons/Close'
import CreateUserForm from './CreateUserForm.jsx'
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

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createUserOpen: false,
      search: "",
      searchColumn: "Username",
      anchorEl: null,
      labelWidth: 0,
      order: "asc",
      orderBy: "username",
      page: this.props.users.page,
      limit: this.props.users.limit
    }
    this.openNewUser = this.openNewUser.bind(this)
    this.closeNewUser = this.closeNewUser.bind(this)
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.handleChangePage = this.handleChangePage.bind(this)
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this)
    this.getFilter = this.getFilter.bind(this)
    this.handleSearchColumnChange = this.handleSearchColumnChange.bind(this)
    this.handleRequestSort = this.handleRequestSort.bind(this)
  }
  openNewUser(){
    this.setState({createUserOpen: true})
  }
  closeNewUser(){
    this.setState({createUserOpen: false})
  }
  getFilter(){
    let filter = {}
    if(this.state.search !== ''){
      if(this.state.searchColumn === 'Username'){
        filter.username = this.state.search
      }
      if(this.state.searchColumn === 'Email'){
        filter.email = this.state.search
      }
    }
    return filter
  }
  load(){
    this.props.getUsers(
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
    if(!this.props.users.loaded){
      this.props.getUsers()
    }
    this.setState({
     labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
   })
  }
  head(){
    return (
      <Helmet>
        <title>{`Users`}</title>
        <meta property="og:title" content="Users"/>
      </Helmet>
    )
  }
  renderUsers() {
    const { total, limit, page } = this.props.users;
    const emptyRows = limit - Math.min(limit, total - page * limit);
    const tableColumns = [
      {id:"username", label:"Username", numeric: false, disablePadding: false},
      {id:"email", label:"Email", numeric: false, disablePadding: false}
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
            {this.props.users.docs.map(user => (
              <TableRow key={user._id}>
                <CustomTableCell component="th" scope="row">
                  <NavLink
                    to={`/admin/users/${user.username}`}
                    key={user._id}
                    >
                    {user.username}
                  </NavLink>
                </CustomTableCell>
                <CustomTableCell align="right">{user.email}</CustomTableCell>
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
                count={this.props.users.total}
                rowsPerPage={this.props.users.limit}
                page={this.props.users.page}
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
          <MenuItem value="Username">Username</MenuItem>
          <MenuItem value="Email">Email</MenuItem>
        </CustomSelect>
      </FormControl>
    )
    return (
      <div className={`slide${route.zIndex}`}>
        {this.head()}
        <div className={classes.route} ref="mainPanel">
          {this.state.createUserOpen ? (
            <div className={classes.content}>
              New User
              <IconButton onClick={this.closeNewUser} color="inherit" aria-label="Menu">
                <Close />
              </IconButton>
              <CreateUserForm />
            </div>
          ):(
            <div className={classes.content}>
              <div style={{display: "flex", alignItems: "center"}}>
                <div style={{minWidth: "120px"}}>
                  {this.props.users.total} Users
                  <IconButton onClick={this.openNewUser} color="inherit" aria-label="Menu">
                    <Add />
                  </IconButton>
                </div>
                <div style={{width: "100%"}}></div>
                <div style={{minWidth: "150px"}}>{searchColumn}</div>
                <div style={{minWidth: "200px"}}>{search}</div>
              </div>
              <div>
                {this.renderUsers()}
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
    users: state.users
  }
}

function loadData(store, match){
  console.log("Admin/Users.loadData")
  console.dir(match.params)
  return store.dispatch(getUsers())
}

export default {
  loadData,
  component: withRouter(connect(mapStateToProps, {getUsers})(withStyles(dashboardStyle)(Users)))
}