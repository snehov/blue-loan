import { combineReducers } from 'redux'

import setCustomer from 'containers/Calculator/DataReducer.js'
import settings from 'containers/Calculator/getSettingsReducer.js'

export default combineReducers({ setCustomer, settings })
