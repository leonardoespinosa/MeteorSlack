const fs = require('fs')
const path = require('path')
const cloudinary = require('cloudinary')
const async = require('async')

cloudinary.config({ 
  cloud_name: 'doqunzvf2', 
  api_key: '331542226563151', 
  api_secret: 'XodH4Cy848BO_-Edteqc1Iom4_8' 
})

import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'

Meteor.methods({
  'cloudinary.insert'(fileInfo, fileData) {
    const base64 = fileData.replace(/^data:image\/png;base64,/, "")
    const filename = this.userId + ".png"
    const userToUpdate = Meteor.users.findOne({_id: this.userId})

    const asyncFunc = Meteor.wrapAsync(async.waterfall)
    const resAsyncFunc = asyncFunc([
      function(callback) {
        fs.writeFile(filename, base64, 'base64',(err) => {
          if(err) {
            callback(err)
          }
          const filepath = path.join(process.cwd(), filename)
          callback(null, filepath)
        })
      },
      function(arg1, callback) {
        cloudinary.uploader.upload(arg1, function(result) {
          if(!result)
            callback(new Meteor.Error())

          callback(null, result)
        }, {public_id: this.userId, format: 'jpg'})
      }
    ])

    console.log(resAsyncFunc)
    Meteor.users.update(userToUpdate, {$set: {"profile.url_photo": resAsyncFunc.url}})

    return resAsyncFunc
   }
}) 