import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchUser } from '../../actions'
import { Helmet } from 'react-helmet'
import requireAuth from '../../components/hocs/requireAuth'

class UserPage extends Component {
  componentDidMount(){
    // this.props.fetchUser()
  }

  // renderUsers() {
  //   if(this.props.users.docs){
  //     return this.props.users.docs.map(user => {
  //       return (
  //         <li key={user._id}>
  //         {user.username}
  //         </li>
  //       )
  //     })
  //   } else {
  //     return (
  //       <div>Hmmm... nothing here</div>
  //     )
  //   }
  // }

  head(){
    return (
      <Helmet>
        <title>{`User`}</title>
        <meta property="og:title" content="User"/>
      </Helmet>
    )
  }
  render(){
    return(
      <div>
        {this.head()}
        Here is a user:
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

function loadData(store, match){
  console.dir(match.params.id)
  return store.dispatch(fetchUser(match.params.id)) // how do i get the route param?
}

export default {
  loadData,
  component: connect(mapStateToProps, {fetchUser})(requireAuth(UserPage))
}
