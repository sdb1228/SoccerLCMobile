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
      renderTabBar={() => <NavigationBar backgroundColor='#fff'/>}
      >
      <ScrollView tabLabel="Today" style={styles.tabView}>
        <View style={styles.card}>
          <Text>News</Text>
        </View>
      </ScrollView>
      <ScrollView tabLabel="Tomorrow" style={styles.tabView}>
        <View style={styles.card}>
          <Text>Friends</Text>
        </View>
      </ScrollView>
      <TeamsTableView
        tabLabel="Teams"
        actions={this.props.actions}
        facilityId={this.props.facility.id}
        data={this.props.facilityTeams}
        uniqueDeviceId={this.props.uniqueDeviceId}
        />
      <ScrollView tabLabel="Divisions" style={styles.tabView}>
        <View style={styles.card}>
          <Text>Notifications</Text>
        </View>
      </ScrollView>
      <ScrollView tabLabel="About" style={styles.tabView}>
        <View style={styles.card}>
          <Text>Other nav</Text>
        </View>
      </ScrollView>
    </ScrollableTabView>
  },
})
