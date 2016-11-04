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
      [actions.soccerlcAsyncFacilitiesTomorrowsGamesFail.type]: () => true,
      [actions.soccerlcAsyncFacilitiesTodaysGamesFail.type]: () => true,
      [actions.soccerlcAsyncFacilitiesTodaysGamesFail.type]: () => true,
      [actions.soccerlcAsyncFavoriteTeamFail.type]: () => true,
      [actions.soccerlcAsyncUnfavoriteTeamFail.type]: () => true,
      [actions.soccerlcCloseErrorModal.type]: () => false,
    }, false),
  }),

  facilityTodaysGames: combineReducers({
    loading: handleActions({
      [actions.soccerlcAsyncFacilitiesTodaysGamesStart.type]: () => true,
      [actions.soccerlcAsyncFacilitiesTodaysGamesSuccess.type]: () => false,
      [actions.soccerlcAsyncFacilitiesTodaysGamesFail.type]: () => false,
    }, false),
    error: handleActions({
      [actions.soccerlcAsyncFacilitiesTodaysGamesFail.type]: () => true,
      [actions.soccerlcAsyncFacilitiesTodaysGamesStart.type]: () => false,
      [actions.soccerlcAsyncFacilitiesTodaysGamesSuccess.type]: () => false,
    }, false),
    data: handleActions({
      [actions.soccerlcAsyncFacilitiesTodaysGamesSuccess.type]: (state, action) => {
        return Immutable.fromJS(action.payload)
      },
    }, Immutable.List()),
  }),

  favoriteTeam: combineReducers({
    loading: handleActions({
      [actions.soccerlcAsyncFavoriteTeamStart.type]: () => true,
      [actions.soccerlcAsyncFavoriteTeamSuccess.type]: () => false,
      [actions.soccerlcAsyncFavoriteTeamFail.type]: () => false,
    }, false),
    error: handleActions({
      [actions.soccerlcAsyncFavoriteTeamFail.type]: () => true,
      [actions.soccerlcAsyncFavoriteTeamStart.type]: () => false,
      [actions.soccerlcAsyncFavoriteTeamSuccess.type]: () => false,
    }, false),
    data: handleActions({
      [actions.soccerlcAsyncFavoriteTeamSuccess.type]: (state, action) => {
        return Immutable.fromJS(action.payload)
      },
    }, Immutable.List()),
  }),

  unfavoriteTeam: combineReducers({
    loading: handleActions({
      [actions.soccerlcAsyncUnfavoriteTeamStart.type]: () => true,
      [actions.soccerlcAsyncUnfavoriteTeamSuccess.type]: () => false,
      [actions.soccerlcAsyncUnfavoriteTeamFail.type]: () => false,
    }, false),
    error: handleActions({
      [actions.soccerlcAsyncUnfavoriteTeamFail.type]: () => true,
      [actions.soccerlcAsyncUnfavoriteTeamStart.type]: () => false,
      [actions.soccerlcAsyncUnfavoriteTeamSuccess.type]: () => false,
    }, false),
    data: handleActions({
      [actions.soccerlcAsyncUnfavoriteTeamSuccess.type]: (state, action) => {
        return Immutable.fromJS(action.payload)
      },
    }, Immutable.List()),
  }),

  teamGames: combineReducers({
    loading: handleActions({
      [actions.soccerlcAsyncTeamsGamesStart.type]: () => true,
      [actions.soccerlcAsyncTeamsGamesSuccess.type]: () => false,
      [actions.soccerlcAsyncTeamsGamesFail.type]: () => false,
    }, false),
    error: handleActions({
      [actions.soccerlcAsyncTeamsGamesFail.type]: () => true,
      [actions.soccerlcAsyncTeamsGamesStart.type]: () => false,
      [actions.soccerlcAsyncTeamsGamesSuccess.type]: () => false,
    }, false),
    data: handleActions({
      [actions.soccerlcAsyncTeamsGamesSuccess.type]: (state, action) => {
        return Immutable.fromJS(action.payload)
      },
    }, Immutable.List()),
  }),

  facilityDivisions: combineReducers({
    loading: handleActions({
      [actions.soccerlcAsyncFacilitiesDivisionsStart.type]: () => true,
      [actions.soccerlcAsyncFacilitiesDivisionsSuccess.type]: () => false,
      [actions.soccerlcAsyncFacilitiesDivisionsFail.type]: () => false,
    }, false),
    error: handleActions({
      [actions.soccerlcAsyncFacilitiesDivisionsFail.type]: () => true,
      [actions.soccerlcAsyncFacilitiesDivisionsStart.type]: () => false,
      [actions.soccerlcAsyncFacilitiesDivisionsSuccess.type]: () => false,
    }, false),
    data: handleActions({
      [actions.soccerlcAsyncFacilitiesDivisionsSuccess.type]: (state, action) => {
        return Immutable.fromJS(action.payload)
      },
    }, Immutable.List()),
  }),

  facilityTomorrowsGames: combineReducers({
    loading: handleActions({
      [actions.soccerlcAsyncFacilitiesTomorrowsGamesStart.type]: () => true,
      [actions.soccerlcAsyncFacilitiesTomorrowsGamesSuccess.type]: () => false,
      [actions.soccerlcAsyncFacilitiesTomorrowsGamesFail.type]: () => false,
    }, false),
    error: handleActions({
      [actions.soccerlcAsyncFacilitiesTomorrowsGamesFail.type]: () => true,
      [actions.soccerlcAsyncFacilitiesTomorrowsGamesStart.type]: () => false,
      [actions.soccerlcAsyncFacilitiesTomorrowsGamesSuccess.type]: () => false,
    }, false),
    data: handleActions({
      [actions.soccerlcAsyncFacilitiesTomorrowsGamesSuccess.type]: (state, action) => {
        return Immutable.fromJS(action.payload)
      },
    }, Immutable.List()),
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
      [actions.soccerlcAsyncFavoriteTeamSuccess.type]: (state, action) => {
        const index = state.findIndex(team => team.get('id') === action.payload[0].teamId)
        return index !== -1 ? state.updateIn([index, 'favorite'], () => true) : state
      },
      [actions.soccerlcAsyncUnfavoriteTeamSuccess.type]: (state, action) => {
        const index = state.findIndex(team => team.get('id') === action.payload[0])
        return index !== -1 ? state.updateIn([index, 'favorite'], () => false) : state
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
