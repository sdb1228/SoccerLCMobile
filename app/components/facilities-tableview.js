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
const { object, string } = React.PropTypes
import { SwipeListView } from 'react-native-swipe-list-view'
const Progress = require('react-native-progress')

import styles from '../styles/facilities-tableview.js'

class FacilitiesTableview extends Component {
  static propTypes = {
    data: object.isRequired,
    actions: object.isRequired,
    environment: string.isRequired,
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
    default:
        return
    }
  }

  renderContent () {
    const facilities = this.props.data.toJS()
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
  renderFacilityRow (facility) {
    return (
      <TouchableHighlight
        onPress={_ => console.log('You touched me')}
        underlayColor={'#AAA'}
        >
        <Image
          resizeMode={Image.resizeMode.stretch}
          style={{height: 150, width: 400, alignItems: 'center', justifyContent: 'center'}}
          source={require('../assets/letsplay.jpg')}
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
