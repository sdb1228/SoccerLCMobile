import { createActions } from 'redux-actions-magic'

import * as provider from '../providers/soccerlc'

const actionDefs = [
  'SOCCERLC_ASYNC_FAVORITE_TEAM_START',
  'SOCCERLC_ASYNC_FAVORITE_TEAM_SUCCESS',
  'SOCCERLC_ASYNC_FAVORITE_TEAM_FAIL',
  'SOCCERLC_ASYNC_UNFAVORITE_TEAM_START',
  'SOCCERLC_ASYNC_UNFAVORITE_TEAM_SUCCESS',
  'SOCCERLC_ASYNC_UNFAVORITE_TEAM_FAIL',
  'SOCCERLC_ASYNC_FACILITIES_TEAMS_START',
  'SOCCERLC_ASYNC_FACILITIES_TEAMS_SUCCESS',
  'SOCCERLC_ASYNC_FACILITIES_TEAMS_FAIL',
  'SOCCERLC_ASYNC_FACILITIES_DIVISIONS_START',
  'SOCCERLC_ASYNC_FACILITIES_DIVISIONS_SUCCESS',
  'SOCCERLC_ASYNC_FACILITIES_DIVISIONS_FAIL',
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
  'SOCCERLC_ASYNC_TEAMS_GAMES_START',
  'SOCCERLC_ASYNC_TEAMS_GAMES_SUCCESS',
  'SOCCERLC_ASYNC_TEAMS_GAMES_FAIL',
  'SOCCERLC_CLOSE_ERROR_MODAL',
  'SOCCERLC_SHOW_CALENDAR_ERROR',
  'SOCCERLC_SHOW_CALENDAR_SUCCESS',
  'SOCCERLC_REPORT_PROBLEM_MODAL',
  'SOCCERLC_CLOSE_REPORT_ERROR_MODAL'
  // 'SOCCERLC_ASYNC_REPORT_PROBLEM_START',
  // 'SOCCERLC_ASYNC_REPORT_PROBLEM_SUCCESS',
  // 'SOCCERLC_ASYNC_REPORT_PROBLEM_FAIL',
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

actions.reportAProblemModal = (game, open) => {
  game.modalOpen = open
  return (dispatch) => {
    dispatch(actions.soccerlcReportProblemModal(game, open))
  }
}

actions.closeReportErrorModal = () => {
  return (dispatch) => {
    dispatch(actions.soccerlcCloseReportErrorModal())
  }
}

// actions.reportProblem = (errorMessage) => {
//   return (dispatch) => {
//     dispatch(actions.soccerlcAsyncReportProblemStart())
//     provider.reportAProblem(errorMessage)
//     .then(res => dispatch(actions.soccerlcAsyncReportProblemSuccess(res.data)))
//     .catch(err => dispatch(actions.soccerlcAsyncReportProblemFail(err)))
//   }
// }

actions.showCalendarError = () => {
  return (dispatch) => {
    dispatch(actions.soccerlcShowCalendarError())
  }
}

actions.showCalendarSuccess = () => {
  return (dispatch) => {
    dispatch(actions.soccerlcShowCalendarSuccess())
  }
}

actions.getTeamsGames = (teamId, facilityId) => {
  return (dispatch) => {
    dispatch(actions.soccerlcAsyncTeamsGamesStart())
    provider.getTeamsGames(teamId, facilityId)
    .then(res => dispatch(actions.soccerlcAsyncTeamsGamesSuccess(res.data)))
    .catch(err => dispatch(actions.soccerlcAsyncTeamsGamesFail(err)))
  }
}

actions.getFavoriteTeamsGames = (uniqueDeviceId) => {
  return (dispatch) => {
    dispatch(actions.soccerlcAsyncFavoriteTeamsGamesStart())
    provider.getFavoriteTeamsGames(uniqueDeviceId)
    .then(res => dispatch(actions.soccerlcAsyncFavoriteTeamsGamesSuccess(res.data)))
    .catch(err => dispatch(actions.soccerlcAsyncFavoriteTeamsGamesFail(err)))
  }
}

actions.favoriteTeam = (uniqueDeviceId, teamId) => {
  return (dispatch) => {
    dispatch(actions.soccerlcAsyncFavoriteTeamStart())
    provider.favoriteTeam(uniqueDeviceId, teamId)
    .then(res => dispatch(actions.soccerlcAsyncFavoriteTeamSuccess(res.data)))
    .catch(err => dispatch(actions.soccerlcAsyncFavoriteTeamFail(err)))
  }
}

actions.unfavoriteTeam = (uniqueDeviceId, teamId) => {
  return (dispatch) => {
    dispatch(actions.soccerlcAsyncUnfavoriteTeamStart())
    provider.unfavoriteTeam(uniqueDeviceId, teamId)
    .then(res => {
      res.data[0] = teamId
      dispatch(actions.soccerlcAsyncUnfavoriteTeamSuccess(res.data))
    })
    .catch(err => dispatch(actions.soccerlcAsyncUnfavoriteTeamFail(err)))
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

actions.getFacilityTeams = (facilityId, uniqueDeviceId) => {
  return (dispatch) => {
    dispatch(actions.soccerlcAsyncFacilitiesTeamsStart())
    provider.getFacilityTeams(facilityId, uniqueDeviceId)
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

actions.getFacilityDivisions = (facilityId) => {
  return (dispatch) => {
    dispatch(actions.soccerlcAsyncFacilitiesDivisionsStart())
    provider.getFacilitiesDivisions(facilityId)
    .then(res => dispatch(actions.soccerlcAsyncFacilitiesDivisionsSuccess(res.data)))
    .catch(err => dispatch(actions.soccerlcAsyncFacilitiesDivisionsFail(err)))
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
