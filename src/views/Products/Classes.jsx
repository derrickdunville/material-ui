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

class Classes extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    this.props.getProducts({category: "class"},0,100)
  }
  componentWillUnmount(){
    // this.props.clearProducts()
    console.log("clear products")
  }
  head(){
    return (
      <Helmet>
        <title>{`Classes`}</title>
        <meta property="og:title" content="Classes"/>
      </Helmet>
    )
  }
  renderClasses(){
    return (
      <div>
        {this.props.products.length == 0 && (
          <div>No classes</div>
        )}
        {this.props.products.map(product => {
          return (
            <div key={product._id} style={{marginBottom: "6px"}}>
              <NavLink  to={`/app/classes/${product._id}`}>
                <div style={{display: "flex", alignItems: "center", backgroundColor: "#202225", borderRadius: "4px", padding: "10px"}}>
                  <div style={{width: "60px" , height: "60px" , minWidth: "60px", backgroundColor: "#545454", marginRight: "10px", borderRadius: "4px"}}></div>
                  <div style={{width: "100%", marginRight:"10px"}}>{product.name}</div>
                  <div>${(product.amount/100).toFixed(2)}</div>
                </div>
              </NavLink>
            </div>
          )
        })}
      </div>
    )
  }
  render(){
    const { classes, title, route, ...rest } = this.props;
    console.log("render classes")
    return (
      <div className={`slide${route.zIndex}`}>
        {this.head()}
        <div className={classes.content}>
          {this.renderClasses()}
        </div>
      </div>
    )
  }
}

function loadData(store){
  return store.dispatch(getProducts({category: "class"},0,100))

}
function mapStateToProps(state){
  return {
    products: state.products.docs || []
  }
}

export default {
  loadData,
  component: connect(mapStateToProps, { getProducts })(withStyles(dashboardStyle)(Classes))
}
