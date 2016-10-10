import React, { Component } from 'react'
const { object } = React.PropTypes
import { View, Text } from 'react-native'

import { formatName } from '../helpers/name'
import style from '../styles/data-list'

export default class BottomButtonBar extends Component {

  componentWillMount () {
    this.props.actions.getTempDataList()
  }

  render () {
    return (
      <View style={style.view}>
        {this.renderItems()}
      </View>
    )
  }
}
