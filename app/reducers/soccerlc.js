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

  favoriteTeamsGames: combineReducers({
    loading: handleActions({
      [actions.soccerlcAsyncFavoriteTeamsGamesStart.type]: () => true,
      [actions.soccerlcAsyncFavoriteTeamsGamesSuccess.type]: () => false,
      [actions.soccerlcAsyncFavoriteTeamsGamesFail.type]: () => false,
    }, false),
    error: handleActions({
      [actions.soccerlcAsyncFavoriteTeamsGamesFail.type]: () => true,
      [actions.soccerlcAsyncFavoriteTeamsGamesStart.type]: () => false,
      [actions.soccerlcAsyncFavoriteTeamsGamesSuccess.type]: () => false,
    }, false),
    data: handleActions({
      [actions.soccerlcAsyncFavoriteTeamsGamesSuccess.type]: (state, action) => {
        return Immutable.fromJS(action.payload)
      },
    }, Immutable.List()),
  }),
}, {})
