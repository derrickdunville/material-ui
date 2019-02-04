import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Select from 'react-select'
import { autocompleteSubscription, clearAutocomleteSubscription } from 'actions/autocompleteActions'
import CustomOutlinedInput from "components/OutlinedInput/CustomOutlinedInput.jsx"
import autoCompleteStyle from "assets/jss/material-dashboard-react/components/autoCompleteStyle.jsx"

class SubscriptionsAutoComplete extends Component {
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
    this.props.clearAutocomleteSubscription()
  }
  handleInputChange(newInput){
    this.setState({searchInput: newInput}, () => {
      if(this.state.searchInput !== ''){
        this.props.autocompleteSubscription(this.state.searchInput)
      } else {
        this.props.clearAutocomleteSubscription()
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
    this.props.subscriptions.map(subscription => {
      options.push({value: subscription._id, label: subscription.subscription_id})
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
        placeholder="Subscription" />
    )
  }
}

function mapStateToProps(state) {
  return {
    subscriptions: state.autocomplete.subscriptions
  }
}

SubscriptionsAutoComplete.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { autocompleteSubscription, clearAutocomleteSubscription })(SubscriptionsAutoComplete)
