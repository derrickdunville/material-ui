import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Select from 'react-select'
import { autocompleteSubscription, clearAutocomleteSubscription } from 'actions/autocompleteActions'
import CustomOutlinedInput from "components/OutlinedInput/CustomOutlinedInput.jsx"

const styles = {
  input:  (styles) => ({
    ...styles,
    color: "white",
    backgroundColor: "#202225"
  }),
  menu:  (styles) => ({
    ...styles,
    zIndex: "2",
    marginTop: "2px",
    backgroundColor: "#202225"
  }),
  control: (styles, state) => {
    return ({
    ...styles,
    marginBottom: "14px",
    height: "56px",
    width: "100%",
    color: "white",
    border: state.isFocused ? "1px solid #0FED8A" : "1px solid black",
    boxShadow: state.isFocused ? "inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102,175,233,.6)" : "none",
    backgroundColor: "#202225 !important",
    '&:hover' : {
      border: state.isFocused ? "1px solid #0FED8A" : "1px solid black"
    }
  })},
  option: (styles, { isFocused }) => ({
    ...styles,
    color: "white",
    backgroundColor: isFocused ? "#565656" : "#202225"
  }),
  singleValue: (styles) => ({
    ...styles,
    color: "white",
  })
}
class SubscriptionsAutoComplete extends Component {
  constructor(props){
    super(props);
    this.state = {
        searchInput: '',
        selected: null
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
        options={options}
        styles={styles}
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
  onCancel: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { autocompleteSubscription, clearAutocomleteSubscription })(SubscriptionsAutoComplete)
