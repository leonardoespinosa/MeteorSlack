import React, { Component } from 'react'

export default class Header extends Component {
  render() {
    return (
      <div className='ui inverted segment'>
        <div className='ui inverted secondary menu'>
          <div onClick={this.props.onModalClick} className='active item'>
            <h1>{this.props.user}</h1>
          </div>
        </div>
      </div>
    )
  }
}