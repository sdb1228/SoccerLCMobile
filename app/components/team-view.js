import React, {
  Component,
} from 'react'
import {
  Text,
  ListView,
  View,
  TouchableHighlight,
  TouchableOpacity,
  LayoutAnimation,
} from 'react-native'
import FoldView from 'react-native-foldview'
import Moment from 'moment'
import GameView from './game-view.js'
import TeamNavBar from '../navigation-bars/team-nav-bar'
import { SwipeListView } from 'react-native-swipe-list-view'
import Modal from 'react-native-simple-modal'

import styles from '../styles/game-view.js'
import modalStyles from '../styles/modal'

const { object, string, number } = React.PropTypes


class TeamView extends Component {

  static propTypes = {
    uniqueDeviceId: string,
    actions: object,
    games: object,
    team: object,
    facilityId: number,
    navigator: object,
    state: object,
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
    if (!this.state.favorite) {
      this.props.actions.favoriteTeam(this.props.uniqueDeviceId, this.props.team.id)
    } else {
      this.props.actions.unfavoriteTeam(this.props.uniqueDeviceId, this.props.team.id)
    }
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
    const { state, actions } = this.props
    return (
      <View style={{flex: 1}}>
        <TeamNavBar
          navigator={this.props.navigator}
          toggleFavorite={this.toggleFavorite}
          isFavorite={this.state.favorite}
          games={this.props.games}
          actions={actions}
        />
        {this.renderContent()}
        <Modal
           open={state.getIn(['soccerlcData', 'errorModalOpen']).get('error')}
           style={modalStyles.modal}>
           <View style={modalStyles.modalContainer}>
              <Text style={modalStyles.modalTitle}>{state.getIn(['soccerlcData', 'errorModalOpen']).get('errorModalTitle')}</Text>
              <Text style={modalStyles.modalBody}>
                {state.getIn(['soccerlcData', 'errorModalOpen']).get('errorModalMessage')}
              </Text>
              <TouchableOpacity
                 style={modalStyles.modalOkButton}
                 onPress={actions.closeErrorModal}>
                 <Text style={modalStyles.modalOkButtonText}>Ok</Text>
              </TouchableOpacity>
           </View>
        </Modal>
      </View>
    )
  }
}
export default TeamView
