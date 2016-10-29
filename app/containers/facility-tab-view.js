import React from 'react'
import {
} from 'react-native'
import NavigationBar from '../navigation-bars/navigation-bar'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import TeamsTableView from '../components/teams-tableview'
import DivisionsTableView from '../components/divisions-tableview'
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
        navigator={this.props.navigator}
        day="Today"
      />
      <TodaysTomorrowGamesTableView
        tabLabel="Tomorrow"
        actions={this.props.actions}
        facilityId={this.props.facility.id}
        data={this.props.tomorrowFacilityGames}
        navigator={this.props.navigator}
        uniqueDeviceId={this.props.uniqueDeviceId}
        day="Tomorrow"
      />
      <TeamsTableView
        tabLabel="Teams"
        actions={this.props.actions}
        facilityId={this.props.facility.id}
        data={this.props.facilityTeams}
        navigator={this.props.navigator}
        uniqueDeviceId={this.props.uniqueDeviceId}
        />
      <DivisionsTableView
        tabLabel="Divisions"
        actions={this.props.actions}
        facilityId={this.props.facility.id}
        data={this.props.facilityDivisions}
        navigator={this.props.navigator}
        uniqueDeviceId={this.props.uniqueDeviceId}
        />
    </ScrollableTabView>
  },
})
