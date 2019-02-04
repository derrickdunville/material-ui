import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { postProduct, putProduct } from 'actions/productActions'
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

function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}
class ProductForm extends Component {
  constructor(props) {
    super(props);
    if(props.editing){
      this.state = {
        ...this.props.product,
        category: toTitleCase(this.props.product.category)
      }
    } else {
      this.state = {
        name:'',
        amount:'',
        description: '',
        interval: '',
        access: '',
        allow_renewals: false,
        trial_period: false,
        category: '',
        discord_role_id: '',
        file: undefined,
        cover_image: undefined,
        video_id: ''
      }
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleFileChange = this.handleFileChange.bind(this)
    this.handleFileCancel = this.handleFileCancel.bind(this)
  }
  handleChange(event){
    if(event.target.name === "allow_renewals" ||
      event.target.name === "trial_period" ){
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
    if(product.category == "class" && this.state.cover_image !== undefined){
      form_data.append('cover_image', this.state.cover_image)
    }
    form_data.append("product", JSON.stringify(product))
    if(this.props.editing){
      this.props.putProduct(this.props.product._id, form_data)
    } else {
      this.props.postProduct(this.props.history, form_data)
    }
  }

  render(){
    const { classes } = this.props;
    return(
      <div className={classes.formWrapper}>
        <form onSubmit={this.handleSubmit}>
          <Paper style={{backgroundColor: "#383838", padding: "10px", marginBottom: "10px"}}>
            <div style={{marginBottom: "10px"}}>Product Information</div>
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
              labelText="Name"
              inputType="text"
              formControlProps={{classes: { root: classes.formControl}, fullWidth: true}}
              inputProps={{
                name: 'name',
                value: this.state.name,
                onChange: this.handleChange,
                disabled: this.props.disabled
              }}
            />
            <CustomTextField
              labelText="Description"
              inputType="text"
              formControlProps={{classes: { root: classes.formControl}, fullWidth: true}}
              inputProps={{
                name: 'description',
                value: this.state.description,
                onChange: this.handleChange,
                disabled: this.props.disabled
              }}
            />
            <FormControl variant="outlined" style={{width: "100%", backgroundColor: "#202225", borderRadius: "4px"}}>
              <InputLabel style={{color: "white"}}>
                Category
              </InputLabel>
              <CustomSelect
                disabled={this.props.disabled}
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
                    name: 'video_id',
                    value: this.state.video_id,
                    onChange: this.handleChange,
                    disabled: this.props.disabled
                  }}
                />
              )}
              {this.state.category === 'Membership' && (
                <CustomTextField
                  labelText="Discord Role ID"
                  inputType="text"
                  formControlProps={{classes: { root: classes.formControl}, fullWidth: true}}
                  inputProps={{
                    name: 'discord_role_id',
                    value: this.state.discord_role_id,
                    onChange: this.handleChange,
                    disabled: this.props.disabled
                  }}
                />
              )}
              <FileInput
                disabled={this.props.disabled}
                label="Cover Image"
                labelWidth={100}
                exstentions=".png,.jpg"
                name="cover_image"
                onChange={this.handleFileChange}
                onCancel={this.handleFileCancel}
                formControlProps={{classes: { root: classes.formControl}, fullWidth: true}}
                />
              {(this.state.category === 'Script' || this.state.category === 'Scanner') && (
                <FileInput
                  disabled={this.props.disabled}
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
                onChange: this.handleChange,
                disabled: this.props.disabled
              }}
            />
            <FormControl classes={{root: classes.formControl}} variant="outlined" style={{width: "100%", backgroundColor: "#202225", borderRadius: "4px"}}>
              <InputLabel style={{color: "white"}}>
                Interval
              </InputLabel>
              <CustomSelect
                disabled={this.props.disabled}
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
                disabled={this.props.disabled}
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
          {!this.props.disabled && (
            <Button
              style={{width: '100px', height: '50px', float: "right"}}
              color="primary"
              type="submit"
              onClick={this.handleSubmit}>
              {!this.props.editing ? "Create" : "Save"}
            </Button>
          )}
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

export default connect(mapStateToProps, { postProduct, putProduct })(withRouter(withStyles(formStyle)(ProductForm)))

// <FormControlLabel
//   control={
//     <Checkbox
//       color="default"
//       name="allow_renewals"
//       checked={this.state.allow_renewals}
//       onChange={this.handleChange}
//       value="allow_renewals"
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
//       name="trial_period"
//       checked={this.state.trial_period}
//       onChange={this.handleChange}
//       value="trial_period"
//       classes={{
//        root: classes.checkboxRoot,
//        checked: classes.checked,
//       }}
//     />
//   }
//   label="Trial Period"
//   classes={{label: classes.formControlLabelRoot}}
// />
