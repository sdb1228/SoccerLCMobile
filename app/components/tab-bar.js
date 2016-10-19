import React from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import styles from '../styles/tab-bar'

const TabBar = React.createClass({
  tabIcons: [],

  propTypes: {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array,
    tabsText: React.PropTypes.array,
    scrollValue: React.PropTypes.object,
    style: React.PropTypes.object,
  },

  componentDidMount () {
    this._listener = this.props.scrollValue.addListener(this.setAnimationValue)
  },

  setAnimationValue ({value}) {
    this.tabIcons.forEach((icon, i) => {
      const progress = (value - i >= 0 && value - i <= 1) ? value - i : 1
      icon.setNativeProps({
        style: {
          color: this.iconColor(progress),
        },
      })
    })
  },

  // color between rgb(107,203,255) and rgb(204,204,204)
  iconColor (progress) {
    const red = 107 + (204 - 107) * progress
    const green = 203 + (204 - 203) * progress
    const blue = 255 + (204 - 255) * progress
    return `rgb(${red}, ${green}, ${blue})`
  },

  render () {
    return <View style={[styles.tabs, this.props.style]}>
      {this.props.tabs.map((tab, i) => {
        return <TouchableOpacity key={tab} onPress={() => this.props.goToPage(i)} style={styles.tab}>
          <Icon
            name={tab}
            size={30}
            color={this.props.activeTab === i ? '#6BCBFF' : 'rgb(204,204,204)'}
            ref={(icon) => { this.tabIcons[i] = icon }}
          />
          <Text style={styles.label}>{this.props.tabsText[i]}</Text>
        </TouchableOpacity>
      })}
    </View>
  },
})

export default TabBar
