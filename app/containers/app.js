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
  //
  // componentWillMount () {
  //   // callback won't run if it's going to use cache
  //   this.props.actions.fetchUser({}, fetchState => {
  //     // if it needs to actually fetch the data, this callback is called
  //     // with the loading and error status so we can use it in the view
  //     this.setState({ isLoading: fetchState.isLoading })
  //   })
  // }

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
