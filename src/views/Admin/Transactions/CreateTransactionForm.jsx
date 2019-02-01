import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postTransaction } from 'actions/transactionActions'
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

class CreateTransactionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trans_num:'',
      user: null,
      product: null,
      sub_total: '',
      tax_amount: '',
      tax_rate: '',
      status: '',
      gateway: '',
      subscription: null,
      created_at: null,
      expires_at: null
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
    let transaction = {
      trans_num: this.state.trans_num,
      user: this.state.user.value,
      product: this.state.product.value,
      total: this.state.sub_total,
      gateway: this.state.gateway.toLowerCase(),
      status: this.state.status.toLowerCase(),
      created_at: this.state.created_at,
      expires_at: this.state.expires_at
    }
    if(this.state.tax_amount != '') transaction.tax_amount = this.state.tax_amount
    if(this.state.tax_rate !== '') transaction.tax_rate = this.state.tax_rate
    if(this.state.subscriptions != null) transaction.subscription = this.state.subscription.value
    this.props.postTransaction(transaction)
  }

  render(){
    const { classes } = this.props;
    return(
      <div className={classes.formWrapper}>
        <form onSubmit={this.handleSubmit}>
          <CustomTextField
            labelText="Transaction Number"
            inputType="text"
            formControlProps={{classes: { root: classes.formControl}, fullWidth: true}}
            inputProps={{
              name: 'trans_num',
              value: this.state.trans_num,
              onChange: this.handleChange
            }}
          />
          <UserAutoComplete
            onChange={this.handleUserChange}
            />
          <ProductAutoComplete
            onChange={this.handleProductChange}
            />
          <CustomTextField
            labelText="Sub-Total"
            inputType="text"
            formControlProps={{classes: { root: classes.formControl}, fullWidth: true}}
            inputProps={{
              name: 'sub_total',
              type: "text",
              value: this.state.sub_total,
              onChange: this.handleChange
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
              onChange: this.handleChange
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
              onChange: this.handleChange
            }}
          />
          <FormControl classes={{root: classes.formControl}} variant="outlined" style={{width: "100%", backgroundColor: "#202225", borderRadius: "4px"}}>
            <InputLabel style={{color: "white"}}>
              Status
            </InputLabel>
            <CustomSelect
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
            onChange={this.handleSubscriptionChange}
            />
          <CustomDatePicker
            keyboard
            clearable
            variant="outlined"
            label="Created"
            name="created_at"
            format="MM/dd/yyyy"
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
            value={this.state.expires_at}
            onChange={this.handleExpireDateChange}
            mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
          />
          <Button
            style={{width: '100px', height: '50px', float: "right"}}
            color="primary"
            type="submit"
            onClick={this.handleSubmit}>
            Create
          </Button>
        </form>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    transactions: state.transactions
  }
}

export default connect(mapStateToProps, { postTransaction })(withStyles(formStyle)(CreateTransactionForm))
