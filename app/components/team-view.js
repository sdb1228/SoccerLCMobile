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
import { SwipeListView } from 'react-native-swipe-list-view'

import styles from '../styles/game-view.js'

const { shape, object, string, number } = React.PropTypes


class TeamView extends Component {
  static propTypes = {
    navigator: object,
    uniqueDeviceId: string,
    actions: object,
    games: object,
    team: object,
    facilityId: number,
  }

  constructor (props) {
    super(props)
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.errorRetry = this.errorRetry.bind(this)
    this.toggleFavorite = this.toggleFavorite.bind(this)
  }

  componentWillMount () {
    this.setState({
      favorite: this.props.team.favorite,
    })
    this.props.actions.getTeamsGames(this.props.team.id, this.props.facilityId)
  }

  errorRetry () {
    this.props.actions.getTeamsGames(this.props.team.id, this.props.facilityId)
  }

  toggleFavorite () {
    this.props.actions.favoriteTeam(this.props.uniqueDeviceId, this.props.team.id)
    this.setState({
      favorite: !this.state.favorite,
    })
  }

  renderGameRow (game) {
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
        <View style={styles.buttonContainer}>
          <Text style={styles.text}>
            Sorry no teams avaible for this facility yet.  Come back Later!
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

  render () {
    return (
      <View style={{flex: 1}}>
        <TeamNavBar
          navigator={this.props.navigator}
          toggleFavorite={this.toggleFavorite}
          isFavorite={this.state.favorite}
        />
        {this.renderContent()}
      </View>
    )
  }
}
export default TeamView
