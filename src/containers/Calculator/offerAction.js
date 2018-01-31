import axios from 'axios'
import apiSettings from 'utils/apiSettings'
import { REQUEST_OFFER, RECEIVE_OFFER } from 'utils/types'

function receiveOffer(offer) {
  //console.log('actions/receiveOffer from ACTIONS', settings)
  return {
    type: RECEIVE_OFFER,
    offer,
    receivedAt: Date.now(),
  }
}
export function fetchOffer(paymentValue, termLength) {
  // tady bych zavolal fci ktera zjisti jestli uz pozadavek nebyl vyslan, jinak na server request
  return dispatch => {
    return axios({
      method: apiSettings.getOffer.method,
      url: apiSettings.getOffer.url + 'amount=' + paymentValue + '&term=' + termLength,
      headers: apiSettings.getOffer.headers,
    })
      .then(res => {
        dispatch(receiveOffer(res.data))
        return res.data
      })
      .catch(err => {
        console.error('settings fetch network error: ' + err.response.status)
        return 'fail'
      })
  }
}
