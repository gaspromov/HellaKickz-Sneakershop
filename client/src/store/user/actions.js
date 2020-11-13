import {
  USER_REQUEST,
  USER_SUCCESS,
  USER_FAIL
} from './types'
import axios from 'axios'

export const login = (login, password) => async (dispatch) => {
  dispatch({ type: USER_REQUEST })

  try {
    const { data } = await axios.post('/api/v1/auth', { login, password })

    dispatch({ type: USER_SUCCESS })
    localStorage.setItem('accessToken', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_FAIL,
      payload: error.response.data
    })
  }
}