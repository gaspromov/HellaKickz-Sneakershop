import {
  UPLOAD_FEEDBACK_REQUEST,
  UPLOAD_FEEDBACK_SUCCESS,
  UPLOAD_FEEDBACK_FAIL,
  FETCH_FEEDBACKS_REQUEST,
  FETCH_FEEDBACKS_SUCCESS,
  FETCH_FEEDBACKS_FAIL
} from './types'
import axios from 'axios'
import cookie from 'js-cookie'

export const uploadFeedback = (id, feedback) => async (dispatch, getState) => {
  dispatch({
    type: UPLOAD_FEEDBACK_REQUEST,
    payload: id
  })

  try {
    const { photo: { entities } } = getState()
    const token = cookie.getJSON('accessToken')

    await axios.post(`/api/v1/landing/feedbacks/${id}`, {
      photo: entities[id],
      ...feedback
    }, {
      headers: {
        'Authorization': `Basic ${token.accessToken}`
      }
    })

    dispatch({
      type: UPLOAD_FEEDBACK_SUCCESS,
      payload: id
    })
  } catch (error) {
    dispatch({
      type: UPLOAD_FEEDBACK_FAIL,
      payload: {
        id: id,
        error: error?.response?.data?.message || error.message
      }
    })
  }
}

export const fetchFeedbacks = () => async (dispatch) => {
  dispatch({ type: FETCH_FEEDBACKS_REQUEST })

  try {
    const { data } = await axios.get('/api/v1/landing/feedbacks')

    dispatch({
      type: FETCH_FEEDBACKS_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: FETCH_FEEDBACKS_FAIL,
      payload: error?.response?.data?.message || error.message
    })
  }
}