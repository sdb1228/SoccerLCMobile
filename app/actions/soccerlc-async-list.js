import { createActions } from 'redux-actions-magic'

import * as provider from '../providers/soccerlc'

const actionDefs = [
  'SOCCERLC_ASYNC_FACILITIES_TEAMS_START',
  'SOCCERLC_ASYNC_FACILITIES_TEAMS_SUCCESS',
  'SOCCERLC_ASYNC_FACILITIES_TEAMS_FAIL',
]

const { types, actions } = createActions(actionDefs)

actions.getFacilityTeams = (facilityId) => {
  return (dispatch) => {
    dispatch(actions.soccerlcAsyncFacilitiesTeamsStart())
    provider.getFacilityTeams(facilityId)
      .then(res => dispatch(actions.soccerlcAsyncFacilitiesTeamsSuccess(res.data)))
      .catch(err => dispatch(actions.soccerlcAsyncFacilitiesTeamsFail(err)))
  }
}
export default { types, actions }
