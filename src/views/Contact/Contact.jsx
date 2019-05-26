import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Helmet } from 'react-helmet'
import { postContact } from 'actions'
import withStyles from '@material-ui/core/styles/withStyles'
import dashboardStyle from 'assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx'
import ContactForm from 'views/Contact/ContactForm.jsx'
import UserReduxForm from 'views/Admin/Users/UserReduxForm.jsx'
import AlertDialog from 'components/Dialog/AlertDialog.jsx'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Typography'
import ReCAPTCHA from "react-google-recaptcha";
const RECAPTCHA_SITE_KEY = process.env.RECAPTCHA_SITE_KEY

import LoadSuccessErrorDialog from 'components/Dialog/LoadSuccessErrorDialog.jsx'

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      values: {},
      submitOpen: false
    }
    this.reCaptchaRef = React.createRef()
    this.closeSubmit = this.closeSubmit.bind(this)
  }
  closeSubmit() {
    this.setState({submitOpen: false})
  }
  submit = values => {
    // console.log("submit")
    // console.dir(values)
    this.setState({values: values, submitOpen: true}, () => {
      // console.log("executing recaptcha")
      this.reCaptchaRef.current.execute()
    })
  }
  onChange = token => {
    // console.dir("reCAPTCHA token => ", token)
    this.setState({ values: {...this.state.values, token: token}}, () => {
      // console.dir(this.state.values)
      this.props.postContact(this.state.values)
    })
  }

  head(){
    return (
      <Helmet key={this.props.location} title={"App Title - Contact Us"} meta={[
          {name: "description", content: "Need to get into contact with us? This sure looks like the best place to do it."}
        ]}/>
    )
  }

  render(){
    const { classes, route, ...rest } = this.props;
    const text = `Have any questions or concerns? We are here to help and would love to hear from you. Here's how to get in touch with us.`

    return (
      <div className={`slide${route.zIndex}`}>
        {this.head()}
        <div className={classes.content}>
          <div style={{marginBottom: "20px"}}>
            <Typography style={{textAlign: "center"}} variant={'h4'}>{text}</Typography>
          </div>
          <div style={{display:"flex", justifyContent: "center", marginBottom: "20px"}}>
            <div>
              <Typography style={{textAlign: "center"}} variant={'h5'}>
                Mailing Address
              </Typography>
              <Typography style={{textAlign: "center"}} variant={'body2'}>
                5564 W. Philadelphia St.
              </Typography>
              <Typography style={{textAlign: "center"}} variant={'body2'}>
                Detroit, MI
              </Typography>
              <Typography style={{textAlign: "center"}} variant={'body2'}>
                48218
              </Typography>
            </div>
          </div>
          <ContactForm onSubmit={this.submit}/>
          <ReCAPTCHA
            sitekey={RECAPTCHA_SITE_KEY}
            size={"invisible"}
            ref={this.reCaptchaRef}
            onChange={this.onChange}
          />
        </div>
        <LoadSuccessErrorDialog
          open={this.state.submitOpen}
          loading={this.props.postingContact}
          loadingMessage={"Sending..."}
          successMessage={this.props.postContactSuccessMessage}
          errorMessage={this.props.postContactFailMessage}
          handleClose={this.closeSubmit}
          />
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    postingContact: state.contact.postingContact,
    postContactSuccessMessage: state.contact.postContactSuccessMessage,
    postContactFailMessage: state.contact.postContactFailMessage
  }
}
export default {
  component: connect(mapStateToProps, {postContact})(withRouter(withStyles(dashboardStyle)(Contact)))
}
