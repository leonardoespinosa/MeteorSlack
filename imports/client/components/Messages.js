import $ from 'jquery'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import Message from './Message'

export default class Messages extends Component {
  componentDidMount() {
    const message_list = ReactDOM.findDOMNode(this.refs.messageList)
    const maxScroll = $(message_list)[0].scrollWidth
    message_list.scrollTop = maxScroll
    $(message_list).animate({ 'scrollTop': maxScroll*10 }, 500)
  }

  render() {
    let messages = this.props.messages.map((message) => {
      return(<Message key={message._id} userImg={message.userImg} username={message.user} message={message.message}/>)
    })

    return (
      <div ref='messageList' className='messages__message-list ui top attached segment'>
        {messages}
      </div>
    )
  }
}