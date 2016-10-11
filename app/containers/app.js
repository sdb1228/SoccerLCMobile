import React, { Component } from 'react'
const { object } = React.PropTypes
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { View } from 'react-native'

import DataList from '../components/data-list'
import TabBar from '../components/tab-bar'
import AdmobView from './admob'
import actions from '../actions'

class App extends Component {
  static propTypes = {
    state: object.isRequired,
    actions: object.isRequired,
  }

  render () {
    const { state, actions } = this.props
    return (
      <AdmobView
        hideAd={true}
        containerStyle={{
          backgroundColor: '#ffffff',
        }}
      >
      <TabBar/>
    </AdmobView>
    )
  }
}

export default connect(
  (state) => ({ state }),
  (dispatch) => ({ actions: bindActionCreators(actions, dispatch) }),
)(App)
