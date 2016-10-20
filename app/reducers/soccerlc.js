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

  indoorFacilities: combineReducers({
    loading: handleActions({
      [actions.soccerlcAsyncIndoorFacilitiesStart.type]: () => true,
      [actions.soccerlcAsyncIndoorFacilitiesSuccess.type]: () => false,
    }, false),
    data: handleActions({
      [actions.soccerlcAsyncIndoorFacilitiesSuccess.type]: (state, action) => {
        return Immutable.fromJS(action.payload)
      },
    }, Immutable.List()),
  }),

  outdoorFacilities: combineReducers({
    loading: handleActions({
      [actions.soccerlcAsyncOutdoorFacilitiesStart.type]: () => true,
      [actions.soccerlcAsyncOutdoorFacilitiesSuccess.type]: () => false,
    }, false),
    data: handleActions({
      [actions.soccerlcAsyncOutdoorFacilitiesSuccess.type]: (state, action) => {
        return Immutable.fromJS(action.payload)
      },
    }, Immutable.List()),
  }),

  favoriteTeamsGames: handleActions({
    [actions.soccerlcAsyncFavoriteTeamsGamesSuccess.type]: (state, action) => {
      return Immutable.fromJS(action.payload)
    },
  }, List()),
}, {})
