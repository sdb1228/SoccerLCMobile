import React, { Component } from 'react'
const { object } = React.PropTypes
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { View, Image, StatusBar } from 'react-native'

import DataList from '../components/data-list'
import TabBar from '../components/tab-bar'
import AdmobView from './admob'
import actions from '../actions'
import styles from '../styles/app'

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
      <Image
        style={styles.bg}
        source={require('../assets/processed/standingBall.png')}
      >
      <StatusBar
        barStyle="light-content"
      />
        <TabBar/>
      </Image>
    </AdmobView>
    )
  }
}

export default connect(
  (state) => ({ state }),
  (dispatch) => ({ actions: bindActionCreators(actions, dispatch) }),
)(App)
