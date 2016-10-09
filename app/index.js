import React, { Component } from 'react'
import { Provider } from 'react-redux'

import './helpers/debug'
import createStore from './store'
import reducer from './reducers'
import AppContainer from './containers/app'

const debug = Debug('app')
const store = createStore(reducer)

debug('starting up!')

export default class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  }
}
