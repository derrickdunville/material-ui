import React, { Component } from 'react'
import { connect } from 'react-redux'
import withStyles from "@material-ui/core/styles/withStyles"
import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx"
import logo from "assets/img/faces/marc.jpg";

class Avatar extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    const { classes } = this.props;
    return (
      <div className={classes.logoImage}
        style={{color: "#FFFFFF", display: 'flex', alignItems: "center", padding:"10px", height: "70px" }}>
        {this.props.avatar != null ? (
          <img src={`https://s3.amazonaws.com/${this.props.avatar.bucket}/${this.props.avatar.key}`}
            className={classes.img}
            style={{ height: "100%", borderRadius: "4px"}}/>
        ):(
          <img src={logo}
            className={classes.img}
            style={{height: "100%", borderRadius: "4px"}}/>
        )}
        <div style={{marginLeft: "10px", paddingRight: "10px", flex: '1'}}>
          {this.props.username}
        </div>
      </div>
    )
  }
}
function mapStateToProps(state){
  return {
    avatar: state.auth.user.avatar || null,
    username: state.auth.user.username
  }
}

export default connect(mapStateToProps, {})(withStyles(dashboardStyle)(Avatar))
