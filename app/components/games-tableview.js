import React, {
  Component,
} from 'react'
import {
  ListView,
  Text,
  TouchableHighlight,
  View,
} from 'react-native'
const { object, string } = React.PropTypes
import { SwipeListView } from 'react-native-swipe-list-view'
const Progress = require('react-native-progress')

import styles from '../styles/games-tableview.js'

class GamesTableview extends Component {
  static propTypes = {
    data: object.isRequired,
    actions: object.isRequired,
    uniqueDeviceId: string.isRequired,
  }

  constructor (props) {
    super(props)
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
  }

  componentWillMount () {
    this.props.actions.getFavoriteTeamsGames(this.props.uniqueDeviceId)
  }

  renderContent () {
    const games = this.props.data.toJS()
    if (games.length) {
      return (
        <SwipeListView
          dataSource={this.ds.cloneWithRows(games)}
          renderRow={game => this.renderGameRow(game)}
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

  renderGameRow (game) {
    return (
      <TouchableHighlight
        onPress={_ => console.log('You touched me')}
        underlayColor={'#AAA'}
        >
        <View style={styles.gameContainer}>
          <View style={styles.teamsFieldContainer}>
            <TouchableHighlight
              onPress={_ => console.log('You touched me')}
              underlayColor={'#AAA'}
              >
              <Text style={styles.homeTeamCellText} >{game.name}</Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={_ => console.log('You touched me')}
              underlayColor={'#AAA'}
              >
              <Text style={styles.awayTeamCellText}>I am the away team</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.scoreContainer}>
            <Text style={styles.homeTeamCellText}>456</Text>
            <Text style={styles.awayTeamCellText}>123</Text>
          </View>
        </View>
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
export default GamesTableview
