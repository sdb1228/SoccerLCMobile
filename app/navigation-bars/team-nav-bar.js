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
import Moment from 'moment'

import styles from '../styles/team-nav-bar'

class TeamNavBar extends Component {

  static propTypes = {
    toggleFavorite: React.PropTypes.func,
    exportToCalendar: React.PropTypes.func,
    back: React.PropTypes.func,
    isFavorite: React.PropTypes.bool,
    navigator: React.PropTypes.object,
    games: React.PropTypes.object,
    actions: React.PropTypes.object,
  }

  saveEvents () {
    calendarEventPromises = []
    const games = this.props.games.get('data').toJS()
    for (var i = 0; i < games.length; i++) {
      let startAbsoluteTime = Moment(games[i].gameDateTime)
      let endAbsoluteTime = Moment(games[i].gameDateTime)
      endAbsoluteTime.hour(endAbsoluteTime.hour() + 1)
      calendarEventPromises.push
      (
        RNCalendarEvents.saveEvent(`${games[i].homeTeam.name} V ${games[i].awayTeam.name}`, {
          location: `${games[i].field.address} ${games[i].field.city}, ${games[i].field.state} ${games[i].field.zip}`,
          notes: `${games[i].field.name}`,
          startDate: startAbsoluteTime.format('YYYY-MM-DDTHH:mm:ss.sssZ'),
          endDate: endAbsoluteTime.format('YYYY-MM-DDTHH:mm:ss.sssZ'),
          })
          .then(id => {
            return id
          })
          .catch(error => {
            throw error
          })
      )
    }
    Promise.all(calendarEventPromises).then(values => {
      this.props.actions.showCalendarSuccess()
    }).catch(reason => {
      this.props.actions.showCalendarError()
    });
  }

  calendarError () {
    this.props.actions.showCalendarError()
  }

  calendarUnauthorized () {
    this.props.actions.showCalendarError()
  }

  deniedCalendar () {
    this.props.actions.showCalendarError()
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
