import React, {
  Component,
} from 'react'
import {
  ListView,
  Text,
  TouchableHighlight,
  View,
  Image,
} from 'react-native'
const { object, string, func } = React.PropTypes
import { SwipeListView } from 'react-native-swipe-list-view'
const Progress = require('react-native-progress')

import styles from '../styles/facilities-tableview.js'

const letsplay = require('../assets/letsplay.jpg')
const sportcity = require('../assets/sportcityindoor.jpg')
const utahsoccer = require('../assets/utah-soccer.png')
const soccerlc = require('../assets/standingBall.jpg')

class FacilitiesTableview extends Component {
  static propTypes = {
    data: object.isRequired,
    actions: object.isRequired,
    environment: string.isRequired,
    navigator: object.isRequired,
    introViewcb: func,
  }

  constructor (props) {
    super(props)
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
  }

  componentWillMount () {
    switch(this.props.environment) {
    case 'Indoor':
        this.props.actions.getIndoorFacilities()
        break
    case 'Outdoor':
        this.props.actions.getOutdoorFacilities()
        break
    case 'All':
        this.props.actions.getAllFacilities()
        break
    default:
        return
    }
  }

  renderContent () {
    const facilities = this.props.data.get('data').toJS()
    if (facilities.length) {
      return (
        <SwipeListView
          dataSource={this.ds.cloneWithRows(facilities)}
          renderRow={facility => this.renderFacilityRow(facility)}
        />
      )
    } else {
      return (
        <View style={styles.spinnerContainer}>
          <Progress.CircleSnail size={80} colors={['blue']} />
        </View>
      )
    }
  }

  selectFacility (facility) {
    if (this.props.environment !== 'All') {
      this.props.navigator.push({id: 'facility', selectedFacility: facility})
    } else {
      this.props.introViewcb(facility)
    }
  }

  imageSource (facility) {
    switch (facility.name) {
      case "Lets Play Soccer GV":
        return letsplay
        break;
      case "Sport City":
        return sportcity
        break;
      case "Utah Soccer":
        return utahsoccer
        break;
      default:
        return soccerlc

    }
    return letsplay
  }
  renderFacilityRow (facility) {
    return (
      <TouchableHighlight
        onPress={_ => this.selectFacility(facility) }
        underlayColor={'#AAA'}
        >
        <Image
          resizeMode={Image.resizeMode.stretch}
          style={{height: 150, width: 400, alignItems: 'center', justifyContent: 'center'}}
          source={this.imageSource(facility)}
        >
          <Text style={styles.facilityText}>{facility.name}</Text>
        </Image>
      </TouchableHighlight>
    )
  }

  render () {
    return (
      <View style={styles.container}>
        {this.renderContent()}
      </View>
    )
  }
}
export default FacilitiesTableview
