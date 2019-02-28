import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { postContact } from 'actions'
import Button from '@material-ui/core/Button'
import CustomTextField from 'components/CustomTextField/CustomTextField.jsx'
import withStyles from '@material-ui/core/styles/withStyles'
import formStyle from 'assets/jss/material-dashboard-react/views/formStyle.jsx'
import { Field, reduxForm } from 'redux-form'
import TextField from '@material-ui/core/TextField'


const validate = values => {
  const errors = {}
  const requiredFields = [
    'name',
    'email',
    'subject',
    'message'
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address'
  }
  return errors
}

const renderTextField = ({
  label,
  type,
  input,
  meta: { touched, invalid, error},
  ...custom
}) => (
  <CustomTextField
    labelText={label}
    inputType={type}
    formControlProps={{fullWidth: true}}
    inputProps={{
      ...input
    }}
    placeholder={label}
    textFieldProps={{
      helperText: touched && error,
      error: touched && invalid
    }}
  />
)

const renderMultilineTextField = ({
  label,
  type,
  input,
  meta: { touched, invalid, error},
  ...custom
}) => (
  <CustomTextField
    labelText={label}
    inputType={type}
    formControlProps={{fullWidth: true}}
    inputProps={{
      ...input
    }}
    placeholder={label}
    textFieldProps={{
      rows: "2",
      multiline: true,
      helperText: touched && error,
      error: touched && invalid
    }}
  />
)
class ContactForm extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    const { classes, handleSubmit } = this.props;
    return(
      <div className={classes.formWrapper}>
        <form onSubmit={handleSubmit}>
          <div style={{marginBottom: "10px"}}>
            <Field name="name" label="Name" component={renderTextField} type="text" />
          </div>
          <div style={{marginBottom: "10px"}}>
            <Field name="email" label="Email" component={renderTextField} type="text" />
          </div>
          <div style={{marginBottom: "10px"}}>
            <Field name="subject" label="Subject" component={renderTextField} type="text" />
          </div>
          <div style={{marginBottom: "10px"}}>
            <Field name="message" label="Message" component={renderMultilineTextField} type="textarea" />
          </div>
          <div className={"contact"} style={{display: "flex", width: "100%", alignItems: "center"}}>
            <div style={{color: "#898989", fontSize: "14px", fontWeight: "1", width: "100%"}}>
              This site is protected by reCAPTCHA and the Google
              <a style={{color: "##2196f3"}} href="https://policies.google.com/privacy"> Privacy Policy</a> and
              <a style={{color: "##2196f3"}} href="https://policies.google.com/terms"> Terms of Service</a> apply.
            </div>
            <Button variant="outlined" color="primary" type="submit">Send</Button>
          </div>
        </form>
      </div>
    )
  }
}

ContactForm = reduxForm({
  form: 'contact',
  validate
})(ContactForm)

export default withStyles(formStyle)(ContactForm)
