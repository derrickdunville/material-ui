import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Select from 'react-select'
import { autocompleteProduct, clearAutocomleteProduct } from 'actions/autocompleteActions'
import CustomOutlinedInput from "components/OutlinedInput/CustomOutlinedInput.jsx"
import autoCompleteStyle from "assets/jss/material-dashboard-react/components/autoCompleteStyle.jsx"

class ProductsAutoComplete extends Component {
  constructor(props){
    super(props);
    this.state = {
        searchInput: '',
        selected: this.props.value
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }
  componentDidMount(){
    this.props.clearAutocomleteProduct()
  }
  handleInputChange(newInput){
    this.setState({searchInput: newInput}, () => {
      if(this.state.searchInput !== ''){
        this.props.autocompleteProduct(this.state.searchInput)
      } else {
        this.props.clearAutocomleteProduct()
      }
    })
  }
  handleChange(newValue){
    this.setState({ selected: newValue }, () => {
      this.props.onChange(newValue)
    })
  }
  render(){
    const { rest } = this.props
    let options = []
    this.props.products.map(product => {
      options.push({value: product._id, label: product.name})
    })
    return (
      <Select
        value={this.state.selected}
        options={options}
        styles={autoCompleteStyle}
        isDisabled={this.props.disabled}
        isSearchable={true}
        isClearable={true}
        onChange={this.handleChange}
        onInputChange={this.handleInputChange}
        placeholder="Product" />
    )
  }
}

function mapStateToProps(state) {
  return {
    products: state.autocomplete.products
  }
}

ProductsAutoComplete.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { autocompleteProduct, clearAutocomleteProduct })(ProductsAutoComplete)
