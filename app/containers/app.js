import React, { Component } from 'react'
const { object } = React.PropTypes
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { View, Image, StatusBar, Navigator, Text } from 'react-native'

import DataList from '../components/data-list'
import ScrollableTabView from './scrollable-tab-view'
import FacilityTabView from './facility-tab-view'
import AdmobView from './admob'
import actions from '../actions'
import styles from '../styles/app'
var PushNotification = require('react-native-push-notification')

class App extends Component {
  static propTypes = {
    state: object.isRequired,
    actions: object.isRequired,
  }

  constructor () {
    super()
    this.navigatorRenderScene = this.navigatorRenderScene.bind(this)
    this.state = {
      isLoading: false,
    }
  }

  componentWillMount () {

    PushNotification.configure({

      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function(token) {
          console.log( 'TOKEN:', token );
      },

      // (required) Called when a remote or local notification is opened or received
      onNotification: function(notification) {
          console.log( 'NOTIFICATION:', notification );
      },

      // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
      senderID: "YOUR GCM SENDER ID",

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
          alert: true,
          badge: true,
          sound: true
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
        * (optional) default: true
        * - Specified if permissions (ios) and token (android and ios) will requested or not,
        * - if not, you must call PushNotificationsHandler.requestPermissions() later
        */
      requestPermissions: true,
    })
  }

  render() {
    return (
      <Navigator
        style={styles.container}
        initialRoute={{id: 'first'}}
        renderScene={this.navigatorRenderScene}/>
    );
  }

  navigatorRenderScene(route, navigator) {
    const { state, actions } = this.props
    _navigator = navigator;
    switch (route.id) {
      case 'first':
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
                <ScrollableTabView
                  indoorFacilities={state.getIn(['soccerlcData', 'indoorFacilities'])}
                  outdoorFacilities={state.getIn(['soccerlcData', 'outdoorFacilities'])}
                  myTeamsGames={state.getIn(['soccerlcData', 'facilityTeamsList'])}
                  navigator={navigator}
                  actions={actions}
                />
              </Image>
            </AdmobView>
          )
      case 'second':
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
                backgroundColor="white"
                barStyle="default"
              />
              <FacilityTabView
                navigator={navigator}
                actions={actions}
              />
            </Image>
          </AdmobView>
        )
    }
  }
}

export default connect(
  (state) => ({ state }),
  (dispatch) => ({ actions: bindActionCreators(actions, dispatch) }),
)(App)
