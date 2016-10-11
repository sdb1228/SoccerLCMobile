import React, {
	Component,
} from 'react'
import {
	ListView,
	Text,
	TouchableOpacity,
	TouchableHighlight,
	View,
} from 'react-native'

import { SwipeListView } from 'react-native-swipe-list-view'
import styles from '../styles/games-tableview.js'

class GamesTableview extends Component {

  constructor (props) {
    super(props)
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      listViewData: Array(20).fill('').map((_, i) => `item #${i}`),
    }
  }

  render () {
    return (
			<View style={styles.container}>
					<SwipeListView
						dataSource={this.ds.cloneWithRows(this.state.listViewData)}
						renderRow={ data => (
							<TouchableHighlight
								onPress={_ => console.log('You touched me')}
								underlayColor={'#AAA'}
							>
								<View style={styles.gameContainer} >
									<View style={styles.teamsFieldContainer} >
										<Text style={styles.cellText} >I am the home team</Text>
										<Text style={styles.cellText} >I am the away team</Text>
									</View>
									<View style={styles.scoreContainer} >
										<Text style={styles.cellText} >456</Text>
										<Text style={styles.cellText} >123</Text>
									</View>
								</View>
							</TouchableHighlight>
						)}
						leftOpenValue={75}
						rightOpenValue={-150}
					/>
			</View>
		);
	}
}
export default GamesTableview
