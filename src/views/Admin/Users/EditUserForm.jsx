import React, { Component } from 'react'
import { connect } from 'react-redux'
import { putUser } from 'actions/userActions'
import Button from "components/CustomButtons/Button.jsx";
import CustomTextField from 'components/CustomTextField/CustomTextField.jsx'
import withStyles from "@material-ui/core/styles/withStyles";
import formStyle from "assets/jss/material-dashboard-react/views/formStyle.jsx"

import CustomSelect from 'components/Select/CustomSelect.jsx'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import CustomOutlinedInput from 'components/OutlinedInput/CustomOutlinedInput.jsx'
import CustomDatePicker from 'components/DatePicker/CustomDatePicker.jsx'

class EditUserForm extends Component {
  constructor(props) {
    super(props);
    if(this.props.user)
    this.state = {
      ...this.props.user
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event){
    if(event.target.name === 'username'){
        this.setState({ username: event.target.value })
    }
    if(event.target.name === 'email'){
      this.setState({ email: event.target.value })
    }
    if(event.target.name === 'password'){
      this.setState({ password: event.target.value })
    }
    if(event.target.name === 'role'){
      this.setState({ roles: [event.target.value] })
    }
  }
  handleSubmit(event){
    event.preventDefault()
    let form_data = new FormData()
    let user = {
      username: this.state.username,
      email: this.state.email,
    }
    if(this.state.password !== ''){
      user.password = this.state.password
    }
    form_data.append('user', JSON.stringify(user))
    this.props.putUser(this.state.id, form_data)
  }

  render(){
    const { classes } = this.props;
    return(
      <div className={classes.formWrapper}>
        <form onSubmit={this.handleSubmit}>
          <CustomTextField
            labelText="Username"
            inputType="text"
            formControlProps={{classes: { root: classes.formControl}, fullWidth: true}}
            inputProps={{
              name: 'username',
              value: this.state.username,
              onChange: this.handleChange
            }}
          />
          <CustomTextField
            labelText="Email"
            inputType="text"
            formControlProps={{classes: { root: classes.formControl}, fullWidth: true}}
            inputProps={{
              name: 'email',
              value: this.state.email,
              onChange: this.handleChange
            }}
          />
          <CustomTextField
            labelText="Password"
            inputType="password"
            formControlProps={{classes: { root: classes.formControl}, fullWidth: true}}
            inputProps={{
              name: 'password',
              type: "password",
              value: this.state.password,
              onChange: this.handleChange
            }}
          />
          <FormControl classes={{root: classes.formControl}} variant="outlined" style={{width: "100%", backgroundColor: "#202225", borderRadius: "4px"}}>
            <InputLabel style={{color: "white"}}>
              Role
            </InputLabel>
            <CustomSelect
              disabled={this.props.disabled}
              value={this.state.roles[0]}
              onChange={this.handleChange}
              name="role"
              renderValue={value => `${value}`}
              input={<CustomOutlinedInput labelWidth={25} name="filter"/>}
              items={["Everyone", "Admin", "Member"]}
              >
            </CustomSelect>
          </FormControl>
        <Button
          style={{width: '100px', height: '50px', float: "right"}}
          color="primary"
          type="submit"
          onClick={this.handleSubmit}>
          Save
        </Button>
        </form>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    user: state.users.user,
    puttingUser : state.users.puttingUser,
    puttingUserError: state.users.puttingUserError
  }
}

export default connect(mapStateToProps, { putUser })(withStyles(formStyle)(EditUserForm))
