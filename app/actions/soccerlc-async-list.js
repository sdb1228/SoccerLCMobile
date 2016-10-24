import { createActions } from 'redux-actions-magic'

import * as provider from '../providers/soccerlc'

const actionDefs = [
  'SOCCERLC_ASYNC_FACILITIES_TEAMS_START',
  'SOCCERLC_ASYNC_FACILITIES_TEAMS_SUCCESS',
  'SOCCERLC_ASYNC_FACILITIES_TEAMS_FAIL',
  'SOCCERLC_ASYNC_FACILITIES_TODAYS_GAMES_START',
  'SOCCERLC_ASYNC_FACILITIES_TODAYS_GAMES_SUCCESS',
  'SOCCERLC_ASYNC_FACILITIES_TODAYS_GAMES_FAIL',
  'SOCCERLC_ASYNC_FACILITIES_TOMORROWS_GAMES_START',
  'SOCCERLC_ASYNC_FACILITIES_TOMORROWS_GAMES_SUCCESS',
  'SOCCERLC_ASYNC_FACILITIES_TOMORROWS_GAMES_FAIL',
  'SOCCERLC_ASYNC_INDOOR_FACILITIES_START',
  'SOCCERLC_ASYNC_INDOOR_FACILITIES_SUCCESS',
  'SOCCERLC_ASYNC_INDOOR_FACILITIES_FAIL',
  'SOCCERLC_ASYNC_OUTDOOR_FACILITIES_START',
  'SOCCERLC_ASYNC_OUTDOOR_FACILITIES_SUCCESS',
  'SOCCERLC_ASYNC_OUTDOOR_FACILITIES_FAIL',
  'SOCCERLC_ASYNC_FAVORITE_TEAMS_GAMES_START',
  'SOCCERLC_ASYNC_FAVORITE_TEAMS_GAMES_SUCCESS',
  'SOCCERLC_ASYNC_FAVORITE_TEAMS_GAMES_FAIL',
  'SOCCERLC_CLOSE_ERROR_MODAL',
]

const { types, actions } = createActions(actionDefs)

actions.getIndoorFacilities = () => {
  return (dispatch) => {
    dispatch(actions.soccerlcAsyncIndoorFacilitiesStart())
    provider.getIndoorFacilities()
    .then(res => dispatch(actions.soccerlcAsyncIndoorFacilitiesSuccess(res.data)))
    .catch(err => dispatch(actions.soccerlcAsyncIndoorFacilitiesFail(err)))
  }
}

actions.getFavoriteTeamsGames = () => {
  return (dispatch) => {
    dispatch(actions.soccerlcAsyncFavoriteTeamsGamesStart())
    provider.getFavoriteTeamsGames()
    .then(res => dispatch(actions.soccerlcAsyncFavoriteTeamsGamesSuccess(res.data)))
    .catch(err => dispatch(actions.soccerlcAsyncFavoriteTeamsGamesFail(err)))
  }
}

actions.getOutdoorFacilities = () => {
  return (dispatch) => {
    dispatch(actions.soccerlcAsyncOutdoorFacilitiesStart())
    provider.getOutdoorFacilities()
    .then(res => dispatch(actions.soccerlcAsyncOutdoorFacilitiesSuccess(res.data)))
    .catch(err => dispatch(actions.soccerlcAsyncOutdoorFacilitiesFail(err)))
  }
}

actions.closeErrorModal = () => {
  return (dispatch) => {
    dispatch(actions.soccerlcCloseErrorModal())
  }
}

actions.getFacilityTeams = (facilityId) => {
  return (dispatch) => {
    dispatch(actions.soccerlcAsyncFacilitiesTeamsStart())
    provider.getFacilityTeams(facilityId)
      .then(res => dispatch(actions.soccerlcAsyncFacilitiesTeamsSuccess(res.data)))
      .catch(err => dispatch(actions.soccerlcAsyncFacilitiesTeamsFail(err)))
  }
}

actions.getFacilityTodaysGames = (facilityId) => {
  return (dispatch) => {
    dispatch(actions.soccerlcAsyncFacilitiesTodaysGamesStart())
    provider.getFacilitiesTodaysGames(facilityId)
      .then(res => dispatch(actions.soccerlcAsyncFacilitiesTodaysGamesSuccess(res.data)))
      .catch(err => dispatch(actions.soccerlcAsyncFacilitiesTodaysGamesFail(err)))
  }
}

actions.getFacilityTomorrowsGames = (facilityId) => {
  return (dispatch) => {
    dispatch(actions.soccerlcAsyncFacilitiesTomorrowsGamesStart())
    provider.getFacilitiesTomorrowsGames(facilityId)
      .then(res => dispatch(actions.soccerlcAsyncFacilitiesTomorrowsGamesSuccess(res.data)))
      .catch(err => dispatch(actions.soccerlcAsyncFacilitiesTomorrowsGamesFail(err)))
  }
}

export default { types, actions }
