import React, {
  Component,
} from 'react'
import {
  Text,
  View,
  TouchableHighlight,
  LayoutAnimation,
} from 'react-native'
const { shape, object, string, number, bool } = React.PropTypes
import FoldView from 'react-native-foldview'
import Moment from 'moment'
import Icon from 'react-native-vector-icons/FontAwesome'

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
    favoriteTeams: bool,
  }

  constructor (props) {
    super(props)

    this.state = { flipExpanded: false }
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
        <Text style={styles.timeText}>{relativeTime.fromNow()}</Text>
      </View>
    )
  }

  renderBackface () {
    // TODO: details, actions here
    return (
      <View style={styles.flipBackView}>
        <Text style={styles.timeText}>{this.props.game.field.name}</Text>
      </View>
    )
  }

  renderFooter () {
    const absoluteTime = Moment(this.props.game.gameDateTime)

    return (
      <View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.footerFieldText}>
            {this.props.game.field.name}
          </Text>
          <Icon
            name='map-marker'
            size={15}
            style={{paddingTop: 10, paddingLeft: 10}}
            color='#888'
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.footerTimeText}>{absoluteTime.format('MMMM Do [at] h:mm a')}</Text>
          <Icon
            name='share'
            size={15}
            style={{paddingTop: 7, paddingLeft: 15}}
            color='#888'
          />
          <Icon
            name='flag'
            size={15}
            style={{paddingTop: 7, paddingLeft: 15}}
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
      <TouchableHighlight onPress={this.flip.bind(this)} underlayColor='#eee'>
      <View style={styles.gameView, styles.card}>
          <View style={styles.teamsView}>
            {this.renderTeam(homeTeam, homeScore, awayScore)}
            {this.renderTeam(awayTeam, awayScore, homeScore)}
          </View>

        <View style={{height: this.state.flipHeight}}>
          {
            !this.props.favoriteTeams
            ? (<FoldView
                expanded={this.state.flipExpanded}
                onAnimationStart={this.handleFlipStart.bind(this)}
                renderFrontface={this.renderFrontface.bind(this)}
                renderBackface={this.renderBackface.bind(this)}
                >
                {this.renderBase()}
              </FoldView>)
            : (<View>
                {this.renderFooter()}
              </View>)
          }
        </View>
      </View>
      </TouchableHighlight>
    )
  }
}
export default GameView
