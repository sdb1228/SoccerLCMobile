import axios from 'axios'

import { soccerlc } from './config'

export function getFacilityTeams (facilityId) {
  return axios.get(`${soccerlc.baseUrl}facilities/${facilityId}/teams`)
}

export function getIndoorFacilities () {
  return axios.get(`${soccerlc.baseUrl}facilities/Indoor`)
}

export function getOutdoorFacilities () {
  return axios.get(`${soccerlc.baseUrl}facilities/Outdoor`)
}
