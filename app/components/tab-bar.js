import React from 'react'
import {
  Text,
  View,
  ScrollView,
} from 'react-native'

import FacebookTabBar from './FacebookTabBar'
import styles from '../styles/tab-bar'
import ScrollableTabView from 'react-native-scrollable-tab-view'

export default React.createClass({
  render () {
    return (
      <ScrollableTabView
        tabBarPosition='bottom'
        style={styles.tabBar}
        initialPage={1}
        renderTabBar={() => <FacebookTabBar tabsText={['Video Feed', 'My Teams', 'Recent Activity', 'Indoor Facilities', 'Outdoor Facilities']} />}
        >
        <ScrollView tabLabel='video-camera' style={styles.tabView}>
          <View style={styles.card}>
            <Text>News</Text>
          </View>
        </ScrollView>
        <ScrollView tabLabel='star' style={styles.tabView}>
          <View style={styles.card}>
            <Text>Friends</Text>
          </View>
        </ScrollView>
        <ScrollView tabLabel='newspaper-o' style={styles.tabView}>
          <View style={styles.card}>
            <Text>Messenger</Text>
          </View>
        </ScrollView>
        <ScrollView tabLabel='building-o' style={styles.tabView}>
          <View style={styles.card}>
            <Text>Notifications</Text>
          </View>
        </ScrollView>
        <ScrollView tabLabel='sun-o' style={styles.tabView}>
          <View style={styles.card}>
            <Text>Other nav</Text>
          </View>
        </ScrollView>
      </ScrollableTabView>
    )
  },
})
