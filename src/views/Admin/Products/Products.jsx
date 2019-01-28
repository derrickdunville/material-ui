import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import withStyles from "@material-ui/core/styles/withStyles"
import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx"
import { withRouter } from "react-router-dom"
import { getProducts } from 'actions/productActions'
import { NavLink } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import Add from '@material-ui/icons/Add'
import Close from '@material-ui/icons/Close'
import CreateProductForm from './CreateProductForm.jsx'
import FormControl from "@material-ui/core/FormControl";
import TextField from
"@material-ui/core/TextField"

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createProductOpen: false
    }
    this.openNewProduct = this.openNewProduct.bind(this)
    this.closeNewProduct = this.closeNewProduct.bind(this)
  }
  openNewProduct(){
    this.setState({createProductOpen: true})
  }
  closeNewProduct(){
    this.setState({createProductOpen: false})
  }

  componentDidMount(){
    this.props.getProducts()
  }
  head(){
    return (
      <Helmet>
        <title>{`Products`}</title>
        <meta property="og:title" content="Products"/>
      </Helmet>
    )
  }
  renderProducts() {
    if(this.props.products.docs){
      return this.props.products.docs.map(product => {
        return (
          <NavLink
            to={`/admin/products/${product._id}`}
            key={product._id}
            >
            <li>
            {product.name}
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
          {this.state.createProductOpen ? (
            <div className={classes.content}>
              New Product
              <IconButton onClick={this.closeNewProduct} color="inherit" aria-label="Menu">
                <Close />
              </IconButton>
              <CreateProductForm />
            </div>
          ):(
            <div className={classes.content}>
              {this.props.products.total} Products
              <IconButton onClick={this.openNewProduct} color="inherit" aria-label="Menu">
                <Add />
              </IconButton>
              <ul>{this.renderProducts()}</ul>
            </div>
          )}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    products: state.products
  }
}

function loadData(store, match){
  console.log("Admin/Products.loadData")
  console.dir(match.params)
  return store.dispatch(getProducts())
}

export default {
  loadData,
  component: withRouter(connect(mapStateToProps, {getProducts})(withStyles(dashboardStyle)(Products)))
}
