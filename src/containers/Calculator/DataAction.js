import axios from 'axios'
import { SET_CUSTOMER } from 'utils/types'

export function setInsertCustomerStatus(customerObj) {
  return {
    type: SET_CUSTOMER,
    customer: customerObj,
  }
}

export function sendNewCustomer(data) {
  return dispatch => {
    return axios({
      method: 'post',
      url: 'http://snowsoft.cz/sporicka-test-api.php',
      data,
    }).then(res => {
      localStorage.setItem('customer', JSON.stringify(res.data))
      dispatch(setInsertCustomerStatus(res.data))
    })
  }
}
