import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Select from 'react-select'
import { autocompleteUser, clearAutocomleteUser } from 'actions/autocompleteActions'
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
class UserAutoComplete extends Component {
  constructor(props){
    super(props);
    this.state = {
        searchInput: '',
        selectedUser: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }
  componentDidMount(){
    console.log("componentDidMount")
    this.props.clearAutocomleteUser()
  }
  handleInputChange(newInput){
    console.log("handleInputChange")
    this.setState({searchInput: newInput}, () => {
      if(this.state.searchInput !== ''){
        this.props.autocompleteUser(this.state.searchInput)
      } else {
        this.props.clearAutocomleteUser()
        console.log("should clear the users autocomplete list")
      }
    })
  }
  handleCancel(event){
    console.log("handleCancel")
  }
  handleChange(newValue){
    console.log("handleChange")
    console.log("UserAutocomplete: newValue - " + JSON.stringify(newValue))
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
        options={options}
        styles={styles}
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
  onCancel: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { autocompleteUser, clearAutocomleteUser })(UserAutoComplete)
