import {
  UPLOAD_FEEDBACK_REQUEST,
  UPLOAD_FEEDBACK_SUCCESS,
  UPLOAD_FEEDBACK_FAIL
} from './types'
import axios from 'axios'
import cookie from 'js-cookie'

export const uploadFeedback = (id, feedback) => async (dispatch, getState) => {
  dispatch({ type: UPLOAD_FEEDBACK_REQUEST })

  try {
    const { photo: { entities } } = getState()
    const token = cookie.getJSON('accessToken')

    await axios.post(`/api/v1/landing/feedbacks/${id - 1}`, {
      photo: entities[id],
      ...feedback
    }, {
      headers: {
        'Authorization': `Basic ${token.accessToken}`
      }
    })

    dispatch({ type: UPLOAD_FEEDBACK_SUCCESS })
  } catch (error) {
    dispatch({
      type: UPLOAD_FEEDBACK_FAIL,
      payload: error.message
    })
  }
}