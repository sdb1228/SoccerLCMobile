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

import styles from '../styles/divisions-tableview.js'

const Progress = require('react-native-progress')
var fuzzy = require('fuzzy')
const { object, string, number } = React.PropTypes


class DivisionsTableView extends Component {
  static propTypes = {
    data: object.isRequired,
    actions: object.isRequired,
    uniqueDeviceId: string.isRequired,
    facilityId: number.isRequired,
  }

  constructor (props) {
    super(props)
    this.state = {
      text: '',
      filteredDivisions: this.props.data.get('data').toJS(),
      fullDivisionList: this.props.data.get('data').toJS(),
    }
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.filterDivisions = this.filterDivisions.bind(this)
  }

  componentWillMount () {
    this.props.actions.getFacilityDivisions(this.props.facilityId, this.props.uniqueDeviceId)
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      filteredDivisions: nextProps.data.get('data').toJS(),
      fullDivisionList: nextProps.data.get('data').toJS(),
    })
  }

  filterDivisions (text) {
    const options = {
      extract: function(team) { return team.name }
    }
    const results = fuzzy.filter(text.toUpperCase(), this.state.fullDivisionList, options)
    if (results.length === 0) {
      this.setState({
        text,
        filteredDivisions: [],
      })
    } else {
      const filteredResults = results.map((result) =>
      {
        return result.original
      })
      this.setState({
        text,
        filteredDivisions: filteredResults,
      })
    }
  }

  renderDivisionRow (team) {
    return (
      <TouchableHighlight
        onPress={_ => console.log('You touched me')}
        underlayColor={'#eee'}
        >
        <View style={styles.teamsContainer}>
          <View style={styles.teamsNameContainer}>
              <Text style={styles.teamNameText} >{team.name}</Text>
          </View>
          <View style={styles.teamsDivisionContainer}>
              <Text style={styles.teamDivisionText} >{team.teamCount} Teams</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  renderContent () {
    const divisions = this.state.filteredDivisions
    const loading = this.props.data.get('loading')
    const error = this.props.data.get('error')
    if (loading) {
      return (
        <View style={styles.spinnerContainer}>
          <Progress.CircleSnail size={80} colors={['blue']} />
        </View>
      )
    } else if (divisions.length) {
        return (
          <SwipeListView
            dataSource={this.ds.cloneWithRows(divisions)}
            renderRow={team => this.renderDivisionRow(team)}
          />
        )
    } else if (!error) {
      return (
        <Text style={styles.homeTeamCellText} >No divisions avaible....</Text>
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
          style={styles.searchDialog}
          placeholder="Find Division ...."
          onChangeText={(text) => this.filterDivisions(text)}
          value={this.state.text}
        />
        {this.renderContent()}
      </View>
    )
  }
}
export default  DivisionsTableView
