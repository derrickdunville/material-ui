import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton';

import FormControl from '@material-ui/core/FormControl';
import CustomOutlinedInput from 'components/OutlinedInput/CustomOutlinedInput.jsx'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment';
import Add from '@material-ui/icons/Add';
import Close from '@material-ui/icons/Close';
import logo from "assets/img/faces/marc.jpg";

function getImageUrl(image){
  if(image != null){
    return "https://s3.amazonaws.com/" + image.bucket + "/" + image.key
  } else {
    return null
  }
}
class Avatar extends Component {
  constructor(props){
    super(props);
    this.state = {
        file: '',
        image_url: getImageUrl(this.props.current)
    }
    this.handleFileChange = this.handleFileChange.bind(this)
    this.handleFileSelect = this.handleFileSelect.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }

  buildFileSelector(){
    const fileSelector = document.createElement('input')
    fileSelector.setAttribute('type', 'file')
    fileSelector.setAttribute('accept', this.props.exstentions)
    fileSelector.addEventListener('change', this.handleFileChange)
    return fileSelector
  }
  componentDidMount(){
    this.fileSelector = this.buildFileSelector()
  }
  handleFileSelect(event){
    event.preventDefault()
    this.fileSelector.click()
  }
  handleFileChange(event){
    const imageTypes = ["image/jpg", "image/png"]
    console.log(event.target.files[0].type)
    if(imageTypes.includes(event.target.files[0].type)){
      this.setState({
        file: event.target.files[0].name,
        image_url: URL.createObjectURL(event.target.files[0])
      })
    } else {
      this.setState({
        file: event.target.files[0].name,
      })
    }
    this.props.onChange(event.target.files[0])
  }
  handleRemove(event) {
    this.setState({
      file: '',
      image_url: null
    })
    this.props.onRemove()
  }

  render(){
    const { rest } = this.props
    return (
      <div>
        <div>
          <Button
            className="avatar_button"
            style={{
              position: "relative",
              width: "150px",
              height: "150px",
              padding: "0px"
            }}
            onClick={this.handleFileSelect}>
            <div id="avatar_button_text"
              style={{
                zIndex: "1",
                position: "absolute",
                width: "150px",
                height: "150px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius:"4px"
              }}>
              Change Avatar
            </div>
            <img src={this.state.image_url || logo}
              style={{
                borderRadius:"4px",
                position: "absolute",
                width: "150px",
                height: "150px"}}/>
          </Button>
        </div>
        <div style={{display: "flex", justifyContent: "center"}}>
          <Button style={{color: "white"}} onClick={this.handleRemove}>
            Remove
          </Button>
        </div>
      </div>
    )
  }
}

Avatar.propTypes = {
  onRemove: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Avatar
