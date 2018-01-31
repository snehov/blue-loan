import { combineReducers } from 'redux'

import setCustomer from 'containers/Calculator/DataReducer.js'
import settings from 'containers/Calculator/getSettingsReducer.js'
import offer from 'containers/Calculator/offerReducer.js'

export default combineReducers({ setCustomer, settings, offer })
