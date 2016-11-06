import React, {
  Component,
} from 'react'
import {
  View,
  TouchableOpacity,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import * as Animatable from 'react-native-animatable'
import RNCalendarEvents from 'react-native-calendar-events'

import styles from '../styles/team-nav-bar'

class TeamNavBar extends Component {

  static propTypes = {
    toggleFavorite: React.PropTypes.func,
    exportToCalendar: React.PropTypes.func,
    back: React.PropTypes.func,
    isFavorite: React.PropTypes.bool,
    navigator: React.PropTypes.object,
    games: React.PropTypes.object,
  }

  saveEvents () {
    RNCalendarEvents.saveEvent('title', {
      location: 'location',
      notes: 'notes',
      startDate: '2016-11-05T09:45:00.000UTC',
      endDate: '2016-11-05T09:45:00.000UTC',
    })
    .then(id => {

    })
    .catch(error => {
      this.calendarError()
    })
  }

  calendarError () {
    console.log(error)
  }

  calendarUnauthorized () {

  }

  deniedCalendar () {

  }

  requestAuthorizeCalendar () {
    RNCalendarEvents.authorizeEventStore()
      .then(status => {
        switch (status) {
          case 'authorized':
            this.saveEvents()
            break
          case 'denied':
            this.deniedCalendar()
            break
          default:
            this.calendarError()
            break
        }
      })
      .catch(error => {
        this.calendarError()
      })
  }

  saveCalendarEvents () {
    RNCalendarEvents.authorizationStatus()
      .then(status => {
        switch (status) {
          case 'undetermined':
            this.requestAuthorizeCalendar()
            break
          case 'authorized':
            this.saveEvents()
            break
          case 'denied':
            this.calendarUnauthorized()
            break
          default:
            this.calendarError()
            break
        }
      })
      .catch(error => {
        this.calendarError()
      })
  }

  render () {
    return (
      <View style={styles.container}>
        <View>
          <TouchableOpacity onPress={_ => this.props.navigator.pop()}>
            <Icon
              name='angle-left'
              size={30}
              style={styles.backIconStyles}
              color='#fff'
            />
          </TouchableOpacity>
        </View>
        <View style={styles.rightSideActions}>
          <Animatable.View
            animation='pulse'
            iterationCount={4}
          >
            <TouchableOpacity
              onPress={_ => this.props.toggleFavorite()}
              >
              <Icon
                name='star'
                size={30}
                style={styles.rightIconStyles}
                color={this.props.isFavorite ? '#ffff00' : '#fff'}
              />
            </TouchableOpacity>
          </Animatable.View>
          <TouchableOpacity
            onPress={_ => this.saveCalendarEvents()}
            >
            <Icon
              name='calendar'
              size={30}
              style={styles.rightIconStyles}
              color='#fff'
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default TeamNavBar
