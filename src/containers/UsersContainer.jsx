import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { renderRoutes } from 'react-router-config'

class UsersContainer extends Component {
  head(){
    return (
      <Helmet>
        <title>{`Users`}</title>
        <meta property="og:title" content="Users"/>
      </Helmet>
    )
  }

  render(){
    return (
      <div>
        {this.head()}
        <div>{renderRoutes(this.props.route.routes)}</div>
      </div>
    )
  }
}

export default {
  component: UsersContainer
}
