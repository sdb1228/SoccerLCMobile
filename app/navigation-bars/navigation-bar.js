const React = require('react')
const ReactNative = require('react-native')
const {
  Text,
  View,
  Animated,
  TouchableOpacity,
} = ReactNative
const Button = require('../buttons/Button')
import styles from '../styles/navigation-bar'
import Icon from 'react-native-vector-icons/FontAwesome'

const DefaultTabBar = React.createClass({
  propTypes: {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array,
    backgroundColor: React.PropTypes.string,
    activeTextColor: React.PropTypes.string,
    inactiveTextColor: React.PropTypes.string,
    textStyle: Text.propTypes.style,
    tabStyle: View.propTypes.style,
    renderTab: React.PropTypes.func,
    underlineStyle: View.propTypes.style,
    navigator: React.PropTypes.object,
  },

  getDefaultProps () {
    return {
      activeTextColor: '#fff',
      inactiveTextColor: '#fff',
      backgroundColor: 'rgb(144,30,27)',
    }
  },

  renderTabOption (name, page) {
  },

  renderTab (name, page, isTabActive, onPressHandler) {
    const {activeTextColor, inactiveTextColor, textStyle} = this.props
    const textColor = isTabActive ? activeTextColor : inactiveTextColor
    const fontWeight = isTabActive ? 'bold' : 'normal'

    return <Button
      style={{flex: 1}}
      key={name}
      accessible={true}
      accessibilityLabel={name}
      accessibilityTraits='button'
      onPress={() => onPressHandler(page)}
    >
      <View style={[styles.tab, this.props.tabStyle]}>
        <Text style={[{color: textColor, fontWeight}, textStyle]}>
          {name}
        </Text>
      </View>
    </Button>
  },

  render () {
    const containerWidth = this.props.containerWidth
    const numberOfTabs = this.props.tabs.length
    const tabUnderlineStyle = {
      position: 'absolute',
      width: (containerWidth / numberOfTabs) - 25,
      height: 4,
      backgroundColor: '#fff',
      bottom: 0,
    }

    const left = this.props.scrollValue.interpolate({
      inputRange: [0, 1], outputRange: [28, (containerWidth / numberOfTabs) + 25],
    })
    return (
      <View style={[styles.tabs, {backgroundColor: 'rgb(144,30,27)'}, this.props.style]}>
        <TouchableOpacity onPress={_ => this.props.navigator.pop()}>
          <Icon
            name='angle-left'
            size={30}
            style={{paddingTop: 15, paddingLeft: 5}}
            color='#fff'
          />
        </TouchableOpacity>
        {this.props.tabs.map((name, page) => {
          const isTabActive = this.props.activeTab === page
          const renderTab = this.props.renderTab || this.renderTab
          return renderTab(name, page, isTabActive, this.props.goToPage)
        })}
        <Animated.View style={[tabUnderlineStyle, {left}, this.props.underlineStyle]} />
      </View>
    )
  },
})

module.exports = DefaultTabBar
