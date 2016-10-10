import React, { Component } from 'react'
const { object } = React.PropTypes
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { View } from 'react-native'

import DataList from '../components/data-list'
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
        hideAd={false}
        containerStyle={{
          backgroundColor: '#ccccff',
        }}
      >
        <DataList
          data={state.getIn(['tempData', 'tempList'])}
          actions={actions}
        />
    </AdmobView>
    )
  }
}

export default connect(
  (state) => ({ state }),
  (dispatch) => ({ actions: bindActionCreators(actions, dispatch) }),
)(App)
