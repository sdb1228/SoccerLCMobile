import { combineReducers } from 'redux-immutable'
import { handleActions } from 'redux-actions'
import Immutable, { List, Map } from 'immutable'

import actions from '../actions'

export default combineReducers({
  tempList: handleActions({
    [actions.tempAsyncListSuccess.type]: (state, action) => {
      return Immutable.fromJS(action.payload)
    },
  }, List()),

  // tempSingle: handleActions({
  //   [actions.tempAsyncSingleSuccess.type]: (state, action) => {
  //     return Immutable.fromJS(action.payload)
  //   },
  // }, Map()),
}, {})
