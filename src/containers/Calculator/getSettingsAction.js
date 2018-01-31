import axios from 'axios'
import apiSettings from 'utils/apiSettings'
import { REQUEST_SETTINGS, RECEIVE_SETTINGS } from 'utils/types'

function requestSettings() {
  return {
    type: REQUEST_SETTINGS,
  }
}

function receiveSettings(settings) {
  //console.log('actions/receiveSettings from ACTIONS', settings)
  return {
    type: RECEIVE_SETTINGS,
    settings,
    receivedAt: Date.now(),
  }
}
export function fetchSettings() {
  return dispatch => {
    return axios({
      method: apiSettings.getSettings.method,
      url: apiSettings.getSettings.url,
      headers: apiSettings.getSettings.headers,
    })
      .then(res => {
        localStorage.setItem('settings', JSON.stringify(res.data))
        dispatch(receiveSettings(res.data))
        //console.log('actions/fetchSettings res=>', res.data)
        return res.data
      })
      .catch(err => {
        if (err.response.status === 401) {
          console.error('settings fetch network error: ' + err.response.status)
          return 'loged-out'
        }
      })
  }
}
