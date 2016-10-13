import { combineReducers } from 'redux-immutable'
import { handleActions } from 'redux-actions'
import Immutable, { List } from 'immutable'

import actions from '../actions'

export default combineReducers({
  facilityTeamsList: handleActions({
    [actions.soccerlcAsyncFacilitiesTeamsSuccess.type]: (state, action) => {
      return Immutable.fromJS(action.payload)
    },
  }, List()),
}, {})
