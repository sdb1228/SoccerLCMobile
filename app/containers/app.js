import React, { Component } from 'react'
const { object } = React.PropTypes
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { View,Text, Image } from 'react-native'
import Swiper from 'react-native-swiper'
import styles from '../styles/swipe-navigation'
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
          backgroundColor: '#ccccff',
        }}
      >
      <Swiper style={styles.wrapper} showsButtons={true}>
        <Image
            style={{flex: 1}}
            source={require('../assets/kickingSoccer.jpg')}
            >
          </Image>
        <Image
            style={{flex: 1}}
            source={require('../assets/standingBall.jpg')}
            >
          </Image>
        <Image
            style={{flex: 1}}
            source={require('../assets/jumpingSoccer.jpg')}
            >
        </Image>
      </Swiper>
    </AdmobView>
    )
  }
}

export default connect(
  (state) => ({ state }),
  (dispatch) => ({ actions: bindActionCreators(actions, dispatch) }),
)(App)
