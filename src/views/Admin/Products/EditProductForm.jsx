import React, { Component } from 'react'
import { connect } from 'react-redux'
import { putProduct } from 'actions/productActions'
import Button from "components/CustomButtons/Button.jsx";
import CustomTextField from 'components/CustomTextField/CustomTextField.jsx'
import withStyles from "@material-ui/core/styles/withStyles";
import formStyle from "assets/jss/material-dashboard-react/views/formStyle.jsx"

class CreateProductForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.product.name,
      amount: this.props.product.amout,
      description: this.props.product.description,
      interval: this.props.product.interval,
      access: this.props.product.access,
      category: this.props.product.category,
      discordRoleId: this.props.product.discordRoleId,

      file: undefined,
      coverImageFile: undefined,
      coverImageUrl: undefined,
      videoId: ''

    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event){
    if(event.target.name === 'name'){
        this.setState({ name: event.target.value })
    }
    if(event.target.name === 'amount'){
      this.setState({ amount: event.target.value })
    }
    if(event.target.name === 'description'){
      this.setState({ description: event.target.value })
    }
    if(event.target.name === 'interval'){
      this.setState({ interval: event.target.value })
    }
    if(event.target.name === 'access'){
      this.setState({ access: event.target.value })
    }
    if(event.target.name === 'discordRoleId'){
      this.setState({ category: event.target.value })
    }
    if(event.target.name === 'videoId'){
      this.setState({ category: event.target.value })
    }
  }
  handleSubmit(event){
    event.preventDefault()
    let form_data = new FormData()
    let product = {
      name: this.state.name,
      amount: this.state.amount,
      description: this.state.description
    }
    form_data.append("product", product)
    this.props.postProduct(form_data)
  }

  render(){
    const { classes } = this.props;
    return(
      <div className={classes.formWrapper}>
        <form onSubmit={this.handleSubmit}>
          <CustomTextField
            labelText="Name"
            inputType="text"
            formControlProps={{fullWidth: true}}
            inputProps={{
              name: 'name',
              value: this.state.name,
              onChange: this.handleChange
            }}
          />
          <CustomTextField
            labelText="Amount"
            inputType="text"
            formControlProps={{fullWidth: true}}
            inputProps={{
              name: 'amount',
              value: this.state.amount,
              onChange: this.handleChange
            }}
          />
          <CustomTextField
            labelText="Description"
            inputType="text"
            formControlProps={{fullWidth: true}}
            inputProps={{
              name: 'description',
              value: this.state.description,
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
    product: state.products.product
  }
}

export default connect(mapStateToProps, { putProduct })(withStyles(formStyle)(CreateProductForm))
