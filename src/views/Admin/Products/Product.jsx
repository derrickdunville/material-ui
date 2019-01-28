import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, Switch, Route, Redirect, withRouter } from "react-router-dom"
import { Helmet } from 'react-helmet'
import { getProduct, deleteProduct, clearProduct } from 'actions/productActions'
import EditProductForm from './EditProductForm.jsx'
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

class Product extends Component {
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
    this.props.deleteProduct(this.props.product._id)
  }
  componentDidMount(){
    console.log("Product componentDidMount")
    this.props.getProduct(this.props.match.params.id)
  }
  componentWillUnmount(){
    this.props.clearProduct();
  }

  head(){
    return (
      <Helmet>
        <title>{`Product`}</title>
        <meta property="og:title" content="Product"/>
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
          <NavLink exact to={"/admin/products"} style={{color: "#FFF"}}>
            <IconButton color="inherit" aria-label="Menu">
              <ArrowBack />
            </IconButton>
          </NavLink>
          <Typography variant="title" color="inherit">
            {this.props.product.name}
          </Typography>
        </Toolbar>
      </AppBar>
    )

    const deleteProduct = (
      <div>
        Are you sure you want to delete product {this.props.product.name}?
          <Button onClick={this.handleDelete}>
            Delete
          </Button>
          <Button onClick={this.closeDelete}>
            Cancel
          </Button>
      </div>
    )
    const editProduct = (
      <div>
        <Button onClick={this.closeEdit}>
          Cancel
        </Button>
        <EditProductForm />
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
              <h5>{this.props.product.name}</h5>
              <h5>{this.props.product.amount}</h5>
              <h5>{this.props.product.description}</h5>
              <h5>{this.props.product.created_at}</h5>
            </div>
          ):(
            <div>
              {this.state.deleteOpen && (
                <div className={classes.content}>
                  {deleteProduct}
                </div>
              )}
              {this.state.editOpen && (
                <div className={classes.content}>
                  {editProduct}
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
    product: state.products.product
  }
}

function loadData(store, match){
  console.log("admin/products/product.loadData")
  console.dir(match.params)
  return store.dispatch(getProduct(match.params.id))
}

export default {
  loadData,
  component: withRouter(connect(mapStateToProps, {getProduct, clearProduct, deleteProduct})(withStyles(dashboardStyle)(Product)))
}
