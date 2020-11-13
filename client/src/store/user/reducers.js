import {
  USER_REQUEST,
  USER_SUCCESS,
  USER_FAIL
} from './types'
import cookie from 'js-cookie'

const initialUserState = {
  loading: false,
  isLoggedIn: !!cookie.getJSON('accessToken') || false,
  error: null
}

export default (state = initialUserState, action) => {
  switch (action.type) {
    case USER_REQUEST:
      return {
        ...state,
        loading: true
      }
    case USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isLoggedIn: true,
        error: null
      }
    case USER_FAIL:
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
        error: action.payload
      }
    default:
      return state
  }
}