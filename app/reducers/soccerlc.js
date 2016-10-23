import { combineReducers } from 'redux-immutable'
import { handleActions } from 'redux-actions'
import Immutable, { List } from 'immutable'

import actions from '../actions'

export default combineReducers({

  errorModalOpen: combineReducers({
    error: handleActions({
      [actions.soccerlcAsyncFavoriteTeamsGamesFail.type]: () => true,
      [actions.soccerlcAsyncFacilitiesTeamsFail.type]: () => true,
      [actions.soccerlcAsyncIndoorFacilitiesFail.type]: () => true,
      [actions.soccerlcAsyncOutdoorFacilitiesFail.type]: () => true,
      [actions.soccerlcCloseErrorModal.type]: () => false,
    }, false),
  }),

  facilityTeamsList: combineReducers({
    loading: handleActions({
      [actions.soccerlcAsyncFacilitiesTeamsStart.type]: () => true,
      [actions.soccerlcAsyncFacilitiesTeamsSuccess.type]: () => false,
      [actions.soccerlcAsyncFacilitiesTeamsFail.type]: () => false,
    }, false),
    error: handleActions({
      [actions.soccerlcAsyncFacilitiesTeamsFail.type]: () => true,
      [actions.soccerlcAsyncFacilitiesTeamsStart.type]: () => false,
      [actions.soccerlcAsyncFacilitiesTeamsSuccess.type]: () => false,
    }, false),
    data: handleActions({
      [actions.soccerlcAsyncFacilitiesTeamsSuccess.type]: (state, action) => {
        return Immutable.fromJS(action.payload)
      },
    }, Immutable.List()),
  }),

  indoorFacilities: combineReducers({
    loading: handleActions({
      [actions.soccerlcAsyncIndoorFacilitiesStart.type]: () => true,
      [actions.soccerlcAsyncIndoorFacilitiesSuccess.type]: () => false,
      [actions.soccerlcAsyncIndoorFacilitiesFail.type]: () => false,
    }, false),
    error: handleActions({
      [actions.soccerlcAsyncIndoorFacilitiesFail.type]: () => true,
      [actions.soccerlcAsyncIndoorFacilitiesStart.type]: () => false,
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
      [actions.soccerlcAsyncOutdoorFacilitiesFail.type]: () => false,
    }, false),
    error: handleActions({
      [actions.soccerlcAsyncOutdoorFacilitiesFail.type]: () => true,
      [actions.soccerlcAsyncOutdoorFacilitiesStart.type]: () => false,
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
