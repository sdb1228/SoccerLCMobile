import React, { Component } from 'react'
const { object } = React.PropTypes
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { View, Image, StatusBar, Navigator, Text, TouchableOpacity } from 'react-native'

import DataList from '../components/data-list'
import Modal from 'react-native-simple-modal';
import ScrollableTabView from './scrollable-tab-view'
import FacilityTabView from './facility-tab-view'
import AdmobView from './admob'
import actions from '../actions'
import styles from '../styles/app'
var PushNotification = require('react-native-push-notification')
const DeviceInfo = require('react-native-device-info')

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
    debugger
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
                  myTeamsGames={state.getIn(['soccerlcData', 'favoriteTeamsGames'])}
                  uniqueDeviceId={DeviceInfo.getUniqueID()}
                  navigator={navigator}
                  actions={actions}
                />
              </Image>
              <Modal
                 open={state.getIn(['soccerlcData', 'errorModalOpen']).get('error')}
                 modalDidOpen={() => console.log('modal did open')}
                 modalDidClose={() => this.setState({open: false})}
                 style={{alignItems: 'center'}}>
                 <View>
                    <Text style={{fontSize: 20, marginBottom: 10}}>Hello world!</Text>
                    <TouchableOpacity
                       style={{margin: 5}}
                       onPress={() => this.setState({offset: -100})}>
                       <Text>Move modal up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                       style={{margin: 5}}
                       onPress={() => this.setState({offset: 0})}>
                       <Text>Reset modal position</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                       style={{margin: 5}}
                       onPress={actions.closeErrorModal}>
                       <Text>Close modal</Text>
                    </TouchableOpacity>
                 </View>
              </Modal>
            </AdmobView>
          )
      case 'facility':
        return (
          <AdmobView
            hideAd={true}
            containerStyle={{
              backgroundColor: '#ffffff',
            }}
          >
            <Image
              style={styles.bg}
              source={require('../assets/processed/letsPlay.png')}
            >
              <StatusBar
                backgroundColor="white"
                hidden={true}
                barStyle="default"
              />
              <FacilityTabView
                facility={route.selectedFacility}
                uniqueDeviceId={DeviceInfo.getUniqueID()}
                facilityTeams={state.getIn(['soccerlcData','facilityTeamsList'])}
                todayFacilityGames={state.getIn(['soccerlcData','todayFacilityGames'])}
                tomorrowFacilityGames={state.getIn(['soccerlcData','tomorrowFacilityGames'])}
                facilityDivisions={state.getIn(['soccerlcData','facilityDivisions'])}
                navigator={navigator}
                actions={actions}
              />
            </Image>
            <Modal
               open={this.errorModalOpen}
               modalDidOpen={() => console.log('modal did open')}
               modalDidClose={() => this.setState({open: false})}
               style={{alignItems: 'center'}}>
               <View>
                  <Text style={{fontSize: 20, marginBottom: 10}}>Hello world!</Text>
                  <TouchableOpacity
                     style={{margin: 5}}
                     onPress={() => this.setState({offset: -100})}>
                     <Text>Move modal up</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                     style={{margin: 5}}
                     onPress={() => this.setState({offset: 0})}>
                     <Text>Reset modal position</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                     style={{margin: 5}}
                     onPress={() => this.setState({open: false})}>
                     <Text>Close modal</Text>
                  </TouchableOpacity>
               </View>
            </Modal>
          </AdmobView>
        )
    }
  }
}

export default connect(
  (state) => ({ state }),
  (dispatch) => ({ actions: bindActionCreators(actions, dispatch) }),
)(App)
