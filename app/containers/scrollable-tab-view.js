import React from 'react'
import {
  ScrollView,
} from 'react-native'
import TabBar from '../components/tab-bar'
import GamesTableview from '../components/games-tableview'
import FacilitiesTableview from '../components/facilities-tableview'
import styles from '../styles/scrollable-tab-view'
import ScrollableTabView from 'react-native-scrollable-tab-view'

export default React.createClass({
  propTypes: {
    actions: React.PropTypes.object,
    myTeamsGames: React.PropTypes.object,
    indoorFacilities: React.PropTypes.object,
    outdoorFacilities: React.PropTypes.object,
    uniqueDeviceId: React.PropTypes.string,
    navigator: React.PropTypes.object,
  },

  render () {
    return (
      <ScrollableTabView
        tabBarPosition='bottom'
        style={styles.tabBar}
        initialPage={0}
        renderTabBar={() => <TabBar tabsText={['My Teams', 'Indoor Facilities', 'Outdoor Facilities']} />}
      >
        <ScrollView centerContent={true} tabLabel='star' style={styles.tabView}>
          <GamesTableview
            actions={this.props.actions}
            data={this.props.myTeamsGames}
            uniqueDeviceId={this.props.uniqueDeviceId}
            />
        </ScrollView>
        <FacilitiesTableview
          tabLabel='building-o'
          environment='Indoor'
          actions={this.props.actions}
          data={this.props.indoorFacilities}
          navigator={this.props.navigator}
          />
        <FacilitiesTableview
          tabLabel='sun-o'
          environment='Outdoor'
          actions={this.props.actions}
          data={this.props.outdoorFacilities}
          navigator={this.props.navigator}
          />
      </ScrollableTabView>
    )
  },
})
