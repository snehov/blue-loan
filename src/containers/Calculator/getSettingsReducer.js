import { REQUEST_SETTINGS, RECEIVE_SETTINGS } from 'utils/types'

const initialState = {
  isFetching: false,
  didInvalidate: false,
  settingsValues: {},
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case REQUEST_SETTINGS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
      })
    case RECEIVE_SETTINGS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        settingsValues: action.settings,
        lastUpdated: action.receivedAt,
      })

    default:
      return state
  }
}
