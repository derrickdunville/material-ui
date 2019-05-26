import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import withStyles from '@material-ui/core/styles/withStyles'
import dashboardStyle from 'assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx'
import { closeNav, openNav } from 'actions'

class MobileSidebar extends Component{
  constructor(props){
    super(props)
    this.closeSidebar = this.closeSidebar.bind(this)
    this.openSidebar = this.openSidebar.bind(this)
  }
  closeSidebar(){
    this.props.closeNav()
  }
  openSidebar(){
    this.props.openNav()
  }

  render(){
    const { classes } = this.props
    return(
      <SwipeableDrawer
        open={this.props.navOpen}
        onClose={this.closeSidebar}
        onOpen={this.openSidebar}
        ModalProps={{
          style: {position: 'absolute'},
          classes: {
            root: classes.rootMobileSidebar
          },
          disableEnforceFocus: true
        }}
        BackdropProps={{
          style: { position: 'absolute' },
          classes: { root: classes.rootMobileSidebarBackdrop}
        }}
        SlideProps={{ style: { position: 'absolute' } }}
        PaperProps={{
          style: {
            position: "absolute"
          },
          classes: {
            root: classes.rootMobileSidebarPaper
          }
        }}
        >
        <div
          tabIndex={0}
          role="button"
          onKeyDown={this.closeSidebar}
          style={{height: "100%"}}
        >
          {this.props.sideList}
        </div>
      </SwipeableDrawer>
    )
  }
}

function mapStateToProps(state){
  return {
    navOpen: state.app.navOpen || false
  }
}

MobileSidebar.propTypes = {
  sideList: PropTypes.object.isRequired
}
export default connect(mapStateToProps, { openNav, closeNav })(withStyles(dashboardStyle)(MobileSidebar))
