import React from 'react'
import {
  StyleSheet,
  TouchableHighlight,
  View,
  Image,
  Text,
} from 'react-native'

import Swiper from 'react-native-swiper'
const DeviceInfo = require('react-native-device-info')
import Animatable from 'react-native-animatable'
import FacilitiesTableview from '../components/facilities-tableview'
import TeamsTableView from '../components/teams-tableview'
import Axios from 'axios'

let PushNotification = require('react-native-push-notification')
let styles = StyleSheet.create({
  wrapper: {
  },
  teamsTableViewWrapper: {
    flex: 6,
    width: 400,
  },
  card: {
    borderWidth: 1,
    backgroundColor: 'rgb(144,30,27)',
    borderColor: 'rgba(0,0,0,0.1)',
    marginTop: 6,
    marginHorizontal: 6,
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    shadowRadius: 3,
  },
  card2: {
    borderWidth: 1,
    alignItems: 'center',
    backgroundColor: '#bbb',
    borderColor: 'rgba(0,0,0,0.1)',
    marginTop: 6,
    marginHorizontal: 6,
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    height: 40,
    justifyContent: 'center',
    borderRadius: 2,
    shadowRadius: 3,
  },
  slide1: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  headerText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    color: '#000',
    fontSize: 14,
    marginLeft: 15,
    marginRight: 15,
  },
})

