import React, {
  Component,
} from 'react'
import {
  ListView,
  Text,
  TouchableHighlight,
  View,
} from 'react-native'
const { object, string, number } = React.PropTypes
import { SwipeListView } from 'react-native-swipe-list-view'
const Progress = require('react-native-progress')
import ButtonComponent, { CircleButton, RoundButton, RectangleButton } from 'react-native-button-component';

import styles from '../styles/teams-tableview.js'

class DivisionTableView extends Component {
  static propTypes = {
    data: object.isRequired,
    actions: object.isRequired,
    uniqueDeviceId: string.isRequired,
    facilityId: number.isRequired,
  }

  constructor (props) {
    super(props)
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
  }

  componentWillMount () {
    this.props.actions.getFacilityTeams(this.props.facilityId, this.props.uniqueDeviceId)
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
          buttonStyle={styles.buttonStyle}
          text="Go Favorite More Teams!"
        >
        </ButtonComponent>
      )
    } else {
      return (
        <Text style={styles.homeTeamCellText} >ERROR</Text>
      )
    }
  }

  renderGameRow (game) {
    return (
      <TouchableHighlight
        onPress={_ => console.log('You touched me')}
        underlayColor={'#eee'}
        >
        <View style={styles.teamsContainer}>
          <View style={styles.teamsNameContainer}>
              <Text style={styles.teamNameText} >{game.name}</Text>
          </View>
          <View style={styles.teamsDivisionContainer}>
              <Text style={styles.teamDivisionText} >{game.division}</Text>
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
export default  DivisionTableView
