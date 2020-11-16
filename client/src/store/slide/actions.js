import {
  UPLOAD_SLIDE_REQUEST,
  UPLOAD_SLIDE_SUCCESS,
  UPLOAD_SLIDE_FAIL
} from './types'
import axios from 'axios'
import cookie from 'js-cookie'

export const uploadSlide = (id) => async (dispatch, getState) => {
  dispatch({ type: UPLOAD_SLIDE_REQUEST })

  try {
    const { photo: { entities } } = getState()
    const token = cookie.getJSON('accessToken')

    await axios.post(`/api/v1/landing/slides/${id}`, {
      photo: entities[id]
    }, {
      headers: {
        'Authorization': `Basic ${token.accessToken}`
      }
    })

    dispatch({ type: UPLOAD_SLIDE_SUCCESS })
  } catch (error) {
    dispatch({
      type: UPLOAD_SLIDE_FAIL,
      payload: error?.response?.data?.message || error.message
    })
  }
}