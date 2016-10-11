import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';

import FacebookTabBar from './FacebookTabBar';
import ScrollableTabView from 'react-native-scrollable-tab-view';

export default React.createClass({
  render() {
    return (<ScrollableTabView
        tabBarPosition="bottom"
        style={{marginTop: 20 }}
        initialPage={1}
        renderTabBar={() => <FacebookTabBar tabsText={["Video Feed","My Teams", "Recent Activity", "Indoor Facilities", "Outdoor Facilities"]}/>}
        >
        <ScrollView tabLabel="video-camera" style={styles.tabView}>
          <View style={styles.card}>
            <Text>News</Text>
          </View>
        </ScrollView>
        <ScrollView tabLabel="star" style={styles.tabView}>
          <View style={styles.card}>
            <Text>Friends</Text>
          </View>
        </ScrollView>
        <ScrollView tabLabel="newspaper-o" style={styles.tabView}>
          <View style={styles.card}>
            <Text>Messenger</Text>
          </View>
        </ScrollView>
        <ScrollView tabLabel="building-o" style={styles.tabView}>
          <View style={styles.card}>
            <Text>Notifications</Text>
          </View>
        </ScrollView>
        <ScrollView tabLabel="sun-o" style={styles.tabView}>
          <View style={styles.card}>
            <Text>Other nav</Text>
          </View>
        </ScrollView>
      </ScrollableTabView>
    )
  },
});

const styles = StyleSheet.create({
  tabView: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
  card: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    margin: 5,
    height: 150,
    padding: 15,
    shadowColor: '#ccc',
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
});
