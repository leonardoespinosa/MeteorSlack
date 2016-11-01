import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'

export default class ProfileModal extends Component {
  componentDidMount() {
    const modalUser = ReactDOM.findDOMNode(this.refs.userModal)
    $(modalUser).modal()
  }

  handleSubmit(e) {
    const imageView = ReactDOM.findDOMNode(this.refs.imageView)
    const fileElm = ReactDOM.findDOMNode(this.refs.pic)
    const imagePath = fileElm.files[0]
    const reader = new FileReader()

    const _this = this
    reader.onload = function(fileLoad) {
      imageView.src = reader.result
      _this.props.onImageInsert(imagePath.name, reader.result)
    }

    reader.readAsDataURL(imagePath)
  }

  render() {
    let url_photo
    if(Meteor.user().profile != undefined)
      url_photo= Meteor.user().profile.url_photo
    else
      url_photo= '/images/coco_thumb.jpg'

    return (
      <div ref='userModal' className='ui modal'>
        <i className="close icon"></i>
        <div className='header'>
          <h1>{this.props.username}</h1>
        </div>
        <div className="image content">
          <div className="ui medium image">
            <img ref='imageView' src={url_photo} alt=""/>
          </div>
          <div className="description">
            <div className="ui header">
              Foto de perfil
            </div>
            <p>
              Puedes cambiar tu foto de perfil, en el enlace de abajo
              esta se actualizara al cambio...
              <i class=""></i>
            </p>
            <form className='ui form'>
              <div className="field">
                <input onChange={this.handleSubmit.bind(this)} type="file" ref='pic' accept="image/x-png" />
              </div>
            </form> 
          </div>
        </div>
      </div>
    )
  }
}