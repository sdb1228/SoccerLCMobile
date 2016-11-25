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

import Modal from 'react-native-simple-modal'
import RootTabView from './root-tab-view'
import FacilityTabView from './facility-tab-view'
import AdmobView from './admob'
import actions from '../actions'
import soccerlc from '../../config/soccerlc-config'
import TeamView from '../components/team-view'
import codePush from 'react-native-code-push'
import IntroView from '../components/intro-view'
import LoadingView from '../components/loading-view'

import styles from '../styles/app'
import modalStyles from '../styles/modal'

let codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME }
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

  componentWillMount() {
    this.props.actions.checkInstallation(DeviceInfo.getUniqueID())
  }

  componentDidMount() {
    Linking.addEventListener('url', this.handleDeepLink);
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleDeepLink);
  }

  handleDeepLink(e) {
    const route = e.url.replace(/.*?:\/\//g, "")
    this._navigator.push({id: 'team', selectedTeam: {id: 5}, selectedFacilityId: route})
    // this._navigator.replace(this.state.routes[route])
  }

  reportTheProblemWithText () {
    let errorMessage = this.state.userErrorMessage
    this.setState({userErrorMessage: ''})
    this.props.actions.reportProblem(`Game: ${this.props.state.getIn(['soccerlcData', 'reportAProblemModal']).get('data').toJS().id} was reported to have ${errorMessage}`)
  }

  render () {
    let startingRoute='intro'
    if (this.props.state.getIn(['soccerlcData', 'installationCheck']).toJS().loading) {
      startingRoute='loading'
    }
    else if (this.props.state.getIn(['soccerlcData', 'installationCheck']).toJS().installed) {
      startingRoute='root'
    }
    return (
      <Navigator
        style={styles.container}
        initialRoute={{id: 'intro'}}
        renderScene={this.navigatorRenderScene} />
    )
  }

  navigatorRenderScene (route, navigator) {
    const { state, actions } = this.props
    _navigator = navigator
    switch (route.id) {
      case 'intro':
        return (
          <IntroView
            navigator={navigator}
            actions={actions}
            allFacilities={state.getIn(['soccerlcData', 'allFacilities'])}
            />
        )
      case 'loading':
        return (
          <LoadingView
            loading={this.props.state.getIn(['soccerlcData', 'installationCheck']).toJS().loading}
            installed={this.props.state.getIn(['soccerlcData', 'installationCheck']).toJS().installed}
            navigator={navigator}
            />
        )
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
    }
  }
}

export default connect(
  (state) => ({ state }),
  (dispatch) => ({ actions: bindActionCreators(actions, dispatch) }),
)(codePush(codePushOptions)(App))
