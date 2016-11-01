import React, { Component } from 'react'
import { Session } from 'meteor/session'
import classNames from 'classnames'
import ReactDOM from 'react-dom'

export default class Channel extends Component {
  handleClick() {
    const channel = ReactDOM.findDOMNode(this.refs.inputChannel).innerHTML
    this.props.onChangeChannel(channel)
  }

  render() {
    let styleItem = classNames({
      'item': true,
      'active': Session.get('channel') == this.props.name
    })

    return (
      <a className={styleItem} onClick={this.handleClick.bind(this)}>
        <span>#</span>
        <span ref='inputChannel'>{this.props.name}</span>
      </a>
    )
  }
}