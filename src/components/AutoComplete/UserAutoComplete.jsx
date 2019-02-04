import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Select from 'react-select'
import { autocompleteUser, clearAutocomleteUser } from 'actions/autocompleteActions'
import CustomOutlinedInput from "components/OutlinedInput/CustomOutlinedInput.jsx"
import autoCompleteStyle from "assets/jss/material-dashboard-react/components/autoCompleteStyle.jsx"

class UserAutoComplete extends Component {
  constructor(props){
    super(props);
    this.state = {
        searchInput: '',
        selectedUser: this.props.value,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }
  componentDidMount(){
    this.props.clearAutocomleteUser()
  }
  handleInputChange(newInput){
    this.setState({searchInput: newInput}, () => {
      if(this.state.searchInput !== ''){
        this.props.autocompleteUser(this.state.searchInput)
      } else {
        this.props.clearAutocomleteUser()
      }
    })
  }
  handleChange(newValue){
    this.setState({ selectedUser: newValue }, () => {
      this.props.onChange(newValue)
    })
  }
  render(){
    const { rest } = this.props
    let options = []
    this.props.users.map(user => {
      options.push({value: user._id, label: user.username})
    })
    return (
      <Select
        value={this.state.selectedUser}
        className="select"
        classNamePrefix="select"
        options={options}
        styles={autoCompleteStyle}
        isDisabled={this.props.disabled}
        isSearchable={true}
        isClearable={true}
        onChange={this.handleChange}
        onInputChange={this.handleInputChange}
        placeholder="User" />
    )
  }
}

function mapStateToProps(state) {
  return {
    users: state.autocomplete.users
  }
}

UserAutoComplete.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { autocompleteUser, clearAutocomleteUser })(UserAutoComplete)
