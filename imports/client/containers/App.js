import React, { Component, PropTypes } from 'react'
import $ from 'jquery'
import ReactDOM from 'react-dom'
import { Meteor } from 'meteor/meteor'
import { Session } from 'meteor/session'
import { createContainer } from 'meteor/react-meteor-data'

import AccountsUIWrapper from '../components/AccountsUIWrapper'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Listings from '../components/Listings'
import Messages from '../components/Messages'
import ProfileModal from '../components/ProfileModal'

import { MessagesCollection } from '../../collections/messages'
import { ChannelsCollection } from '../../collections/channels'
 
class App extends Component {
  constructor() {
    super()
    Session.set('channel', 'general')
  }

  sendMessage(message) {
    Meteor.call('message.insert', message, Session.get('channel'))
  }

  createChannel(channel) {
    Meteor.call('channel.insert', channel)
  }

  changeChannel(channel) {
    Session.set('channel', channel)
  }

  insertImagen(info, data) {
    Meteor.call('cloudinary.insert', info, data, (err, res) => {
      if(err) {
        console.log(err)
      }

      Meteor.call('message.update', res.url)
      console.log(res)
    })
  }

  showModal() {
    const userModal = ReactDOM.findDOMNode(this.refs.modalIgnite)
    $(userModal).modal('show')
  }

  render() {
    return (
      <div className='ui segments'>
        <div className='ui segments'>
          <AccountsUIWrapper/>
        </div>
        { this.props.currentUser ? 
          <div>
            <div className='ui segments'>
              <Header onModalClick={this.showModal.bind(this)} user={this.props.currentUser.username}/>
            </div>
            <div className='ui segments'>
              <Messages messages={this.props.messages}/>
              <Listings 
                onCreateChannel={this.createChannel.bind(this)}
                onChangeChannel={this.changeChannel.bind(this)}
                channels={this.props.channels}/>
            </div>
            <div className='ui segments'>
              <Footer onSendMessage={this.sendMessage.bind(this)}/>
            </div>
            <ProfileModal onImageInsert={this.insertImagen.bind(this)} ref='modalIgnite' username={this.props.currentUser.username}/>
          </div>
          : ''
        }
      </div>
    )
  }
}

App.propTypes = {
  messages: PropTypes.array.isRequired,
  channels: PropTypes.array.isRequired,
  currentUser: PropTypes.object
}

export default createContainer(() => {
  Meteor.subscribe('messages')
  Meteor.subscribe('channels')

  return {
    messages: MessagesCollection.find({channel: Session.get('channel')}).fetch(),
    channels: ChannelsCollection.find({}).fetch(),
    currentUser: Meteor.user(),
  }
}, App)