import React, { Component } from 'react'
const { object } = React.PropTypes
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  View,
  StatusBar,
  Navigator,
  Text,
  TouchableOpacity,
  TextInput,
  Linking
  } from 'react-native'

import Axios from 'axios'
import Modal from 'react-native-simple-modal'
import RootTabView from './root-tab-view'
import FacilityTabView from './facility-tab-view'
import AdmobView from './admob'
import actions from '../actions'
import soccerlc from '../../config/soccerlc-config'
import TeamView from '../components/team-view'
import codePush from 'react-native-code-push'

import styles from '../styles/app'
import modalStyles from '../styles/modal'

let codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME }
let PushNotification = require('react-native-push-notification')
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
      userErrorMessage: '',
      isLoading: false,
    }
    this.reportTheProblemWithText = this.reportTheProblemWithText.bind(this)
  }

  componentDidMount() {
    Linking.addEventListener('url', this.handleDeepLink);
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleDeepLink);
  }

  handleDeepLink(e) {
    const route = e.url.replace(/.*?:\/\//g, "")
    debugger
    this._navigator.push({id: 'team', selectedTeam: {id: 5}, selectedFacilityId: route})
    // this._navigator.replace(this.state.routes[route])
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
          console.log('NOTIFICATION:', notification)
      },

      // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
      senderID: 'YOUR GCM SENDER ID',

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
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

  reportTheProblemWithText () {
    let errorMessage = this.state.userErrorMessage
    this.setState({userErrorMessage: ''})
    this.props.actions.reportProblem(`Game: ${this.props.state.getIn(['soccerlcData', 'reportAProblemModal']).get('data').toJS().id} was reported to have ${errorMessage}`)
  }

  render () {
    return (
      <Navigator
        style={styles.container}
        initialRoute={{id: 'root'}}
        renderScene={this.navigatorRenderScene} />
    )
  }

  navigatorRenderScene (route, navigator) {
    const { state, actions } = this.props
    _navigator = navigator
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
              modalDidClose={() => this.setState({open: false})}
              style={modalStyles.modal}>
              <View style={modalStyles.modalContainer}>
                <Text style={modalStyles.modalTitle}>{state.getIn(['soccerlcData', 'errorModalOpen']).get('errorModalTitle')}</Text>
                <Text style={modalStyles.modalBody}>
                  {state.getIn(['soccerlcData', 'errorModalOpen']).get('errorModalMessage')}
                </Text>
                <TouchableOpacity
                  style={modalStyles.modalOkButton}
                  onPress={actions.closeErrorModal}>
                  <Text style={modalStyles.modalOkButtonText}>Ok</Text>
                </TouchableOpacity>
              </View>
            </Modal>
            <Modal
              open={state.getIn(['soccerlcData', 'reportAProblemModal']).get('data').toJS().modalOpen}
              style={modalStyles.modal}>
              <View style={modalStyles.modalContainer}>
                <Text style={modalStyles.modalTitle}>Tell us what happened</Text>
                <Text style={modalStyles.modalBody}>
                  Looks like you are having a problem with game: {state.getIn(['soccerlcData', 'reportAProblemModal']).get('data').toJS().id} What specifically is wrong?
                </Text>
                <TextInput
                  style={{height: 40, borderColor: '#ccc', borderWidth: 1, borderRadius: 3, paddingBottom: 10}}
                  multiline={true}
                  value={this.state.userErrorMessage}
                  placeholder="Enter problem....."
                  onChange={(event) => this.setState({userErrorMessage: event.nativeEvent.text})}
                />
                <View style={modalStyles.modalButtonContainer}>
                  <TouchableOpacity
                    style={modalStyles.modalOkButton}
                    onPress={this.reportTheProblemWithText}>
                    <Text style={modalStyles.modalOkButtonText}>Ok</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={modalStyles.modalOkButton}
                    onPress={actions.closeReportErrorModal}>
                    <Text style={modalStyles.modalCancelButton}>Cancel</Text>
                  </TouchableOpacity>
                </View>
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
              facilityTeams={state.getIn(['soccerlcData', 'facilityTeamsList'])}
              todayFacilityGames={state.getIn(['soccerlcData', 'facilityTodaysGames'])}
              tomorrowFacilityGames={state.getIn(['soccerlcData', 'facilityTomorrowsGames'])}
              facilityDivisions={state.getIn(['soccerlcData', 'facilityDivisions'])}
              navigator={navigator}
              actions={actions}
            />
            <Modal
              open={state.getIn(['soccerlcData', 'errorModalOpen']).get('error')}
              modalDidClose={() => this.setState({open: false})}
              style={modalStyles.modal}>
              <View style={modalStyles.modalContainer}>
                <Text style={modalStyles.modalTitle}>{state.getIn(['soccerlcData', 'errorModalOpen']).get('errorModalTitle')}</Text>
                <Text style={modalStyles.modalBody}>
                  {state.getIn(['soccerlcData', 'errorModalOpen']).get('errorModalMessage')}
                </Text>
                <TouchableOpacity
                  style={modalStyles.modalOkButton}
                  onPress={actions.closeErrorModal}>
                  <Text style={modalStyles.modalOkButtonText}>Ok</Text>
                </TouchableOpacity>
              </View>
            </Modal>
            <Modal
              open={state.getIn(['soccerlcData', 'reportAProblemModal']).get('data').toJS().modalOpen}
              style={modalStyles.modal}>
              <View style={modalStyles.modalContainer}>
                <Text style={modalStyles.modalTitle}>Tell us what happened</Text>
                <Text style={modalStyles.modalBody}>
                  Looks like you are having a problem with game: {state.getIn(['soccerlcData', 'reportAProblemModal']).get('data').toJS().id} What specifically is wrong?
                </Text>
                <TextInput
                  style={{height: 40, borderColor: '#ccc', borderWidth: 1, borderRadius: 3, paddingBottom: 10}}
                  value={this.state.userErrorMessage}
                  multiline={true}
                  onChange={(event) => this.setState({userErrorMessage: event.nativeEvent.text})}
                  placeholder="Enter problem....."
                />
                <View style={modalStyles.modalButtonContainer}>
                  <TouchableOpacity
                    style={modalStyles.modalOkButton}
                    onPress={this.reportTheProblemWithText}>
                    <Text style={modalStyles.modalOkButtonText}>Ok</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={modalStyles.modalOkButton}
                    onPress={actions.closeReportErrorModal}>
                    <Text style={modalStyles.modalCancelButton}>Cancel</Text>
                  </TouchableOpacity>
                </View>
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
              state={state}
              facilityId={route.selectedFacilityId}
              team={route.selectedTeam}
              games={state.getIn(['soccerlcData', 'teamGames'])}
              uniqueDeviceId={DeviceInfo.getUniqueID()}
              navigator={navigator}
              actions={actions}
              />
          </AdmobView>
        )
    }
  }
}

export default connect(
  (state) => ({ state }),
  (dispatch) => ({ actions: bindActionCreators(actions, dispatch) }),
)(codePush(codePushOptions)(App))
