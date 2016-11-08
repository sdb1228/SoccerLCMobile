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
    favoriteTeams: bool,
  }

  constructor (props) {
    super(props)

    this.state = { flipExpanded: false }
  }

  maps () {
    if (!this.props.game.field.latlong) {
      //TODO ERROR MODAL
      return
    }
    let mapURL = ''
    if (DeviceInfo.getSystemName() === 'iOS') {
      mapURL = 'http://maps.apple.com/?ll=' + this.props.game.field.latlong
    } else {
      mapURL = 'http://maps.google.com/maps?daddr=' + this.props.game.field.latlong
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
      homeTeam, awayTeam,
      homeTeamScore: homeScore, awayTeamScore: awayScore
    } = this.props.game

    timeText = Moment(time).format('MMM D h:mm a')
    // TODO: defend all these nullables
    teamText = [
      [awayTeam.name, awayScore].join(' '),
      [homeTeam.name, homeScore].join(' '),
    ].join(' @ ')

    Share.open({
      message: teamText + ' ' + timeText,
    })
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
    const relativeTime = Moment(this.props.game.gameDateTime)

    return (
      <View style={styles.flipFrontView}>
        <Text style={styles.footerText}>{relativeTime.fromNow()}</Text>
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
          <Icon
            name='flag'
            size={18}
            style={{padding: 6}}
            color='#888'
          />
        </View>
      </View>
    )
  }

  renderBase () {
    const absoluteTime = Moment(this.props.game.gameDateTime)

    return (
      <View style={styles.flipBaseView}>
        <Text style={styles.footerText}>{absoluteTime.format('MMMM Do [at] h:mm a')}</Text>
      </View>
    )
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
          <FoldView
            expanded={this.state.flipExpanded}
            onAnimationStart={this.handleFlipStart.bind(this)}
            renderFrontface={this.renderFrontface.bind(this)}
            renderBackface={this.renderBackface.bind(this)}
            >
            {this.renderBase()}
          </FoldView>
        </View>
      </View>
      </TouchableHighlight>
    )
  }
}
export default GameView
