import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Helmet } from 'react-helmet'
import withStyles from '@material-ui/core/styles/withStyles'
import dashboardStyle from 'assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { parseDate } from 'utils/DateUtils'

class Terms extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  head(){
    return (
      <Helmet key={this.props.location} title={"App Title - Terms of Service"} meta={[
          {name: "description", content: "Terms of Service for App Title"}
        ]}/>
    )
  }

  render(){
    const { classes, route, ...rest } = this.props

    const htmlContent = this.props.terms.content
    // const parsed = ReactHtmlParser(html)

    return (
      <div className={`slide${route.zIndex}`}>
        {this.head()}
        <div className={classes.content}>
          <div style={{marginBottom: "20px"}}>
            <h3 style={{textAlign: "center"}}>Terms of Service</h3>
            <h5 style={{textAlign: "center", marginTop: "5px", marginBottom: "30px"}}>{parseDate(this.props.terms.created_at)}</h5>
            <div>{ ReactHtmlParser(htmlContent) }</div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    terms: state.terms.terms
  }
}
export default {
  component: connect(mapStateToProps, {})(withRouter(withStyles(dashboardStyle)(Terms)))
}
