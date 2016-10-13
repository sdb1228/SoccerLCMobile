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

  render () {
    return (
      <View style={styles.container}>
        <SwipeListView
          dataSource={this.ds.cloneWithRows(this.data.gamesData)}
          renderRow={data => (
            <TouchableHighlight
              onPress={_ => console.log('You touched me')}
              underlayColor={'#AAA'}
          >
              <View style={styles.gameContainer} >
                <View style={styles.teamsFieldContainer} >
                  <Text style={styles.homeTeamCellText} >{data.name}</Text>
                  <Text style={styles.awayTeamCellText} >I am the away team</Text>
                </View>
                <View style={styles.scoreContainer} >
                  <Text style={styles.homeTeamCellText} >456</Text>
                  <Text style={styles.awayTeamCellText} >123</Text>
                </View>
              </View>
            </TouchableHighlight>
          )}
        />
      </View>
    )
  }
}
export default GamesTableview
