import React, {
  Component,
} from 'react'
import {
  Text,
  ListView,
  View,
  TouchableHighlight,
  LayoutAnimation,
} from 'react-native'
import FoldView from 'react-native-foldview'
import Moment from 'moment'
import GameView from './game-view.js'
import TeamNavBar from '../navigation-bars/team-nav-bar'
import ButtonComponent, { CircleButton, RoundButton, RectangleButton } from 'react-native-button-component';
import { SwipeListView } from 'react-native-swipe-list-view'

import styles from '../styles/game-view.js'

const { shape, object, string, number } = React.PropTypes


class TeamView extends Component {
  static propTypes = {
    navigator: object,
    actions: object,
    games: object,
    team: object,
    facilityId: number,
  }

  constructor (props) {
    super(props)
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.errorRetry = this.errorRetry.bind(this)
  }

  componentWillMount () {
    this.props.actions.getTeamsGames(this.props.team.id, this.props.facilityId)
  }

  errorRetry () {
    this.props.actions.getTeamsGames(this.props.team.id, this.props.facilityId)
  }


  renderGameRow (game) {
    debugger
    return (
      <GameView game={game}/>
    )
  }

  renderContent () {
    const games = this.props.games.get('data').toJS()
    const loading = this.props.games.get('loading')
    const error = this.props.games.get('error')
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

  render () {
    return (
      <View>
        <TeamNavBar
          navigator={this.props.navigator}
        />
        {this.renderContent()}
      </View>
    )
  }
}
export default TeamView
