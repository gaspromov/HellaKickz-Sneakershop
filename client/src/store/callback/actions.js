import {
  FETCH_CALLBACKS_REQUEST,
  FETCH_CALLBACKS_SUCCESS,
  FETCH_CALLBACKS_FAIL,
  READ_CALLBACK_REQUEST,
  READ_CALLBACK_SUCCESS,
  READ_CALLBACK_FAIL,
  DELETE_CALLBACK_REQUEST,
  DELETE_CALLBACK_SUCCESS,
  DELETE_CALLBACK_FAIL,
  CREATE_CALLBACK_REQUEST,
  CREATE_CALLBACK_SUCCESS,
  CREATE_CALLBACK_FAIL
} from './types'
import axios from 'axios'
import cookie from 'js-cookie'

export const fetchCallbacks = () => async (dispatch) => {
  dispatch({ type: FETCH_CALLBACKS_REQUEST })

  try {
    const token = cookie.getJSON('accessToken')

    const { data } = await axios.get('/api/v1/callbacks', {
      headers: {
        'Authorization': `Basic ${token.accessToken}`
      }
    })

    dispatch({
      type: FETCH_CALLBACKS_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: FETCH_CALLBACKS_FAIL,
      payload: error?.response?.data?.message || error.message
    })
  }
}

export const readCallback = (id) => async (dispatch) => {
  dispatch({ type: READ_CALLBACK_REQUEST })

  try {
    const token = cookie.getJSON('accessToken')

    await axios.put(`/api/v1/callbacks/${id}`, {}, {
      headers: {
        'Authorization': `Basic ${token.accessToken}`
      }
    })

    dispatch({ type: READ_CALLBACK_SUCCESS })
  } catch (error) {
    dispatch({
      type: READ_CALLBACK_FAIL,
      payload: error?.response?.data?.message || error.message
    })
  }
}

export const deleteCallback = (id) => async (dispatch) => {
  dispatch({ type: DELETE_CALLBACK_REQUEST })

  try {
    const token = cookie.getJSON('accessToken')

    await axios.delete(`/api/v1/callbacks/${id}`, {
      headers: {
        'Authorization': `Basic ${token.accessToken}`
      }
    })

    dispatch({ type: DELETE_CALLBACK_SUCCESS })
  } catch (error) {
    dispatch({
      type: DELETE_CALLBACK_FAIL,
      payload: error?.response?.data?.message || error.message
    })
  }
}

export const createCallback = (id, name, number, link, brand, model, size, color) => async (dispatch) => {
  dispatch({
    type: CREATE_CALLBACK_REQUEST,
    payload: id
  })

  try {
    await axios.post('/api/v1/callbacks', {
      name,
      number,
      isRead: false,
      link,
      brand,
      model,
      size,
      color
    })

    dispatch({
      type: CREATE_CALLBACK_SUCCESS,
      payload: id
    })
  } catch (error) {
    console.dir(error)
    dispatch({
      type: CREATE_CALLBACK_FAIL,
      payload: {
        id,
        error: error?.response?.data?.message || error.message
      }
    })
  }
}