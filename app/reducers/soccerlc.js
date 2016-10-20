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
  indoorFacilities: handleActions({
    [actions.soccerlcAsyncIndoorFacilitiesSuccess.type]: (state, action) => {
      return Immutable.fromJS(action.payload)
    },
  }, List()),
  outdoorFacilities: handleActions({
    [actions.soccerlcAsyncOutdoorFacilitiesSuccess.type]: (state, action) => {
      return Immutable.fromJS(action.payload)
    },
  }, List()),

  favoriteTeamsGames: handleActions({
    [actions.soccerlcAsyncFavoriteTeamsGamesSuccess.type]: (state, action) => {
      return Immutable.fromJS(action.payload)
    },
  }, List()),
}, {})
