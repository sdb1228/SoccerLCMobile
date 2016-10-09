import React, { Component } from 'react'
const { object } = React.PropTypes
import { View, Text } from 'react-native'

import { formatName } from '../helpers/name'
import style from '../styles/data-list'

export default class DataList extends Component {
  static propTypes = {
    data: object.isRequired,
    actions: object.isRequired,
  }

  componentWillMount () {
    this.props.actions.getTempDataList()
  }

  renderItems () {
    const { data } = this.props

    if (data.size) {
      return data.map(item => {
        const name = item.get('name').toJS()
        return (
          <Text key={item.hashCode()} style={style.text}>{formatName(name)}</Text>
        )
      })
    } else {
      return (
        <Text>No items found</Text>
      )
    }
  }

  render () {
    return (
      <View style={style.view}>
        {this.renderItems()}
      </View>
    )
  }
}