export default React.createClass({

  propTypes: {
    navigator: React.PropTypes.object,
    actions: React.PropTypes.object,
    allFacilities: React.PropTypes.object,
    facility: React.PropTypes.object,
    facilityTeams: React.PropTypes.object,
    uniqueDeviceId: React.PropTypes.string,
  },

  done () {
    this.props.navigator.replace({id: 'root'})
  },

  moveIntroViewOne () {
    this._swiper.scrollBy(1)
  },

  facilityTableviewcb (facility) {
    this.setState({facility: facility})
    this._swiper.scrollBy(1)
  },

  iKnowWhatIAmDoing () {
    this.done()
    PushNotification.configure({

      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        Axios.put('http://107.170.232.120/api/v1/users/self/installation', {
          installationId: DeviceInfo.getUniqueID(),
          apnsToken: token.token,
        })
        .then(function (response) {
          this.done()
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
    this.props.navigator.replace({id: 'root'})
  },

  moveFirstSlide () {
    if(DeviceInfo.getSystemName() === 'iOS') {
      this._swiper.scrollBy(1)
    } else {
      this._swiper.scrollBy(2)
    }
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
      <Swiper scrollEnabled={false} ref={(swiper) => {this._swiper = swiper}} style={styles.wrapper}>
        <View style={styles.slide1}>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image
              resizeMode={Image.resizeMode.stretch}
              style={{height: 150, width: 400}}
              resizeMode={Image.resizeMode.contain}
              source={require('../assets/SoccerLC_v4_outlined.png')}
            />
          </View>
            <Text style={styles.headerText}>Welcome to SoccerLC!</Text>
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start'}}>
              <Text style={styles.text}>
        Here at SoccerLC we want to provide you with the fastest and easiest ways to track
        your schedule so that you can get back to scoring goals!  We do this by partnering with
        local facilities around your area and creating smart software to put all your schedules
        in one place.
            </Text>
              <View style={{flexDirection: 'row', marginTop: 40}}>
                <View style={{flex: 1}}>
                  <TouchableHighlight
                    onPress={this.iKnowWhatIAmDoing}
                    underlayColor={'#fff'}
                    >
                    <View style={styles.card2}>
                      <Text style={{color: '#fff', margin: 10}}>
                       I Know What I'm Doing
                      </Text>
                    </View>
                  </TouchableHighlight>
                </View>
                <View style={{flex: 1}}>
                  <TouchableHighlight
                    onPress={this.moveFirstSlide}
                    underlayColor={'#fff'}
                    >
                    <View style={styles.card}>
                      <Text style={{color: '#fff', margin: 10}}>
                        Let's Go!
                      </Text>
                    </View>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
        </View>
        {
          DeviceInfo.getSystemName() === 'iOS' ?
            <View style={styles.slide2}>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image
              resizeMode={Image.resizeMode.stretch}
              style={{height: 150, width: 400}}
              resizeMode={Image.resizeMode.contain}
              source={require('../assets/SoccerLC_v4_outlined.png')}
            />
          </View>
            <Text style={styles.headerText}>Notifications</Text>
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start'}}>
              <Text style={styles.text}>
        At SoccerLC we want to make sure you don't miss a single game. By letting us send
        you push notifications you can worry less about missing your game and more about
        winning.  Simply touch "Register for Push" below
        and we will send you a push when your game is coming up.
            </Text>
              <View style={{flexDirection: 'row', marginTop: 40}}>
                <View style={{flex: 1}}>
                  <TouchableHighlight
                    onPress={this.moveIntroViewOne}
                    underlayColor={'#fff'}
                    >
                    <View style={styles.card2}>
                      <Text style={{color: '#fff', margin: 10}}>
                       Not Right Now
                      </Text>
                    </View>
                  </TouchableHighlight>
                </View>
                <View style={{flex: 1}}>
                  <TouchableHighlight
                    onPress={this.registerForPush}
                    underlayColor={'#fff'}
                    >
                    <View style={styles.card}>
                      <Text style={{color: '#fff', margin: 10}}>
                        Register for Push
                      </Text>
                    </View>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          </View>
          :
           null
        }
        <View style={styles.slide3}>
          <View style={{marginTop: 30, alignItems: 'center'}}>
            <Text style={styles.headerText}>Choose A Facility</Text>
            <Text style={styles.text}>
          First choose a facility that you play at, or you would like to favorite
          teams at
            </Text>
          </View>
          <FacilitiesTableview
            environment='All'
            actions={this.props.actions}
            data={this.props.allFacilities}
            navigator={this.props.navigator}
            introViewcb={this.facilityTableviewcb}
            />
        </View>
        { this.state
          ?
          <View style={styles.slide3}>
            <View style={{marginTop: 30, alignItems: 'center'}}>
              <Text style={styles.headerText}>Favorite your team</Text>
              <Text style={styles.text}>
            Favorite some teams that you want to follow at this facility
              </Text>
            </View>
            <View style={styles.teamsTableViewWrapper}>
              <TeamsTableView
                  introView={true}
                  tabLabel="Teams"
                  actions={this.props.actions}
                  facilityId={this.state.facility.id}
                  data={this.props.facilityTeams}
                  navigator={this.props.navigator}
                  uniqueDeviceId={this.props.uniqueDeviceId}
                />
            </View>
            <View style={{flex: 1}}>
              <TouchableHighlight
                onPress={this.moveIntroViewOne}
                underlayColor={'#fff'}
                >
                <View style={styles.card}>
                  <Text style={{color: '#fff', margin: 10}}>
                   Next
                  </Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
          :
          null
        }
        <View style={styles.slide3}>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image
              resizeMode={Image.resizeMode.stretch}
              style={{height: 150, width: 400}}
              resizeMode={Image.resizeMode.contain}
              source={require('../assets/SoccerLC_v4_outlined.png')}
            />
          </View>
            <Text style={styles.headerText}>You're all set!</Text>
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start'}}>
              <Text style={styles.text}>
            It's that easy! Now go favorite some more teams.  Maybe some from another facility! We will keep
            track of them and show them on the next screen.  Enjoy!
            </Text>
              <View style={{flexDirection: 'row', marginTop: 40}}>
                <View style={{flex: 1}}>
                  <TouchableHighlight
                    onPress={this.done}
                    underlayColor={'#fff'}
                    >
                    <View style={styles.card}>
                      <Text style={{color: '#fff', margin: 10}}>
                        Let me see!
                      </Text>
                    </View>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
        </View>
      </Swiper>
    )
  },
})
