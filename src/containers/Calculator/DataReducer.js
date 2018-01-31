import { SET_CUSTOMER } from 'utils/types'

const initialState = {
  approved: false,
  customer: [],
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CUSTOMER:
      return Object.assign({}, state, {
        aprroved: true,
        customer: action.customer,
      })

    default:
      return state
  }
}
