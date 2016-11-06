import React, { Component } from 'react'
const { object } = React.PropTypes
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { View, Image, StatusBar, Navigator, Text, TouchableOpacity } from 'react-native'

import DataList from '../components/data-list'
import Axios from 'axios'
import Modal from 'react-native-simple-modal'
import RootTabView from './root-tab-view'
import FacilityTabView from './facility-tab-view'
import AdmobView from './admob'
import actions from '../actions'
import styles from '../styles/app'
import soccerlc from '../../config/soccerlc-config'
import TeamView from '../components/team-view'

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
      onRegister: function (token) {
          Axios.put('http://107.170.232.120/api/v1/users/self/installation', {
            installationId: DeviceInfo.getUniqueID(),
            apnsToken: token.token,
          })
          .then(function (response) {
            console.log(response)
          })
          .catch(function (error) {
            console.log(error)
          })
          // this.props.actions.setDeviceTokenAndInstallation(token, , DeviceInfo.getManufacturer())
      },

      // (required) Called when a remote or local notification is opened or received
      onNotification: function (notification) {
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
        initialRoute={{id: 'root'}}
        renderScene={this.navigatorRenderScene}/>
    );
  }

  navigatorRenderScene(route, navigator) {
    const { state, actions } = this.props
    _navigator = navigator;
    switch (route.id) {
      case 'root':
        return (
          <AdmobView
                hideAd={true}
                containerStyle={{
                  backgroundColor: '#ffffff',
                }}
              >
                <StatusBar
                  barStyle="default"
                />
                <RootTabView
                  indoorFacilities={state.getIn(['soccerlcData', 'indoorFacilities'])}
                  outdoorFacilities={state.getIn(['soccerlcData', 'outdoorFacilities'])}
                  myTeamsGames={state.getIn(['soccerlcData', 'favoriteTeamsGames'])}
                  uniqueDeviceId={DeviceInfo.getUniqueID()}
                  navigator={navigator}
                  actions={actions}
                />
              <Modal
                 open={state.getIn(['soccerlcData', 'errorModalOpen']).get('error')}
                 modalDidOpen={() => console.log('modal did open')}
                 modalDidClose={() => this.setState({open: false})}
                 style={styles.modal}>
                 <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Oh No!</Text>
                    <Text style={styles.modalBody}>
                      Looks like something has gone wrong please try again later.
                    </Text>
                    <TouchableOpacity
                       style={styles.modalOkButton}
                       onPress={actions.closeErrorModal}>
                       <Text style={styles.modalOkButtonText}>Ok</Text>
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
              <StatusBar
                backgroundColor="white"
                hidden={true}
                barStyle="default"
              />
              <FacilityTabView
                facility={route.selectedFacility}
                uniqueDeviceId={DeviceInfo.getUniqueID()}
                facilityTeams={state.getIn(['soccerlcData','facilityTeamsList'])}
                todayFacilityGames={state.getIn(['soccerlcData','facilityTodaysGames'])}
                tomorrowFacilityGames={state.getIn(['soccerlcData','facilityTomorrowsGames'])}
                facilityDivisions={state.getIn(['soccerlcData','facilityDivisions'])}
                navigator={navigator}
                actions={actions}
              />
            <Modal
               open={state.getIn(['soccerlcData', 'errorModalOpen']).get('error')}
               modalDidOpen={() => console.log('modal did open')}
               modalDidClose={() => this.setState({open: false})}
               style={styles.modal}>
               <View style={styles.modalContainer}>
                  <Text style={styles.modalTitle}>Oh No!</Text>
                  <Text style={styles.modalBody}>
                    Looks like something has gone wrong please try again later.
                  </Text>
                  <TouchableOpacity
                     style={styles.modalOkButton}
                     onPress={actions.closeErrorModal}>
                     <Text style={styles.modalOkButtonText}>Ok</Text>
                  </TouchableOpacity>
               </View>
            </Modal>
          </AdmobView>
        )
      case 'team':
        return (
          <AdmobView
            hideAd={true}
            containerStyle={{
              backgroundColor: '#ffffff',
            }}
          >
            <TeamView
              facilityId={route.selectedFacilityId}
              team={route.selectedTeam}
              games={state.getIn(['soccerlcData','teamGames'])}
              uniqueDeviceId={DeviceInfo.getUniqueID()}
              navigator={navigator}
              actions={actions}
              />
            <Modal
               open={state.getIn(['soccerlcData', 'errorModalOpen']).get('error')}
               modalDidClose={() => this.setState({open: false})}
               style={styles.modal}>
               <View style={styles.modalContainer}>
                  <Text style={styles.modalTitle}>Oh No!</Text>
                  <Text style={styles.modalBody}>
                    Looks like something has gone wrong please try again later.
                  </Text>
                  <TouchableOpacity
                     style={styles.modalOkButton}
                     onPress={actions.closeErrorModal}>
                     <Text style={styles.modalOkButtonText}>Ok</Text>
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
