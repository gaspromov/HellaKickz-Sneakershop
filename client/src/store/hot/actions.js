import {
  UPLOAD_HOT_REQUEST,
  UPLOAD_HOT_SUCCESS,
  UPLOAD_HOT_FAIL,
  FETCH_HOTS_REQUEST,
  FETCH_HOTS_SUCCESS,
  FETCH_HOTS_FAIL
} from './types'
import axios from 'axios'
import cookie from 'js-cookie'

export const uploadHot = (id, link) => async (dispatch, getState) => {
  dispatch({
    type: UPLOAD_HOT_REQUEST,
    payload: id - 4
  })

  try {
    const { photo: { entities } } = getState()
    const token = cookie.getJSON('accessToken')

    await axios.post(`/api/v1/landing/hots/${id - 4}`, {
      photo: entities[id],
      link
    }, {
      headers: {
        'Authorization': `Basic ${token.accessToken}`
      }
    })

    dispatch({
      type: UPLOAD_HOT_SUCCESS,
      payload: id - 4
    })
  } catch (error) {
    dispatch({
      type: UPLOAD_HOT_FAIL,
      payload: {
        id: id - 4,
        error: error?.response?.data?.message || error.message
      }
    })
  }
}

export const fetchHots = () => async (dispatch) => {
  dispatch({ type: FETCH_HOTS_REQUEST })

  try {
    const { data } = await axios.get('/api/v1/landing/hots')

    dispatch({
      type: FETCH_HOTS_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: FETCH_HOTS_FAIL,
      payload: error?.response?.data?.message || error.message
    })
  }
}