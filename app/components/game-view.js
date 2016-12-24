import React, {
  Component,
} from 'react'
import {
  Text,
  View,
  TouchableHighlight,
  LayoutAnimation,
  Linking,
} from 'react-native'
const { shape, object, string, number, bool } = React.PropTypes
import FoldView from 'react-native-foldview'
import Moment from 'moment'
import Icon from 'react-native-vector-icons/FontAwesome'
import Share from 'react-native-share'

import styles from '../styles/game-view.js'

const DeviceInfo = require('react-native-device-info')

class GameView extends Component {
  static propTypes = {
    game: shape({
      homeTeam: object,
      awayTeam: object,
      homeTeamScore: number,
      awayTeamScore: number,
      gameDateTime: string.isRequired,
    }).isRequired,
    actions: object,
  }

  constructor (props) {
    super(props)

    this.state = { flipExpanded: false }
  }

  maps () {
    let mapURL = ''
    if (!this.props.game.field.latlong) {
      mapText = [
        this.props.game.field.address,
        this.props.game.field.city,
        this.props.game.field.state,
      ].join('%20')
      if (DeviceInfo.getSystemName() === 'iOS') {
        mapURL = 'http://maps.apple.com/?q=' + mapText
      } else {
        mapURL = 'http://maps.google.com/maps?daddr=' + mapText
      }
    } else {
      if (DeviceInfo.getSystemName() === 'iOS') {
        mapURL = 'http://maps.apple.com/?ll=' + this.props.game.field.latlong
      } else {
        mapURL = 'http://maps.google.com/maps?daddr=' + this.props.game.field.latlong
      }
    }

    Linking.canOpenURL(mapURL).then(supported => {
      if (supported) {
          Linking.openURL(mapURL)
      } else {
        // TODO HANDLE ERROR
        console.log('Don\'t know how to go');
      }
    }).catch(err => console.error('An error occurred', err))
  }

  share () {
    const {
      gameDateTime: time,
      homeTeam, awayTeam, field
    } = this.props.game

    timeText = Moment(time).format('MMM D h:mm a')
    // TODO: defend all these nullables
    teamText = [
      awayTeam.name,
      homeTeam.name,
    ].join(' V ')

    fieldAddress = ""

    if(field.address) {
      fieldAddress = [
        field.address,
        field.city,
        field.state,
        field.zip,
      ].join(' ')
    }

    fieldText = this.props.game.field.name + '\n' + fieldAddress + '\n' + "get the app at soccerlc.com"

    Share.open({
      message: teamText + '\n' + timeText + '\n' + fieldText
    })
  }

  reportAProblem () {
    this.props.actions.reportAProblemModal(this.props.game, true)
  }

  flip () {
    this.setState({ flipExpanded: !this.state.flipExpanded })
  }

  handleFlipStart (duration, height) {
    LayoutAnimation.configureNext({
      duration: duration * 0.85,
      update: {
        type: this.state.flipExpanded ? LayoutAnimation.Types.easeIn : LayoutAnimation.Types.easeOut,
        property: LayoutAnimation.Properties.height
      }
    })

    this.setState({ flipHeight: height })
  }

  renderTeam (team, score, opposingScore) {
    teamStyle = score > opposingScore ? styles.teamText : styles.lossTeamText

    return (
      <View style={styles.teamView}>
        <Text style={teamStyle}>{team.name}</Text>
        <Text style={teamStyle}>{score}</Text>
      </View>
    )
  }

  renderFrontface () {
    const absoluteTime = Moment(this.props.game.gameDateTime)

    return (
      <View style={styles.flipFrontView}>
        <Text style={styles.footerText}>{absoluteTime.format('MMMM Do [at] h:mm a')}</Text>
      </View>
    )
  }

  renderBackface () {
    return (
      <View style={styles.flipBackView}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.footerText}>
            {this.props.game.field.name}
          </Text>
          <TouchableHighlight onPress={this.maps.bind(this)} underlayColor='#ddd'>
            <Icon
              name='map-marker'
              size={18}
              style={{padding: 6}}
              color='#888'
            />
          </TouchableHighlight>
          <TouchableHighlight onPress={this.share.bind(this)} underlayColor='#ddd'>
            <Icon
              name='share'
              size={18}
              style={{padding: 6}}
              color='#888'
            />
          </TouchableHighlight>
          <TouchableHighlight onPress={this.reportAProblem.bind(this)} underlayColor='#ddd'>
            <Icon
              name='flag'
              size={18}
              style={{padding: 6}}
              color='#888'
            />
          </TouchableHighlight>
        </View>
      </View>
    )
  }

  renderBase () {
    const absoluteTime = Moment(this.props.game.gameDateTime)
    const relativeTime = Moment(this.props.game.gameDateTime)

    return (
      <View style={styles.flipBaseView}>
        <Text style={styles.footerText}>{absoluteTime.format('MMMM Do [at] h:mm a')} ({relativeTime.fromNow()})</Text>
      </View>
    )
  }

  renderDetails() {
    if (DeviceInfo.getSystemName() === "iOS") {
      return (
        <FoldView
          expanded={this.state.flipExpanded}
          onAnimationStart={this.handleFlipStart.bind(this)}
          renderFrontface={this.renderFrontface.bind(this)}
          renderBackface={this.renderBackface.bind(this)}
          >
          {this.renderBase()}
        </FoldView>
      )
    } else {
      // DIY FoldView
      if (this.state.flipExpanded) {
        return (
          <View>
            {this.renderBase()}
            {this.renderBackface()}
          </View>
        )
      } else {
        return (
          <View>
            {this.renderFrontface()}
          </View>
        )
      }
    }
  }

  render () {
    const {
      homeTeam, awayTeam,
      homeTeamScore: homeScore, awayTeamScore: awayScore
    } = this.props.game

    return (
      <TouchableHighlight onPress={this.flip.bind(this)} underlayColor='#eee'>
      <View style={styles.gameView, styles.card}>
          <View style={styles.teamsView}>
            {this.renderTeam(homeTeam, homeScore, awayScore)}
            {this.renderTeam(awayTeam, awayScore, homeScore)}
          </View>

        <View style={{height: this.state.flipHeight}}>
         {this.renderDetails()}
        </View>
      </View>
      </TouchableHighlight>
    )
  }
}
export default GameView
