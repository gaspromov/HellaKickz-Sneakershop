import {
  UPLOAD_HOT_REQUEST,
  UPLOAD_HOT_SUCCESS,
  UPLOAD_HOT_FAIL
} from './types'
import axios from 'axios'
import cookie from 'js-cookie'

export const uploadHot = (id, link) => async (dispatch, getState) => {
  dispatch({ type: UPLOAD_HOT_REQUEST })

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

    dispatch({ type: UPLOAD_HOT_SUCCESS })
  } catch (error) {
    console.dir(error)
    dispatch({
      type: UPLOAD_HOT_FAIL,
      payload: error.message
    })
  }
}