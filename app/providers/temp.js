import axios from 'axios'

import { tempProvider } from './config'

export function getSingle () {
  return axios.get(`${tempProvider.baseUrl}`)
}

export function getList () {
  return axios.get(`${tempProvider.baseUrl}?results=10`)
}
export function getFacilityTeams (facilityId) {
  return axios.get(`${tempProvider.baseUrl}${facilityId}/1/teams`)
}
