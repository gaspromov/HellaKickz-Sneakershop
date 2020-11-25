import {
  USER_REQUEST,
  USER_SUCCESS,
  USER_FAIL,
  USER_LOGOUT
} from './types'
import axios from 'axios'
import cookie from 'js-cookie'

export const auth = (login, password) => async (dispatch) => {
  dispatch({ type: USER_REQUEST })

  try {
    const { data } = await axios.post('/api/v1/auth', { login, password })

    dispatch({ type: USER_SUCCESS })
    cookie.set('accessToken', JSON.stringify(data), { expires: 15 })
  } catch (error) {
    dispatch({
      type: USER_FAIL,
      payload: error?.response?.data?.message || error.message
    })
  }
}

export const logout = () => async (dispatch) => {
  cookie.remove('accessToken')

  dispatch({ type: USER_LOGOUT })
}