import axios from 'axios'

import { soccerlc } from './config'

export function getFacilityTeams (facilityId) {
  return axios.get(`${soccerlc.baseUrl}facilities/${facilityId}/teams`)
}
