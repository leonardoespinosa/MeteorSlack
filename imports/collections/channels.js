import { Mongo } from 'meteor/mongo'
import { check } from 'meteor/check'
import { Meteor } from 'meteor/meteor'

export const ChannelsCollection = new Mongo.Collection('channels')

if(Meteor.isServer) {
  Meteor.publish('channels', function() {
    return ChannelsCollection.find({})
  })
}

Meteor.methods({
  'channel.insert'(channel) {
    check(channel, String)

    if(!this.userId)
      throw new Meteor.Error('no autorizado')

    ChannelsCollection.insert({
      channel
    })
  }
}) 