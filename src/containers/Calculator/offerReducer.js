import { REQUEST_OFFER, RECEIVE_OFFER } from 'utils/types'

const initialState = {
  isFetching: false,
  didInvalidate: false,
  offer: {},
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case REQUEST_OFFER:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
      })
    case RECEIVE_OFFER:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        offer: action.offer,
        lastUpdated: action.receivedAt,
      })

    default:
      return state
  }
}
