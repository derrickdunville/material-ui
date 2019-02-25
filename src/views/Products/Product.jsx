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
import { toggleCreateTransactionOpen, clearCreateTransaction } from 'actions/authActions'
import TransactionDialog from 'components/Dialog/TransactionDialog.jsx'
import defaultProductImage from 'assets/img/default_cover_image.jpg'
import Vimeo from 'react-vimeo'

class Product extends Component {
  constructor(props) {
    super(props);
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
    this.props.toggleCreateTransactionOpen()
  }
  closeCheckout(){
    if(!this.props.auth.creatingTransaction){
      this.props.toggleCreateTransactionOpen()
      let pass = this.props
      setTimeout(function () {
        pass.clearCreateTransaction()
      }, 200);
    }
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
    const { product, classes } = this.props
    return (
      <div>
      {product != false ? (
        <Paper style={{backgroundColor: "#383838", borderRadius: "4px", padding: "10px", marginBottom: "10px", maxWidth: "1200px"}}>
          <div style={{width: "100%", borderRadius: "4px"}}>
            {(product.category == 'class' && product.video_id) ? (
              <div style={{width: "100%", paddingBottom: "56.25%", position: "relative"}}>
                <iframe
                  style={{
                    position: "absolute",
                    top: "0",
                    bottom: "0",
                    left:"0",
                    right:"0"
                  }}
                   frameBorder="0"
                   width="100%"
                   height="100%"
                   src={"https://player.vimeo.com/video/"+`${product.video_id}`+"?transparent=0"}
                   allowFullScreen="true"
                   webkitallowfullscreen="true"
                   mozallowfullscreen="true"
                   borderTopRightRadius="3px"
                   borderTopLeftRadius="3px"
                 />
              </div>
            ):(
              <div className={classes.productCoverImage}>
                {product.cover_image != null ? (
                 <img className={classes.productCoverImage} src={`https://s3.amazonaws.com/${product.cover_image.bucket}/${product.cover_image.key}`}/>
                ):(
                  <img className={classes.productCoverImage} src={defaultProductImage}/>
                )}
              </div>
            )}
          </div>
          <div style={{paddingTop: "10px", paddingBottom: "10px", fontSize: "20px"}}>
            {product.name}
          </div>
          {this.props.myProductIds.includes(product._id) ? (
            <div className="hello" style={{display: "flex", alignItems: "center", height: '37px'}}>
              <div style={{width: "100%", fontSize: "16px", fontWeight: "1"}}>Purchased</div>
              {product.category == "class" ? (
                <div style={{minWidth: "86px", textAlign: "right", fontSize: "14px", fontWeight: "1",padding:"10px"}}>Watch Above</div>
              ):(
                <div>
                  <Button variant="outlined" style={{float: "right"}} color="default" onClick={this.handleDownload}>Download</Button>
                </div>
              )}
            </div>
          ):(
            <div style={{display: "flex", alignItems: "center"}}>
              <div style={{width: "100%", fontSize: "16px", fontWeight: "1"}}>${(product.amount/100).toFixed(2)}</div>
              <Button variant="outlined" style={{float: "right"}} color="default" onClick={this.openCheckout}>Buy</Button>
            </div>
          )}
          <div style={{marginTop: "10px"}}>
            <div style={{width: "100%",  fontSize: "18px", fontWeight: "1"}}>Description</div>
            <div style={{width: "100%",  fontSize: "14px", fontWeight: "1"}}>{product.description}</div>
          </div>
          <TransactionDialog
            loading={this.props.auth.creatingTransaction}
            loadingMessage="Processing"
            successMessage={this.props.auth.createTransactionSuccessMessage}
            errorMessage={this.props.auth.createTransactionErrorMessage}
            product={product}
            style={{width: "100%"}}
            buttonText="Buy"
            buttonColor="primary"
            open={this.props.auth.createTransactionOpen}
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
          <NavLink exact to={this.props.product.category == "class" ? (`/classes`) : (`/${this.props.product.category}s`)} style={{color: "#FFF"}}>
            <IconButton color="inherit" aria-label="Menu">
              <ArrowBack />
            </IconButton>
          </NavLink>
          <Typography style={{whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} variant="title" color="inherit">
            {this.props.product.name}
          </Typography>
        </Toolbar>
      </AppBar>
    )
    console.log("render Product")
    return (
      <div>
        {this.head()}
        {appBar}
        <div className={`slide${route.zIndex}`}>
          <div className={classes.content}>
            {this.renderProduct()}
          </div>
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

function extractMyProduct(product, transactions){
  for(let i = 0; i < transactions.length; ++i){
    if(transactions[i].status == 'succeeded' && transactions[i].product._id == product._id){
      return transactions[i].product
    }
  }
  return product
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
    product: extractMyProduct(state.products.product || false, state.auth.user.transactions || []),
    myProductIds: extractMyProducts(state.auth.user.transactions || []),
    auth: state.auth
  }
}

export default {
  loadData,
  component: connect(mapStateToProps, { getProduct, clearProduct, downloadProduct, toggleCreateTransactionOpen, clearCreateTransaction })(withStyles(dashboardStyle)(Product))
}
