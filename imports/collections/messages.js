import { Mongo } from 'meteor/mongo'
import { check } from 'meteor/check'
import { Meteor } from 'meteor/meteor'

export const MessagesCollection = new Mongo.Collection('messages')

if(Meteor.isServer) {
  Meteor.publish('messages', function() {
    return MessagesCollection.find({})
  })
}

Meteor.methods({
  'message.insert'(message, channel) {
    check(message, String)

    if(!this.userId)
      throw new Meteor.Error('no autorizado')

    let url_photo
    if(Meteor.users.findOne(this.userId).profile != undefined)
      url_photo = Meteor.users.findOne(this.userId).profile.url_photo
    else
      url_photo = '/images/coco_thumb.jpg'

    MessagesCollection.insert({
      user: Meteor.users.findOne(this.userId).username,
      userId: this.userId,
      userImg: url_photo,
      message,
      channel
    })
  }, 
  'message.update'(url) {
    check(url, String)

    if(!this.userId)
      throw new Meteor.Error('no autorizado')

    MessagesCollection.update({userId: this.userId}, {$set: {userImg: url}}, {multi: true})
  }
}) 