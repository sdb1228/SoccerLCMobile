import React from 'react'
import {
  View,
  TouchableOpacity,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import * as Animatable from 'react-native-animatable'
import styles from '../styles/team-nav-bar'

const TeamNavBar = React.createClass({
  tabIcons: [],

  propTypes: {
    toggleFavorite: React.PropTypes.func,
    exportToCalendar: React.PropTypes.func,
    back: React.PropTypes.func,
    navigator: React.PropTypes.obj,
  },

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
              onPress={_ => this.props.navigator.pop()}
              >
              <Icon
                name='star'
                size={30}
                style={styles.rightIconStyles}
                color='#fff'
              />
            </TouchableOpacity>
          </Animatable.View>
          <TouchableOpacity
            onPress={_ => this.props.navigator.pop()}
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
  },
})

export default TeamNavBar
