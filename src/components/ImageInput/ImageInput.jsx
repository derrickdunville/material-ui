import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'

class ImageInput extends Component {
  constructor(props){
    super(props);
    this.state = {
        image_file: '',
        image_url: null
    }
    this.handleFileChange = this.handleFileChange.bind(this)
    this.handleFileSelect = this.handleFileSelect.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }
  buildFileSelector(){
    console.log("buildFileSelector")
    const fileSelector = document.createElement('input')
    fileSelector.setAttribute('type', 'file')
    fileSelector.setAttribute('accept', '.jpg,.png')
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
    console.dir(event.target.value)
    this.setState({
      image_file: event.target.value,
      image_url: URL.createObjectURL(event.target.files[0])
    })
    if(this.props.onChange !== undefined){
      console.log("onChange provided")
    }
    this.props.onChange(event.target.files[0])
    console.log("file changed")
  }
  handleCancel(){
    this.props.onCancel()
  }
  render(){
    let empty = (
      <div>

      </div>
    )
    return (
      <div>
        <div>
          <Button onClick={this.handleFileSelect}>Select Image</Button>
        </div>
        <div>
          <img src={this.state.image_url}
            style={{width: '198px', height: '198px', borderRadius: '5px'}}/>
        </div>
      </div>
    )
  }
}

ImageInput.propTypes = {

};

export default ImageInput
