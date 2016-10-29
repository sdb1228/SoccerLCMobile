import React, {
  Component,
} from 'react'
import {
  ListView,
  Text,
  TouchableHighlight,
  View,
  TextInput,
} from 'react-native'

import { SwipeListView } from 'react-native-swipe-list-view'
import ButtonComponent, { CircleButton, RoundButton, RectangleButton } from 'react-native-button-component'

import styles from '../styles/teams-tableview.js'

const Progress = require('react-native-progress')
var fuzzy = require('fuzzy')
const { object, string, number } = React.PropTypes


class TeamsTableView extends Component {
  static propTypes = {
    data: object.isRequired,
    actions: object.isRequired,
    uniqueDeviceId: string.isRequired,
    facilityId: number.isRequired,
    navigator: object.isRequired,
  }

  constructor (props) {
    super(props)
    this.state = {
      text: '',
      filteredTeams: this.props.data.get('data').toJS(),
      fullTeamList: this.props.data.get('data').toJS(),
    }
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.filterTeams = this.filterTeams.bind(this)
  }

  componentWillMount () {
    this.props.actions.getFacilityTeams(this.props.facilityId, this.props.uniqueDeviceId)
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      filteredTeams: nextProps.data.get('data').toJS(),
      fullTeamList: nextProps.data.get('data').toJS(),
    })
  }

  filterTeams (text) {
    const options = {
      extract: function(team) { return team.name }
    }
    const results = fuzzy.filter(text.toUpperCase(), this.state.fullTeamList, options)
    if (results.length === 0) {
      this.setState({
        text,
        filteredTeams: [],
      })
    } else {
      const filteredResults = results.map((result) =>
      {
        return result.original
      })
      this.setState({
        text,
        filteredTeams: filteredResults,
      })
    }
  }

  renderTeamRow (team) {
    return (
      <TouchableHighlight
        onPress={_ => this.props.navigator.push({id: 'team', selectedTeam: team, selectedFacilityId: this.props.facilityId})}
        underlayColor={'#eee'}
        >
        <View style={styles.teamsContainer}>
          <View style={styles.teamsNameContainer}>
              <Text style={styles.teamNameText} >{team.name}</Text>
          </View>
          <View style={styles.teamsDivisionContainer}>
              <Text style={styles.teamDivisionText} >{team.division}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  renderContent () {
    const teams = this.state.filteredTeams
    const loading = this.props.data.get('loading')
    const error = this.props.data.get('error')
    if (loading) {
      return (
        <View style={styles.spinnerContainer}>
          <Progress.CircleSnail size={80} colors={['blue']} />
        </View>
      )
    } else if (teams.length) {
        return (
          <SwipeListView
            dataSource={this.ds.cloneWithRows(teams)}
            renderRow={team => this.renderTeamRow(team)}
          />
        )
    } else if (!error) {
      return (
        <Text style={styles.homeTeamCellText} >No teams avaible....</Text>
      )
    } else {
      return (
        <Text style={styles.homeTeamCellText} >ERROR</Text>
      )
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.searchBar}
          placeholder="Find Team ...."
          onChangeText={(text) => this.filterTeams(text)}
          value={this.state.text}
        />
        {this.renderContent()}
      </View>
    )
  }
}
export default  TeamsTableView
