import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, Switch, Route, Redirect, withRouter } from "react-router-dom"
import { Helmet } from 'react-helmet'
import { getProduct, deleteProduct, clearProduct, clearMessage, toggleEditOpen } from 'actions/productActions'
import ProductForm from './ProductForm.jsx'
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
import CustomSnackbar from "components/Snackbar/CustomSnackbar.jsx"

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    this.props.deleteProduct(this.props.history, this.props.product._id)
  }
  componentDidMount(){
    console.log("Product componentDidMount")
    if(!this.props.products.loaded){
      this.props.getProduct(this.props.match.params.id)
    }
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

    return (
      <div className={`admin-slide${route.zIndex}`}>
        {this.head()}
        {appBar}
        <div className={classes.route} ref="mainPanel">
          <div className={classes.content}>
            {this.props.product ? (
              <div>
                <div style={{display: "flex", marginBottom: "10px"}}>
                  <Button style={{width: "100%", marginRight: "10px"}} variant="outlined" color="default" onClick={this.toggleEdit}>
                    {this.props.editOpen ? "Cancel" : "Edit"}
                  </Button>
                  <AlertDialog
                    style={{width: "100%"}}
                    buttonText="Delete"
                    buttonColor="secondary"
                    open={this.state.deleteOpen}
                    title={`Delete ${this.props.product.name}?`}
                    text="Are you sure you would like to delete this product? This will result in this product being end-dated. It will not actually be deleted permenantly but it will no longer be purchaseable and will disappear from the corresponding product page. Associated content will still be available to those who have purchased it."
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
                  <ProductForm editing={true} disabled={!this.props.editOpen}/>
                </div>
              </div>
              ):(
                <div> Loading ...</div>
              )}
              <CustomSnackbar
                color="success"
                message={!this.props.message ? "" : this.props.message}
                classes={{}}
                place="br"
                open={!this.props.message ? false : true}
                onClose={() => this.props.clearMessage()}
                close
                />
            </div>
          </div>
        </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    products: state.products,
    product: state.products.product,
    message: state.products.message,
    editOpen: state.products.editOpen
  }
}

function loadData(store, match){
  console.log("admin/products/product.loadData")
  console.dir(match.params)
  return store.dispatch(getProduct(match.params.id))
}

export default {
  loadData,
  component: withRouter(
    connect(
      mapStateToProps,
      {
        getProduct,
        clearProduct,
        deleteProduct,
        clearMessage,
        toggleEditOpen
      }
    )
    (withStyles(dashboardStyle)(Product)))
}
