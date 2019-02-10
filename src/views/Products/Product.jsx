import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import withStyles from '@material-ui/core/styles/withStyles'
import dashboardStyle from 'assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ArrowBack from '@material-ui/icons/ArrowBack'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import { NavLink } from 'react-router-dom'
import { withRouter } from "react-router-dom"
import { getProduct, clearProduct, downloadProduct } from 'actions/productActions'
import TransactionDialog from 'components/Dialog/TransactionDialog.jsx'
import defaultProductImage from 'assets/img/sidebar-2.jpg'

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkoutOpen: false
    }
    this.handleCheckout = this.handleCheckout.bind(this)
    this.openCheckout = this.openCheckout.bind(this)
    this.closeCheckout = this.closeCheckout.bind(this)
    this.handleDownload = this.handleDownload.bind(this)
  }

  handleDownload(){
    console.log("handle download")
    this.props.downloadProduct(this.props.product._id)
  }
  handleCheckout(){
    console.log("handle checkout")
  }
  openCheckout(){
    this.setState({ checkoutOpen: true})
  }
  closeCheckout(){
    this.setState({ checkoutOpen: false})
  }

  componentDidMount(){
    console.log("Product componentDidMount")
    this.props.getProduct(this.props.match.params.id)
  }

  componentWillUnmount(){
    this.props.clearProduct()
    console.log("clear products")
  }

  head(){
    return (
      <Helmet>
        <title>{this.props.product.name}</title>
        <meta property="og:title" content={this.props.product.name}/>
        <meta property="og:description" content={this.props.product.description}/>
      </Helmet>
    )
  }


  renderProduct(){
    const { product } = this.props
    return (
      <div>
      {product != false ? (
        <Paper style={{backgroundColor: "#565656", borderRadius: "4px", padding: "10px", marginBottom: "10px"}}>
          <div style={{width: "100%", borderRadius: "4px"}}>
            {product.cover_image != null ? (
             <img style={{ width: "100%", borderRadius: "4px", height:"auto"}} src={`https://s3.amazonaws.com/${product.cover_image.bucket}/${product.cover_image.key}`}/>
            ):(
              <img style={{ width: "100%", borderRadius: "4px", height:"auto"}} src={defaultProductImage}/>
            )}
          </div>
          <div style={{paddingTop: "10px", fontSize: "20px"}}>
            {product.name}
          </div>
          {this.props.myProductIds.includes(product._id) ? (
            <div style={{display: "flex", alignItems: "center", height: '37px'}}>
              <div style={{width: "100%", fontSize: "14px", fontWeight: "1"}}>Purchased</div>
              {product.category == "class" ? (
                <div style={{width: "100px", textAlign: "right", fontSize: "14px", fontWeight: "1",padding:"10px"}}>Watch Above</div>
              ):(
                <div>
                  <Button variant="outlined" style={{float: "right"}} color="default" onClick={this.handleDownload}>Download</Button>
                </div>
              )}
            </div>
          ):(
            <div style={{display: "flex", alignItems: "center"}}>
              <div style={{width: "100%", fontSize: "14px", fontWeight: "1"}}>${(product.amount/100).toFixed(2)}</div>
              <Button variant="outlined" style={{float: "right"}} color="default" onClick={this.openCheckout}>Buy</Button>
            </div>
          )}
          <div>
            <div style={{width: "100%",  fontSize: "16px", fontWeight: "1"}}>Description</div>
            <div style={{width: "100%",  fontSize: "14px", fontWeight: "1"}}>{product.description}</div>
          </div>
          <TransactionDialog
            loading={false}
            loadingMessage="Processing"
            successMessage={false}
            product={product}
            style={{width: "100%"}}
            buttonText="Buy"
            buttonColor="primary"
            open={this.state.checkoutOpen}
            title={`${product.name}`}
            text={''}
            leftAction={this.closeCheckout}
            leftActionText="Cancel"
            leftActionColor="default"
            rightAction={this.handleCheckout}
            rightActionText="Pay"
            rightActionColor="primary"
            onClick={this.openCheckout}
            onClose={this.closeCheckout}
            />
        </Paper>
      ):(
        <div></div>
      )}
      </div>

    )
  }

  render(){
    const { classes, title, route, ...rest } = this.props;
    const appBar = (
      <AppBar
        position="static"
        color="default"
        style={{backgroundColor: "#454545", color: "#FFFFFF"}}
        className="app-bar-slide2"
        >
        <Toolbar>
          <NavLink exact to={this.props.product.category == "class" ? (`/app/classes`) : (`/app/${this.props.product.category}s`)} style={{color: "#FFF"}}>
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
    console.log("render Product")
    return (
      <div className={`admin-slide${route.zIndex}`}>
        {this.head()}
        {appBar}
        <div className={classes.content}>
          {this.renderProduct()}
        </div>
      </div>
    )
  }
}

function loadData(store, match){
  console.log("app/scripts/script.loadData")
  console.dir(match.params)
  return store.dispatch(getProduct(match.params.id))
}

function extractMyProducts(transactions){
  let myProducts = []
  for(let i = 0; i < transactions.length; ++i){
    if(transactions[i].status == 'succeeded'){
      myProducts.push(transactions[i].product._id)
    }
  }
  return myProducts
}

function mapStateToProps(state){
  return {
    product: state.products.product || false,
    myProductIds: extractMyProducts(state.auth.user.transactions || []),
  }
}

export default {
  loadData,
  component: connect(mapStateToProps, { getProduct, clearProduct, downloadProduct })(withStyles(dashboardStyle)(Product))
}
