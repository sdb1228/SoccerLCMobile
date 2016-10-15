import { createActions } from 'redux-actions-magic'

import * as provider from '../providers/soccerlc'

const actionDefs = [
  'SOCCERLC_ASYNC_FACILITIES_TEAMS_START',
  'SOCCERLC_ASYNC_FACILITIES_TEAMS_SUCCESS',
  'SOCCERLC_ASYNC_FACILITIES_TEAMS_FAIL',
  'SOCCERLC_ASYNC_INDOOR_FACILITIES_START',
  'SOCCERLC_ASYNC_INDOOR_FACILITIES_SUCCESS',
  'SOCCERLC_ASYNC_INDOOR_FACILITIES_FAIL',
  'SOCCERLC_ASYNC_OUTDOOR_FACILITIES_START',
  'SOCCERLC_ASYNC_OUTDOOR_FACILITIES_SUCCESS',
  'SOCCERLC_ASYNC_OUTDOOR_FACILITIES_FAIL',
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

actions.getOutdoorFacilities = () => {
  return (dispatch) => {
    dispatch(actions.soccerlcAsyncOutdoorFacilitiesStart())
    provider.getOutdoorFacilities()
    .then(res => dispatch(actions.soccerlcAsyncOutdoorFacilitiesSuccess(res.data)))
    .catch(err => dispatch(actions.soccerlcAsyncOutdoorFacilitiesFail(err)))
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

export default { types, actions }
