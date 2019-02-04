import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postTransaction, putTransaction } from 'actions/transactionActions'
import Button from "components/CustomButtons/Button.jsx";
import CustomTextField from 'components/CustomTextField/CustomTextField.jsx'
import withStyles from "@material-ui/core/styles/withStyles";
import formStyle from "assets/jss/material-dashboard-react/views/formStyle.jsx"
import UserAutoComplete from 'components/AutoComplete/UserAutoComplete.jsx'
import ProductAutoComplete from 'components/AutoComplete/ProductAutoComplete.jsx'
import SubscriptionAutoComplete from 'components/AutoComplete/SubscriptionAutoComplete.jsx'
import CustomSelect from 'components/Select/CustomSelect.jsx'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import CustomOutlinedInput from 'components/OutlinedInput/CustomOutlinedInput.jsx'
import CustomDatePicker from 'components/DatePicker/CustomDatePicker.jsx'

class TransactionForm extends Component {
  constructor(props) {
    super(props);
    if(props.editing){
      this.state = {
        _id: this.props.transaction._id,
        trans_num: this.props.transaction.trans_num,
        user: {value: this.props.transaction.user._id, label: this.props.transaction.user.username},
        product: {value: this.props.transaction.product._id, label: this.props.transaction.product.name},
        amount: this.props.amount,
        sub_total: this.props.transaction.total,
        tax_amount: this.props.transaction.tax_amount,
        tax_rate: this.props.transaction.tax_rate,
        status: this.props.transaction.status,
        gateway: this.props.transaction.gateway,
        subscription: this.props.transaction.subscription || null,
        created_at: this.props.transaction.created_at,
        expires_at: this.props.transaction.expires_at
      }
    } else {
      this.state = {
        _id: '',
        trans_num: '',
        user: null,
        product: null,
        amount: '',
        sub_total: '',
        tax_amount: '',
        tax_rate: '',
        status: '',
        gateway: '',
        subscription: null,
        created_at: null,
        expires_at: null
      }
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCreateDateChange = this.handleCreateDateChange.bind(this)
    this.handleExpireDateChange = this.handleExpireDateChange.bind(this)
    this.handleUserChange = this.handleUserChange.bind(this)
    this.handleProductChange = this.handleProductChange.bind(this)
    this.handleSubscriptionChange = this.handleSubscriptionChange.bind(this)
  }
  handleChange(event){
    this.setState({ [event.target.name]: event.target.value })
  }
  handleCreateDateChange(date){
    console.log("date change", date)
    this.setState({created_at: date})
  }
  handleExpireDateChange(date){
    console.log("date change", date)
    this.setState({expires_at: date})
  }
  handleProductChange(value){
    this.setState({product: value})
  }
  handleUserChange(value){
    this.setState({user: value})
  }
  handleSubscriptionChange(value){
    this.setState({subscription: value})
  }
  handleSubmit(event){
    event.preventDefault()
    if(!this.props.disabled){
      let transaction = {
        trans_num: this.state.trans_num,
        user: this.state.user.value,
        product: this.state.product.value,
        amount: this.state.amount,
        total: this.state.sub_total,
        gateway: this.state.gateway.toLowerCase(),
        status: this.state.status.toLowerCase(),
        created_at: this.state.created_at,
        expires_at: this.state.expires_at
      }
      if(this.state.tax_amount != '') transaction.tax_amount = this.state.tax_amount
      if(this.state.tax_rate !== '') transaction.tax_rate = this.state.tax_rate
      if(this.state.subscriptions != null) transaction.subscription = this.state.subscription.value
      if(this.props.editing) {
        transaction._id = this.props.transaction._id
        this.props.putTransaction(transaction)
      } else {
        this.props.postTransaction(transaction)
      }
    }
  }

  render(){
    const { classes } = this.props;
    return(
      <div className={classes.formWrapper}>
        <form onSubmit={this.handleSubmit}>
          {this.props.editing && (
            <CustomTextField
              labelText="ID"
              inputType="text"
              formControlProps={{classes: { root: classes.formControl}, fullWidth: true}}
              inputProps={{
                name: '_id',
                value: this.state._id,
                onChange: this.handleChange,
                disabled: true
              }}
            />
          )}
          <CustomTextField
            labelText="Transaction Number"
            inputType="text"
            formControlProps={{classes: { root: classes.formControl}, fullWidth: true}}
            inputProps={{
              name: 'trans_num',
              value: this.state.trans_num,
              onChange: this.handleChange,
              disabled: this.props.disabled
            }}
          />
          <UserAutoComplete
            disabled={this.props.disabled}
            value={this.state.user}
            onChange={this.handleUserChange}
            />
          <ProductAutoComplete
            disabled={this.props.disabled}
            value={this.state.product}
            onChange={this.handleProductChange}
            />
            <CustomTextField
              labelText="Amount"
              inputType="text"
              formControlProps={{classes: { root: classes.formControl}, fullWidth: true}}
              inputProps={{
                name: 'amount',
                type: "text",
                value: this.state.amount,
                onChange: this.handleChange,
                disabled: this.props.disabled
              }}
            />
          <CustomTextField
            labelText="Sub-Total"
            inputType="text"
            formControlProps={{classes: { root: classes.formControl}, fullWidth: true}}
            inputProps={{
              name: 'sub_total',
              type: "text",
              value: this.state.sub_total,
              onChange: this.handleChange,
              disabled: this.props.disabled
            }}
          />
          <CustomTextField
            labelText="Tax Amount"
            inputType="text"
            formControlProps={{classes: { root: classes.formControl}, fullWidth: true}}
            inputProps={{
              name: 'tax_amount',
              type: "text",
              value: this.state.tax_amount,
              onChange: this.handleChange,
              disabled: this.props.disabled
            }}
          />
          <CustomTextField
            labelText="Tax Rate"
            inputType="text"
            formControlProps={{classes: { root: classes.formControl}, fullWidth: true}}
            inputProps={{
              name: 'tax_rate',
              type: "text",
              value: this.state.tax_rate,
              onChange: this.handleChange,
              disabled: this.props.disabled
            }}
          />
          <FormControl classes={{root: classes.formControl}} variant="outlined" style={{width: "100%", backgroundColor: "#202225", borderRadius: "4px"}}>
            <InputLabel style={{color: "white"}}>
              Status
            </InputLabel>
            <CustomSelect
              disabled={this.props.disabled}
              value={this.state.status}
              onChange={this.handleChange}
              name="status"
              renderValue={value => `${value}`}
              input={<CustomOutlinedInput labelWidth={48} name="filter"/>}
              items={["Complete", "Pending", "Failed", "Refunded"]}
              >
            </CustomSelect>
          </FormControl>
          <FormControl classes={{root: classes.formControl}} variant="outlined" style={{width: "100%", backgroundColor: "#202225", borderRadius: "4px"}}>
            <InputLabel style={{color: "white"}}>
              Gateway
            </InputLabel>
            <CustomSelect
              disabled={this.props.disabled}
              value={this.state.gateway}
              onChange={this.handleChange}
              name="gateway"
              renderValue={value => `${value}`}
              input={<CustomOutlinedInput labelWidth={61} name="filter"/>}
              items={["Manual", "Stripe"]}
              >
            </CustomSelect>
          </FormControl>
          <SubscriptionAutoComplete
            disabled={this.props.disabled}
            value={this.state.subscription}
            onChange={this.handleSubscriptionChange}
            />
          <CustomDatePicker
            keyboard
            clearable
            variant="outlined"
            label="Created"
            name="created_at"
            format="MM/dd/yyyy"
            disabled={this.props.disabled}
            value={this.state.created_at}
            onChange={this.handleCreateDateChange}
            mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
          />
        <CustomDatePicker
            keyboard
            clearable
            variant="outlined"
            label="Expires"
            name="expires_at"
            format="MM/dd/yyyy"
            disabled={this.props.disabled}
            value={this.state.expires_at}
            onChange={this.handleExpireDateChange}
            mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
          />
        {!this.props.disabled && (
          <div>
            <Button
              style={{width: '100px', height: '50px', float: "right"}}
              color="primary"
              type="submit"
              onClick={this.handleSubmit}>
              {this.props.editing ? "Save" : "Create"}
            </Button>
          </div>
        )}
        </form>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    transaction: state.transactions.transaction
  }
}

export default connect(mapStateToProps, { postTransaction, putTransaction })(withStyles(formStyle)(TransactionForm))
