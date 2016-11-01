import React from 'react'
import { render } from 'react-dom'
import { Meteor } from 'meteor/meteor'

import '../imports/startup/accounts-ui'
import App from '../imports/client/containers/App'

Meteor.startup(() => {
  render(<App />, document.getElementById('container'))
})