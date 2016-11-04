import React, {
  Component,
} from 'react'
import {
  ListView,
  Text,
  View,
} from 'react-native'
const { object, string, number } = React.PropTypes
import { SwipeListView } from 'react-native-swipe-list-view'
const Progress = require('react-native-progress')

import styles from '../styles/favorite-games-tableview.js'
import GameView from './game-view.js'

class GamesTableview extends Component {
  static propTypes = {
    data: object.isRequired,
    actions: object.isRequired,
    facilityId: number.isRequired,
    uniqueDeviceId: string.isRequired,
    day: string.isRequired,
  }

  constructor (props) {
    super(props)
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.errorRetry = this.errorRetry.bind(this)
  }

  componentWillMount () {
    switch(this.props.day) {
    case 'Today':
        this.props.actions.getFacilityTodaysGames(this.props.facilityId)
        break
    case 'Tomorrow':
        this.props.actions.getFacilityTomorrowsGames(this.props.facilityId)
        break
    default:
        return
    }
  }

  errorRetry () {
    switch(this.props.day) {
    case 'Today':
        this.props.actions.getFacilityTodaysGames(this.props.facilityId)
        break
    case 'Tomorrow':
        this.props.actions.getFacilityTomorrowsGames(this.props.facilityId)
        break
    default:
        return
    }
  }

  renderContent () {
    const games = this.props.data.get('data').toJS()
    const loading = this.props.data.get('loading')
    const error = this.props.data.get('error')
    if (loading) {
      return (
        <View style={styles.spinnerContainer}>
          <Progress.CircleSnail size={80} colors={['blue']} />
        </View>
      )
    } else if (games.length) {
        return (
          <SwipeListView
            dataSource={this.ds.cloneWithRows(games)}
            renderRow={game => this.renderGameRow(game)}
          />
        )
    } else if (!error) {
      return (
        <View style={styles.buttonContainer}>
          <Text style={styles.text}>
            Sorry! This facility doesn't have any games this day come back later!
          </Text>
        </View>
      )
    } else {
      return (
        <View style={styles.buttonContainer}>
          <TouchableHighlight
            onPress={this.errorRetry}
            underlayColor={'#fff'}
            >
            <View style={styles.buttonStyle}>
              <Text style={styles.text}>
                Retry
              </Text>
          </View>
          </TouchableHighlight>
        </View>
      )
    }
  }

  renderGameRow (game) {
    return (
      <GameView game={game}/>
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
export default GamesTableview
