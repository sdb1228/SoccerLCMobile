import React from 'react'
import {
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
} from 'react-native'

import Swiper from 'react-native-swiper'
let PushNotification = require('react-native-push-notification')
const DeviceInfo = require('react-native-device-info')
import Animatable from 'react-native-animatable'
import Axios from 'axios'


let styles = StyleSheet.create({
  wrapper: {
  },
  card: {
    borderWidth: 1,
    backgroundColor: 'rgb(227, 119, 64)',
    borderColor: 'rgba(0,0,0,0.1)',
    marginTop: 6,
    marginHorizontal: 6,
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    height: 30,
    justifyContent: 'center',
    borderRadius: 2,
    shadowRadius: 3,
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }
})

export default React.createClass({

  propTypes: {
    navigator: React.PropTypes.object,
  },

  done () {
    this.props.navigator.replace({id: 'root'})
  },

  registerForPush () {
    this._swiper.scrollBy(1)
    PushNotification.configure({

      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        Axios.put('http://107.170.232.120/api/v1/users/self/installation', {
          installationId: DeviceInfo.getUniqueID(),
          apnsToken: token.token,
        })
        .then(function (response) {
          this._swiper.scrollBy(1)
        })
        .catch(function (error) {
          console.log(error)
        })
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
  },

  render: function () {
    return (
      <Swiper ref={(swiper) => {this._swiper = swiper}} style={styles.wrapper}>
        <View style={styles.slide1}>
          <Text style={styles.text}>Welcome to SoccerLC!</Text>
        </View>
        <View style={styles.slide2}>
          <View>
            <Text style={styles.text}>Beautiful</Text>
          </View>
            <View>
              <TouchableHighlight
                onPress={this.registerForPush}
                underlayColor={'#fff'}
                >
                <View style={styles.card}>
                  <Text style={{color: '#fff', margin: 10}}>
                    Register for Push Notifications
                  </Text>
                </View>
              </TouchableHighlight>
            </View>
        </View>
        <View style={styles.slide3}>
          <Text style={styles.text}>And simple</Text>
            <TouchableHighlight
              onPress={this.done}
              underlayColor={'#fff'}
              >
              <View style={styles.card}>
                <Text style={{color: '#fff', margin: 10}}>
                  Done!
                </Text>
              </View>
            </TouchableHighlight>
        </View>
      </Swiper>
    )
  },
})
