import React, { Component } from 'react'

export default class Message extends Component {
  render() {
    const imageSize = {
      width: '5%',
      marginRight: '2%'
    }
    
    const messageAlg = {
      "textAlign":"left"
    }

    return (
      <div className='ui olive icon message'>
        <img style={imageSize} src={this.props.userImg}/>
        <div style={messageAlg} className="content">
          <div className='header'>
            <h2>{this.props.username}</h2>
          </div>
          <p>{this.props.message}</p>
        </div>
      </div>
    )
  }
}