import React, {
  Component,
} from 'react'
import {
  ListView,
  Text,
  TouchableHighlight,
  View,
} from 'react-native'
const { object } = React.PropTypes
import { SwipeListView } from 'react-native-swipe-list-view'
import styles from '../styles/games-tableview.js'

class GamesTableview extends Component {
  static propTypes = {
    data: object.isRequired,
    actions: object.isRequired,
  }

  constructor (props) {
    super(props)
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.data = {
      gamesData: this.props.data.toJS()
    }
    this.props.actions.getFacilityTeams(1)
  }
  componentWillUpdate(nextProps, nextState) {
    this.data = {
      gamesData: nextProps.data.toJS()
    }
  }
  renderContent () {
    const games = this.data.gamesData
    if (games.length) {
      return (
        <SwipeListView
          dataSource={this.ds.cloneWithRows(games)}
          renderRow={game => (
            this.renderGameRow(game)
          )}
        />
      )
    } else {
      // TODO spinner here
      return (
        <Text>No items found</Text>
      )
    }
  }

  renderGameRow (game) {
    return (
      <TouchableHighlight
        onPress={_ => console.log('You touched me')}
        underlayColor={'#AAA'}
        >
        <View style={styles.gameContainer} >
          <View style={styles.teamsFieldContainer} >
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
              <Text style={styles.awayTeamCellText} >I am the away team</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.scoreContainer} >
            <Text style={styles.homeTeamCellText} >456</Text>
            <Text style={styles.awayTeamCellText} >123</Text>
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
