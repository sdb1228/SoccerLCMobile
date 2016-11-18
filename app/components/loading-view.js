import React from 'react'
import {
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
} from 'react-native'

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
      <View>
        <Text> loading </Text>
      </View>
    )
  },
})
