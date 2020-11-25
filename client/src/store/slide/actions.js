import {
  UPLOAD_SLIDE_REQUEST,
  UPLOAD_SLIDE_SUCCESS,
  UPLOAD_SLIDE_FAIL,
  FETCH_SLIDES_REQUEST,
  FETCH_SLIDES_SUCCESS,
  FETCH_SLIDES_FAIL
} from './types'
import axios from 'axios'
import cookie from 'js-cookie'

export const uploadSlide = (id, link) => async (dispatch, getState) => {
  dispatch({
    type: UPLOAD_SLIDE_REQUEST,
    payload: id
  })

  try {
    const { photo: { entities } } = getState()
    const token = cookie.getJSON('accessToken')

    await axios.post(`/api/v1/landing/slides/${id}`, {
      photo: entities[id],
      link
    }, {
      headers: {
        'Authorization': `Basic ${token.accessToken}`
      }
    })

    dispatch({
      type: UPLOAD_SLIDE_SUCCESS,
      payload: id
    })
  } catch (error) {
    dispatch({
      type: UPLOAD_SLIDE_FAIL,
      payload: {
        id,
        error: error?.response?.data?.message || error.message
      }
    })
  }
}

export const fetchSlides = () => async (dispatch) => {
  dispatch({ type: FETCH_SLIDES_REQUEST })

  try {
    const { data } = await axios.get('/api/v1/landing/slides')

    dispatch({
      type: FETCH_SLIDES_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: FETCH_SLIDES_FAIL,
      payload: error?.response?.data?.message || error.message
    })
  }
}