import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { NavLink } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import withStyles from "@material-ui/core/styles/withStyles"
import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx"
import ProfileForm from './Profile/ProfileForm.jsx'
import { downloadProduct } from 'actions/productActions'

class MyPurchases extends Component {
  constructor(props) {
    super(props);
    this.handleDownload = this.handleDownload.bind(this)
  }

  handleDownload(event){
    this.props.downloadProduct(event.target.name)
  }
  head(){
    return (
      <Helmet>
        <title>{`Profile`}</title>
        <meta property="og:title" content="Profile"/>
      </Helmet>
    )
  }
  renderPurchases(){
    return (
      <div>
        {this.props.products.map(product => {
          return(
            <div key={product._id} style={{display:"flex", alignItems:"center", backgroundColor: "#202225", padding:"10px", borderRadius: "4px", marginBottom: "6px"}}>
              <div style={{width: "60px", minWidth: "60px", height: "60px", backgroundColor: '#565656', marginRight:"10px", borderRadius: "4px"}}>
              </div>
              <div style={{width:"100%", marginRight: "10px"}}>
                {product.name}
              </div>
              {(product.category=="script" || product.category == "scanner") && (
                <Button name={product._id} onClick={this.handleDownload} variant="outlined" color="primary">
                  Download
                </Button>
              )}
              {product.category=='class' && (
                <NavLink to={`/app/classes/${product._id}`}>
                  <Button variant="outlined" color="primary">
                    Watch
                  </Button>
                </NavLink>
              )}
            </div>
          )
        })}
      </div>
    )
  }

  render(){
    const { classes, route, ...rest } = this.props;
    return (
      <div className={`slide${route.zIndex}`}>
        {this.head()}
        <div className={classes.route} ref="mainPanel">
          <div className={classes.content}>
            {this.renderPurchases()}
          </div>
        </div>
      </div>
    )
  }
}

function extractMyProducts(transactions){
  let myProducts = []
  for(let i = 0; i < transactions.length; ++i){
    if(transactions[i].status == 'succeeded' && transactions[i].product.category != 'membership'){
      myProducts.push(transactions[i].product)
    }
  }
  return myProducts
}
function mapStateToProps(state){
  return {
    products: extractMyProducts(state.auth.user.transactions) || []
  }
}

export default {
  component: connect(mapStateToProps, { downloadProduct })(withStyles(dashboardStyle)(MyPurchases))
}
