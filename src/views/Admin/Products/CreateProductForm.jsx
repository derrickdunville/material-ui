import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postProduct } from 'actions/productActions'
import Button from "components/CustomButtons/Button.jsx"
import CustomTextField from 'components/CustomTextField/CustomTextField.jsx'
import CustomSelect from "components/Select/CustomSelect.jsx"
import CustomOutlinedInput from 'components/OutlinedInput/CustomOutlinedInput.jsx'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from "@material-ui/core/FormControl"
import FormControlLabel from '@material-ui/core/FormControlLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Checkbox from '@material-ui/core/Checkbox'
import Check from '@material-ui/icons/Check'
import Paper from '@material-ui/core/Paper'

import ImageInput from 'components/ImageInput/ImageInput.jsx'
import FileInput from 'components/FileInput/FileInput.jsx'

import withStyles from "@material-ui/core/styles/withStyles"
import formStyle from "assets/jss/material-dashboard-react/views/formStyle.jsx"

class CreateProductForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name:'',
      amount:'',
      description: '',
      interval: '',
      access: '',
      allowRenewals: false,
      trialPeriod: false,
      category: '',
      discordRoleId: '',

      file: undefined,
      coverImageFile: undefined,
      videoId: ''

    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleFileChange = this.handleFileChange.bind(this)
    this.handleFileCancel = this.handleFileCancel.bind(this)
  }
  handleChange(event){
    if(event.target.name === "allowRenewals" ||
      event.target.name === "trialPeriod" ){
      this.setState({[event.target.name]: event.target.checked})
    } else {
      this.setState({[event.target.name]: event.target.value })
    }
  }
  handleFileChange(target, file){
    this.setState({[target]: file})
  }
  handleFileCancel(target){
    this.setState({[target]: undefined})
  }
  handleSubmit(event){
    event.preventDefault()
    let form_data = new FormData()
    let product = {
      name: this.state.name,
      description: this.state.description,
      category: this.state.category.toLowerCase(),
      amount: this.state.amount,
      interval: this.state.interval.toLowerCase(),
      access: this.state.access.toLowerCase(),
    }
    if(product.category == "class" && this.state.coverImageFile !== undefined){
      form_data.append('cover_image', this.state.coverImageFile)
    }
    form_data.append("product", JSON.stringify(product))
    this.props.postProduct(form_data)
  }


  render(){
    const { classes } = this.props;
    return(
      <div className={classes.formWrapper}>
        <form onSubmit={this.handleSubmit}>
          <Paper style={{backgroundColor: "#383838", padding: "10px", marginBottom: "10px"}}>
            <div style={{marginBottom: "10px"}}>Product Information</div>
            <CustomTextField
              labelText="Name"
              inputType="text"
              formControlProps={{classes: { root: classes.formControl}, fullWidth: true}}
              inputProps={{
                name: 'name',
                value: this.state.name,
                onChange: this.handleChange
              }}
            />
            <CustomTextField
              labelText="Description"
              inputType="text"
              formControlProps={{classes: { root: classes.formControl}, fullWidth: true}}
              inputProps={{
                name: 'description',
                value: this.state.description,
                onChange: this.handleChange
              }}
            />
            <FormControl variant="outlined" style={{width: "100%", backgroundColor: "#202225", borderRadius: "4px"}}>
              <InputLabel style={{color: "white"}}>
                Category
              </InputLabel>
              <CustomSelect
                value={this.state.category}
                onChange={this.handleChange}
                name="category"
                renderValue={value => `${value}`}
                input={<CustomOutlinedInput labelWidth={64} name="filter"/>}
                items={["Membership", "Class", "Script", "Scanner"]}
                >
              </CustomSelect>
            </FormControl>
          </Paper>
          {this.state.category !== '' && (
            <Paper style={{backgroundColor: "#383838", padding: "10px", marginBottom: "10px"}}>
              <div style={{marginBottom: "10px"}}>{this.state.category} Details</div>
              {this.state.category === 'Class' && (
                <CustomTextField
                  labelText="Video ID"
                  inputType="text"
                  formControlProps={{classes: { root: classes.formControl}, fullWidth: true}}
                  inputProps={{
                    name: 'videoId',
                    value: this.state.videoId,
                    onChange: this.handleChange
                  }}
                />
              )}
              {this.state.category === 'Membership' && (
                <CustomTextField
                  labelText="Discord Role ID"
                  inputType="text"
                  formControlProps={{classes: { root: classes.formControl}, fullWidth: true}}
                  inputProps={{
                    name: 'discordRoleId',
                    value: this.state.discordRoleId,
                    onChange: this.handleChange
                  }}
                />
              )}
              <FileInput
                label="Cover Image"
                labelWidth={100}
                exstentions=".png,.jpg"
                name="coverImageFile"
                onChange={this.handleFileChange}
                onCancel={this.handleFileCancel}
                formControlProps={{classes: { root: classes.formControl}, fullWidth: true}}
                />
              {(this.state.category === 'Script' || this.state.category === 'Scanner') && (
                <FileInput
                  label="File"
                  labelWidth={26}
                  exstentions=".txt"
                  name="file"
                  onChange={this.handleFileChange}
                  onCancel={this.handleFileCancel}
                  />
              )}
            </Paper>
          )}
          <Paper style={{backgroundColor: "#383838", padding: "10px", marginBottom: "10px"}}>
            <div style={{marginBottom: "10px"}}>Billing Details</div>
            <CustomTextField
              labelText="Amount"
              inputType="text"
              formControlProps={{classes: { root: classes.formControl}, fullWidth: true}}
              inputProps={{
                name: 'amount',
                value: this.state.amount,
                onChange: this.handleChange
              }}
            />
            <FormControl classes={{root: classes.formControl}} variant="outlined" style={{width: "100%", backgroundColor: "#202225", borderRadius: "4px"}}>
              <InputLabel style={{color: "white"}}>
                Interval
              </InputLabel>
              <CustomSelect
                value={this.state.interval}
                onChange={this.handleChange}
                name="interval"
                renderValue={value => `${value}`}
                input={<CustomOutlinedInput labelWidth={64} name="filter"/>}
                items={["One-Time", "Week", "Month", "Year"]}
                >
              </CustomSelect>
            </FormControl>
            <FormControl variant="outlined" style={{width: "100%", backgroundColor: "#202225", borderRadius: "4px"}}>
              <InputLabel style={{color: "white"}}>
                Access
              </InputLabel>
              <CustomSelect
                value={this.state.access}
                onChange={this.handleChange}
                name="access"
                renderValue={value => `${value}`}
                input={<CustomOutlinedInput labelWidth={64} name="filter"/>}
                items={["Lifetime", "Expire", "Fixed-Expire"]}
                >
              </CustomSelect>
            </FormControl>
          </Paper>
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
    products: state.products
  }
}

export default connect(mapStateToProps, { postProduct })(withStyles(formStyle)(CreateProductForm))

// <FormControlLabel
//   control={
//     <Checkbox
//       color="default"
//       name="allowRenewals"
//       checked={this.state.allowRenewals}
//       onChange={this.handleChange}
//       value="allowRenewals"
//       classes={{
//        root: classes.checkboxRoot,
//        checked: classes.checked,
//       }}
//     />
//   }
//   label="Allow Renewals"
//   classes={{label: classes.formControlLabelRoot}}
// />
// <FormControlLabel
//   control={
//     <Checkbox
//       color="default"
//       name="trialPeriod"
//       checked={this.state.trialPeriod}
//       onChange={this.handleChange}
//       value="trialPeriod"
//       classes={{
//        root: classes.checkboxRoot,
//        checked: classes.checked,
//       }}
//     />
//   }
//   label="Trial Period"
//   classes={{label: classes.formControlLabelRoot}}
// />
