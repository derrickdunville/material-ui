import React, { Component } from 'react'
import { connect } from 'react-redux'
import { putTransaction } from 'actions/transactionActions'
import Button from "components/CustomButtons/Button.jsx";
import CustomTextField from 'components/CustomTextField/CustomTextField.jsx'
import withStyles from "@material-ui/core/styles/withStyles";
import formStyle from "assets/jss/material-dashboard-react/views/formStyle.jsx"

class EditTransactionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.transaction._id,
      transactionname: this.props.transaction.transactionname,
      email: this.props.transaction.email,
      password: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event){
    if(event.target.name === 'transactionname'){
        this.setState({ transactionname: event.target.value })
    }
    if(event.target.name === 'email'){
      this.setState({ email: event.target.value })
    }
    if(event.target.name === 'password'){
      this.setState({ password: event.target.value })
    }
  }
  handleSubmit(event){
    event.preventDefault()
    let form_data = new FormData()
    let transaction = {
      transactionname: this.state.transactionname,
      email: this.state.email,
    }
    if(this.state.password !== ''){
      transaction.password = this.state.password
    }
    form_data.append('transaction', JSON.stringify(transaction))
    this.props.putTransaction(this.state.id, form_data)
  }

  render(){
    const { classes } = this.props;
    return(
      <div className={classes.formWrapper}>
        <form onSubmit={this.handleSubmit}>
          <CustomTextField
            labelText="Transactionname"
            inputType="text"
            formControlProps={{classes: { root: classes.formControl}, fullWidth: true}}
            inputProps={{
              name: 'transactionname',
              value: this.state.transactionname,
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
    transaction: state.transactions.transaction,
    puttingTransaction : state.transactions.puttingTransaction,
    puttingTransactionError: state.transactions.puttingTransactionError
  }
}

export default connect(mapStateToProps, { putTransaction })(withStyles(formStyle)(EditTransactionForm))
