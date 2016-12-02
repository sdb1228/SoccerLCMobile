import React from 'react'
import {
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
} from 'react-native'

const Progress = require('react-native-progress')

export default React.createClass({

  propTypes: {
    navigator: React.PropTypes.object,
    loading: React.PropTypes.bool,
    installed: React.PropTypes.bool,
  },

  render () {
    if (!this.props.loading) {
      if (this.props.installed) {
        this.props.navigator.replace({id: 'root'})
      }
      else{
        this.props.navigator.replace({id: 'intro'})
      }
    }
    return (
      <View style={{backgroundColor: 'rgba(0,0,0,0.01)', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Progress.CircleSnail size={80} colors={['blue']} />
      </View>
    )
  },
})
