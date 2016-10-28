import React from 'react'
import {
  Text,
  View,
  ScrollView,
} from 'react-native'
import styles from '../styles/facility-tab-view'
import NavigationBar from '../components/navigation-bar'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import TeamsTableView from '../components/teams-tableview'
import TodaysTomorrowGamesTableView from '../components/today-tomorrow-tableview'

export default React.createClass({

  propTypes: {
    actions: React.PropTypes.object,
    facilityTeams: React.PropTypes.object,
    todayFacilityGames: React.PropTypes.object,
    tomorrowFacilityGames: React.PropTypes.object,
    facilityDivisions: React.PropTypes.object,
    facility: React.PropTypes.object,
    uniqueDeviceId: React.PropTypes.string,
    navigator: React.PropTypes.object,
  },

  render () {
    return <ScrollableTabView
      initialPage={0}
      renderTabBar={() => <NavigationBar navigator={this.props.navigator} backgroundColor='#fff'/>}
      >
      <TodaysTomorrowGamesTableView
        tabLabel="Today"
        actions={this.props.actions}
        facilityId={this.props.facility.id}
        data={this.props.todayFacilityGames}
        uniqueDeviceId={this.props.uniqueDeviceId}
        day="Today"
      />
      <TodaysTomorrowGamesTableView
        tabLabel="Tomorrow"
        actions={this.props.actions}
        facilityId={this.props.facility.id}
        data={this.props.tomorrowFacilityGames}
        uniqueDeviceId={this.props.uniqueDeviceId}
        day="Tomorrow"
      />
      <TeamsTableView
        tabLabel="Teams"
        actions={this.props.actions}
        facilityId={this.props.facility.id}
        data={this.props.facilityTeams}
        uniqueDeviceId={this.props.uniqueDeviceId}
        />
      <TeamsTableView
        tabLabel="Divisions"
        actions={this.props.actions}
        facilityId={this.props.facility.id}
        data={this.props.facilityTeams}
        uniqueDeviceId={this.props.uniqueDeviceId}
        />
      <ScrollView tabLabel="About" style={styles.tabView}>
        <View style={styles.card}>
          <Text>Other nav</Text>
        </View>
      </ScrollView>
    </ScrollableTabView>
  },
})
