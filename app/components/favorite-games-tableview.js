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
import ButtonComponent, { CircleButton, RoundButton, RectangleButton } from 'react-native-button-component';

import styles from '../styles/favorite-games-tableview.js'

class FavoriteGamesTableview extends Component {
  static propTypes = {
    data: object.isRequired,
    actions: object.isRequired,
    uniqueDeviceId: string.isRequired,
  }

  constructor (props) {
    super(props)
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.errorRetry = this.errorRetry.bind(this)
  }

  componentWillMount () {
    this.props.actions.getFavoriteTeamsGames(this.props.uniqueDeviceId, 5)
  }

  errorRetry () {
    this.props.actions.getFavoriteTeamsGames(this.props.uniqueDeviceId)
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
        <ButtonComponent
          onPress={() => {}}
          backgroundColors={['rgba(0,0,0,0.01)', 'rgba(0,0,0,0.01)']}
          buttonStyle={styles.buttonStyle}
          text="Go Favorite More Teams!"
        >
        </ButtonComponent>
      )
    } else {
      return (
        <ButtonComponent
          onPress={this.errorRetry}
          backgroundColors={['rgba(0,0,0,0.01)', 'rgba(0,0,0,0.01)']}
          buttonStyle={styles.buttonStyle}
          text="Retry"
        >
        </ButtonComponent>
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
export default FavoriteGamesTableview
