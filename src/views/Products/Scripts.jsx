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
import { NavLink } from 'react-router-dom'
import { withRouter } from "react-router-dom"
import { getProducts, clearProducts } from 'actions/productActions'
import defaultProductImage from 'assets/img/default_cover_image.jpg'
import Paper from '@material-ui/core/Paper'

class Scripts extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    this.props.getProducts({category: "script"},0,100)
  }
  componentWillUnmount(){
    // this.props.clearProducts()
    console.log("clear products")
  }
  head(){
    return (
      <Helmet>
        <title>{`Scripts`}</title>
        <meta property="og:title" content="Scripts"/>
      </Helmet>
    )
  }
  renderScripts(){
    const { classes } = this.props
    return (
      <div>
        {this.props.products.map(product => {
          return (
            <NavLink key={product._id} to={`/scripts/${product._id}`} style={{marginBottom: "6px"}}>
              <Paper className={classes.productContainer}>
                {product.cover_image != null ? (
                 <img className={classes.productImage} src={`https://s3.amazonaws.com/${product.cover_image.bucket}/${product.cover_image.key}`}/>
                ):(
                  <img className={classes.productImage} src={defaultProductImage}/>
                )}
                <div className={classes.productDetails}>
                  <div style={{width: "100%", fontSize: "20px", marginRight: "10px"}}>
                    {product.name}
                  </div>
                  <div style={{fontSize: "20px"}}>
                    ${(product.amount/100).toFixed(2)}
                  </div>
                </div>
              </Paper>
            </NavLink>
          )
        })}
      </div>
    )
  }
  render(){
    const { classes, title, route, ...rest } = this.props;
    console.log("render Scripts")
    return (
      <div className={`slide${route.zIndex}`}>
        {this.head()}
        <div className={classes.content}>
          {this.renderScripts()}
        </div>
      </div>
    )
  }
}

function loadData(store){
  return store.dispatch(getProducts({category: "script"},0,100))

}
function mapStateToProps(state){
  return {
    products: state.products.docs || []
  }
}

export default {
  loadData,
  component: connect(mapStateToProps, { getProducts })(withStyles(dashboardStyle)(Scripts))
}
