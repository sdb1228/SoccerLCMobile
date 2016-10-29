import Axios from 'axios'

import { soccerlc } from './config'

// create our own instance of axios for SoccerLC API so that way we can configure it
const axios = Axios.create()

// remove a layer of .data from the response
axios.interceptors.response.use(res => res.data, err => Promise.reject(err))

export function getFacilityTeams (facilityId, uniqueDeviceId) {
  return axios.get(`${soccerlc.baseUrl}facilities/${facilityId}/teams`, {
    params: {
      installationId: uniqueDeviceId,
    },
  })
}

export function getIndoorFacilities () {
  return axios.get(`${soccerlc.baseUrl}facilities/Indoor`)
}

export function getFacilitiesDivisions (facilityId) {
  return axios.get(`${soccerlc.baseUrl}facilities/${facilityId}/divisions`)
}

export function getFacilitiesTodaysGames (facilityId) {
  return axios.get(`${soccerlc.baseUrl}facilities/${facilityId}/games/today`)
}

export function getFacilitiesTomorrowsGames (facilityId) {
  return axios.get(`${soccerlc.baseUrl}facilities/${facilityId}/games/tomorrow`)
}

export function getOutdoorFacilities () {
  return axios.get(`${soccerlc.baseUrl}facilities/Outdoor`)
}

export function getFavoriteTeamsGames (uniqueDeviceId) {
  return axios.get(`${soccerlc.baseUrl}favorites/games`, {
    params: {
      installationId: uniqueDeviceId,
    },
  })
}
