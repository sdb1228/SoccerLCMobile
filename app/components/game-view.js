import React, {
  Component,
} from 'react'
import {
  Text,
  View,
  TouchableHighlight,
  LayoutAnimation,
} from 'react-native'
const { shape, object, string, number } = React.PropTypes
import FoldView from 'react-native-foldview'
import Moment from 'moment'

import styles from '../styles/game-view.js'

class GameView extends Component {
  static propTypes = {
    game: shape({
      homeTeam: object,
      awayTeam: object,
      homeTeamScore: number,
      awayTeamScore: number,
      gameDateTime: string.isRequired,
    }).isRequired,
  }

  constructor (props) {
    super(props)

    this.flip = this.flip.bind(this)
    this.handleFlipStart = this.handleFlipStart.bind(this)
    this.renderFrontface = this.renderFrontface.bind(this)
    this.renderBackface = this.renderBackface.bind(this)

    this.state = { flipExpanded: false }
  }

  flip () {
    this.setState({ flipExpanded: !this.state.flipExpanded })
  }

  handleFlipStart (duration, height) {
    LayoutAnimation.configureNext({
      duration: duration,
      update: {
        type: this.state.flipExpanded ? LayoutAnimation.Types.easeOut : LayoutAnimation.Types.easeIn,
        property: LayoutAnimation.Properties.height
      }
    })

    this.setState({ flipHeight: height })
  }

  renderTeam (team, score) {
    return (
      <View style={styles.teamView}>
        <Text style={styles.teamText}>{team.name}</Text>
        <Text style={styles.teamText}>{score}</Text>
      </View>
    )
  }

  renderFrontface () {
    const relativeTime = Moment(this.props.game.gameDateTime)

    return (
      <TouchableHighlight onPress={this.flip}>
        <View style={styles.flipFrontView}>
          <Text style={styles.timeText}>{relativeTime.fromNow()}</Text>
        </View>
      </TouchableHighlight>
    )
  }

  renderBackface () {
    // TODO: details, actions here
    return (
      <View style={styles.flipBackView}>
        <Text style={styles.timeText}>
          {this.props.game.field.name}
        </Text>
      </View>
    )
  }

  renderBase () {
    const absoluteTime = Moment(this.props.game.gameDateTime)

    return (
      <View style={styles.flipBaseView}>
        <Text style={styles.timeText}>{absoluteTime.format('MMMM Do [at] h:mm a')}</Text>
      </View>
    )
  }

  render () {
    const {
      homeTeam, awayTeam,
      homeTeamScore: homeScore, awayTeamScore: awayScore
    } = this.props.game

    return (
      <TouchableHighlight onPress={this.flip} underlayColor='#eee'>
      <View style={styles.gameView, styles.card}>
        
          <View style={styles.teamsView}>
            {this.renderTeam(homeTeam, homeScore)}
            {this.renderTeam(awayTeam, awayScore)}
          </View>

        <View style={{height: this.state.flipHeight}}>
          <FoldView
            expanded={this.state.flipExpanded}
            onAnimationStart={this.handleFlipStart}
            renderFrontface={this.renderFrontface}
            renderBackface={this.renderBackface}
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
