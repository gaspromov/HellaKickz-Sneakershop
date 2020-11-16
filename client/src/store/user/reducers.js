import {
  USER_REQUEST,
  USER_SUCCESS,
  USER_FAIL,
  USER_LOGOUT
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
        loading: true,
        error: null
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
    case USER_LOGOUT:
      return {
        ...state,
        loading: false,
        error: null,
        isLoggedIn: false
      }
    default:
      return state
  }
}