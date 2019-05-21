import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { postProduct, putProduct } from 'actions/productActions'
import { Field, reduxForm, formValueSelector  } from 'redux-form'
import * as regex from 'utils/regex'

import Button from '@material-ui/core/Button'
import FormTextField from 'components/FormFields/FormTextField.jsx'
import FormSelect from 'components/FormFields/FormSelect.jsx'
import FormControlLabel from 'components/FormFields/FormControlLabel.jsx'
import FormCheckbox from 'components/FormFields/FormCheckbox.jsx'
import FileInput from 'components/FormFields/FileInput.jsx'

import AlertDialog from "components/Dialog/AlertDialog.jsx"
import ImageInput from "components/ImageInput/ImageInput.jsx"

import Paper from '@material-ui/core/Paper'

const selector = formValueSelector('product')

const validate = (values, props) => {
  const errors = {}
  if(!values.name){
    errors.name = "Required"
  }
  if(values.name && !regex.alpha.test(values.name)){
    errors.name = "Can only contain letters and spaces"
  }
  if(!values.description) {
    errors.description = "Required"
  }
  if(!values.category){
    errors.category = "Required"
  }

  if(!values.cover_image){
    errors.cover_image = "Required"
  }
  if(props.category === "membership" && !values.discord_role_id){
    errors.discord_role_id = "Required"
  }
  if((props.category === "script" || props.category === "scanner") && !values.file){
    errors.file = "Required"
  }
  if(props.category === "class" && !values.video_id){
    errors.video_id = "Required"
  }

  if(!values.amount){
    errors.amount = "Required"
  }
  if(values.amount && !regex.numeric.test(values.amount)){
    errors.amount = "Can only contain numbers"
  }
  if(!values.interval){
    errors.interval = "Required"
  }
  if(!values.access){
    errors.access = "Required"
  }
  return errors
}


class ProductReduxForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteOpen: false,
      editOpen: false,
      createOpen: false
    }
  }

  openDelete = () => {
    this.setState({deleteOpen: true})
  }
  closeDelete = () => {
    this.setState({deleteOpen: false})
  }
  handleDelete = () => {
    this.props.deleteUser(this.props.history, this.props.product._id)
  }

  openCreate = () => {
    this.setState({createOpen: true})
  }
  closeCreate = () => {
    this.setState({createOpen: false})
    let this2 = this
    setTimeout(function () {
      // this2.props.clearPostUser()
    }, 200);
  }

  openEdit = () => {
    this.setState({editOpen: true})
  }
  closeEdit = () => {
    this.setState({editOpen: false})
    // clearPutUser
    let this2 = this
    setTimeout(function () {
      // this2.props.clearPutUser()
    }, 200);
  }

  handleSubmit = (event) => {
    event.persist()
    event.preventDefault()
    console.log("submitting product")
    let form_data = new FormData()
    let product = {
      name: this.props.name,
      description: this.props.description,
      category: this.props.category,
      amount: this.props.amount,
      interval: this.props.interval,
      access: this.props.access,
    }

    if(this.props.category === 'membership' && this.props.discord_role_id){
      product.discord_role_id = this.props.discord_role_id
    }
    if(this.props.category === 'class' && this.props.video_id){
      product.video_id = this.props.video_id
    }
    if((this.props.category === 'script' || this.props.category === 'scanner') && this.props.file){
      form_data.append('uploaded_file', this.props.file.file)
    }

    if(this.props.cover_image){
      form_data.append('cover_image', this.props.cover_image.file)
    }

    form_data.append("product", JSON.stringify(product))
    if(this.props.editing){
      this.props.putProduct(this.props.product._id, form_data)
    } else {
      this.props.postProduct(this.props.history, form_data)
    }
  }

  render(){
    const { classes, invalid, pristine, editing} = this.props;
    console.dir(this.props)
    return(
      <form onSubmit={this.openCreate}>
        <Paper style={{backgroundColor: "#383838", padding: "10px", marginBottom: "10px"}}>
          <div style={{marginBottom: "10px"}}>Product Information</div>
          <Field name="name" label="Name" component={FormTextField} type="text"/>
          <Field name="description" label="Description" component={FormTextField} multiline rows="3" type="text"/>
          <Field name="category" label="Category" id="category-select" labelWidth={32} component={FormSelect} items={['membership', 'class', 'script', 'scanner']}/>
        </Paper>
        <Paper style={{backgroundColor: "#383838", padding: "10px", marginBottom: "10px"}}>
          <div style={{marginBottom: "10px"}}>Product Details</div>
          <Field name="cover_image" label="Cover Image" labelWidth={60} component={FileInput} accept={"image/*"} type="file"/>
          {this.props.category == "membership" &&
            <Field name="discord_role_id" label="Discord Role ID" component={FormTextField} type="text"/>
          }
          {this.props.category == "class" &&
            <Field name="video_id" label="Video ID" component={FormTextField} type="text"/>
          }
          {(this.props.category == "script" || this.props.category == "scanner") &&
            <Field name="file" label="File" labelWidth={60} component={FileInput} accept={".zip,.txt"}/>
          }
        </Paper>
        <Paper style={{backgroundColor: "#383838", padding: "10px", marginBottom: "10px"}}>
          <div style={{marginBottom: "10px"}}>Billing Details</div>
          <Field name="amount" label="Amount" component={FormTextField} type="text"/>
          <Field name="interval" label="Interval" id="interval-select" labelWidth={32} component={FormSelect} items={['one-time', 'week', 'month', 'year']}/>
          <Field name="access" label="Access" id="access-select" labelWidth={32} component={FormSelect} items={['lifetime', 'expire', 'fixed-expire']}/>
        </Paper>
          {!editing ?
            (
              <AlertDialog
                buttonProps={{
                  style: {width: '100px', margin: "0 0 0 10px", height: '56px', float: "right"},
                }}
                disabled={invalid || pristine}
                buttonText="Create"
                buttonColor="primary"
                loading={this.props.postingProduct}
                loadingMessage={"Creating Product..."}
                successMessage={this.props.postProductSuccessMessage}
                errorMessage={this.props.postProductErrorMessage}
                open={this.state.createOpen}
                title="Create New Product?"
                text="Are you sure you would like to create this new product?"
                leftAction={this.closeCreate}
                leftActionText="Cancel"
                leftActionColor="default"
                rightAction={this.handleSubmit}
                rightActionText="Create"
                rightActionColor="primary"
                onClick={this.openCreate}
                onClose={this.closeCreate}
                />
            ):(
              <AlertDialog
                buttonProps={{
                  style: {width: '100px', margin: "0 0 0 10px", height: '56px', float: "right"},
                }}
                disabled={invalid || pristine}
                buttonText="Save"
                buttonColor="primary"
                loading={this.props.puttingProduct}
                loadingMessage={"Saving User..."}
                successMessage={this.props.putProductSuccessMessage}
                errorMessage={this.props.putProductErrorMessage}
                open={this.state.editOpen}
                title="Save Product?"
                text="Are you sure you would like to save the changes for this product?"
                leftAction={this.closeEdit}
                leftActionText="Cancel"
                leftActionColor="default"
                rightAction={this.handleSubmit}
                rightActionText="Save"
                rightActionColor="primary"
                onClick={this.openEdit}
                onClose={this.closeEdit}
                />
            )
          }
          {editing &&
            <AlertDialog
              buttonProps={{
                style: {width: '100px', margin: "0 0 0 10px", height: '56px', float: "right"},
              }}
              buttonText="Delete"
              buttonColor="secondary"
              loading={this.props.deletingProduct}
              loadingMessage={"Deleting User..."}
              successMessage={this.props.deleteProductSuccessMessage}
              errorMessage={this.props.deleteProductErrorMessage}
              open={this.state.deleteOpen}
              title={`Delete ${this.props.product.name}?`}
              text="Are you sure you would like to delete this product? This will result in this product being end-dated. It will not actually be deleted permenantly but it will be masked and all associated records will also be end-dated. This action cannot be undone."
              leftAction={this.closeDelete}
              leftActionText="Cancel"
              leftActionColor="default"
              rightAction={this.handleDelete}
              rightActionText="Delete"
              rightActionColor="secondary"
              onClick={this.openDelete}
              onClose={this.closeDelete}
              />
          }
      </form>
    )
  }
}

function mapStateToProps(state, props) {

  return {
    initialValues: {...props.product},

    name: selector(state, 'name'),
    description: selector(state, 'description'),
    category: selector(state, 'category') || (props.product && props.product.category), // <== hack for SSR

    cover_image: selector(state, 'cover_image'),
    discord_role_id: selector(state, 'discord_role_id'),
    video_id: selector(state, 'video_id'),
    file: selector(state, 'file'),

    amount: selector(state, 'amount'),
    interval: selector(state, 'interval'),
    access: selector(state, 'access'),

    postingProduct: state.products.postingProduct,
    postProductSuccessMessage: state.products.postProductSuccessMessage,
    postProductErrorMessage: state.products.postProductErrorMessage,

    puttingProduct: state.products.puttingProduct,
    putProductSuccessMessage: state.products.putProductSuccessMessage,
    putProductErrorMessage: state.products.putProductErrorMessage,

    deletingProduct: state.products.deletingProduct,
    deleteProductSuccessMessage: state.products.deleteProductSuccessMessage,
    deleteProductErrorMessage: state.products.deleteProductErrorMessage
  }
}

ProductReduxForm = reduxForm({
  form: 'product',
  validate,
  enableReinitialize: true
})(withRouter(ProductReduxForm))

export default connect(
  mapStateToProps,
  {
    postProduct,
    putProduct
  }
)(ProductReduxForm)
