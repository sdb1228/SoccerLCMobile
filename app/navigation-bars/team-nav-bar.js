import React from 'react'
import {
  View,
  TouchableOpacity,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import * as Animatable from 'react-native-animatable'

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
      <View style={{backgroundColor: 'rgb(144,30,27)', height: 45, flexDirection: 'row', justifyContent: 'space-between'}}>
        <View>
          <TouchableOpacity onPress={_ => this.props.navigator.pop()}>
            <Icon
              name='angle-left'
              size={30}
              style={{paddingTop: 5, paddingLeft: 15}}
              color='#fff'
            />
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row'}}>
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
                style={{paddingTop: 5, paddingRight: 15}}
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
              style={{paddingTop: 5, paddingRight: 15}}
              color='#fff'
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  },
})

export default TeamNavBar