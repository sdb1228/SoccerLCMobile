import Axios from 'axios'

import { soccerlc } from './config'

// create our own instance of axios for SoccerLC API so that way we can configure it
const axios = Axios.create()

// remove a layer of .data from the response
axios.interceptors.response.use(res => res.data, err => Promise.reject(error))

export function getFacilityTeams (facilityId) {
  return axios.get(`${soccerlc.baseUrl}facilities/${facilityId}/teams`)
}

export function getIndoorFacilities () {
  return axios.get(`${soccerlc.baseUrl}facilities/Indoor`)
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
