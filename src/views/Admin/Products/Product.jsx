import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, Switch, Route, Redirect, withRouter } from "react-router-dom"
import { Helmet } from 'react-helmet'
import { getProduct, deleteProduct, clearProduct, clearPostProduct, toggleEditOpen } from 'actions/productActions'
import ProductReduxForm from './ProductReduxForm.jsx'
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

class Product extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    console.log("Product componentDidMount")
    if(!this.props.products.product){
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
                <ProductReduxForm editing={true} disabled={!this.props.editOpen} product={this.props.product}/>
              ):(
                <div> Loading ...</div>
              )}
              <CustomSnackbar
                color="success"
                message={!this.props.message ? "" : this.props.message}
                classes={{}}
                place="br"
                open={!this.props.message ? false : true}
                onClose={() => this.props.clearPostProduct()}
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
    message: state.products.postProductSuccessMessage,
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
        clearPostProduct,
      }
    )
    (withStyles(dashboardStyle)(Product)))
}
