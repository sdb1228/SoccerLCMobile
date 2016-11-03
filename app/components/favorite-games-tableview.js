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
import Moment from 'moment'
import ButtonComponent, { CircleButton, RoundButton, RectangleButton } from 'react-native-button-component';
import GameView from './game-view.js'

import styles from '../styles/favorite-games-tableview.js'

const Progress = require('react-native-progress')
const DeviceInfo = require('react-native-device-info')
var QuickActions = ""
if (DeviceInfo.getSystemName() === "iOS") {
  QuickActions = require('react-native-quick-actions')
}

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

  componentWillReceiveProps(nextProps) {
    if (DeviceInfo.getSystemName() === "iOS") {
      QuickActions.isSupported(function(error, supported) {
        if (supported) {
          let quickActionsArray = []
          quickActionsArray.push({
            type: "My Teams", // Required
            subtitle: "Go To My Teams!",
            userInfo: {
              url: "app://orders" // provide custom data, like in-app url you want to open
            }
          })
          if (nextProps.data.get('data').toJS().length) {
            const favoriteGames = nextProps.data.get('data').toJS()
            let loopTill = favoriteGames.length
            if (favoriteGames.length > 3) {
              loopTill = 3
            }
            for (var i = 0; i < loopTill; i++) {
              const absoluteTime = Moment(favoriteGames[i].gameDateTime)
              const time = absoluteTime.format('MM/DD h:mm a')
              let awayShowName = favoriteGames[i].awayTeam.name
              let homeShowName = favoriteGames[i].homeTeam.name
              if (homeShowName.length > 5) {
                homeShowName = homeShowName.substring(0, 5)
              }
              if (awayShowName.length > 5) {
                awayShowName = awayShowName.substring(0, 5)
              }
              quickActionsArray.push({
                type: "Favorite Games", // Required
                title: `${homeShowName} V ${awayShowName}`, // Optional, if empty, `type` will be used instead
                subtitle: `${time} at ${favoriteGames[i].field.name}`,
                userInfo: {
                  url: "app://orders" // provide custom data, like in-app url you want to open
                }
              })
            }
            QuickActions.setShortcutItems(quickActionsArray)
          }
        }
      })
    }
  }

  componentWillMount () {
    if (DeviceInfo.getSystemName() === "iOS") {
      QuickActions.isSupported(function(error, supported) {
        if (supported) {
          QuickActions.clearShortcutItems()
        }
      })
    }
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
      <GameView favoriteTeams={true} game={game}/>
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
