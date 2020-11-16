import {
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAIL,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAIL,
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL
} from './types'
import axios from 'axios'
import cookie from 'js-cookie'

export const addProduct = (product) => async (dispatch, getState) => {
  dispatch({ type: ADD_PRODUCT_REQUEST })

  try {
    const { photo: { entities } } = getState()
    const token = cookie.getJSON('accessToken')

    await axios.post('/api/v1/products', {
      photos: Object.values(entities),
      ...product
    }, {
      headers: {
        'Authorization': `Basic ${token.accessToken}`
      }
    })

    dispatch({ type: ADD_PRODUCT_SUCCESS })
  } catch (error) {
    dispatch({
      type: ADD_PRODUCT_FAIL,
      payload: error.message
    })
  }
}

export const fetchProducts = () => async (dispatch) => {
  dispatch({ type: FETCH_PRODUCTS_REQUEST })

  try {
    const { data } = await axios.get('/api/v1/products')

    dispatch({
      type: FETCH_PRODUCTS_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: FETCH_PRODUCTS_FAIL,
      payload: error.message
    })
  }
}

export const fetchProduct = (id) => async (dispatch) => {
  dispatch({ type: FETCH_PRODUCT_REQUEST })

  try {
    const { data } = await axios.get(`/api/v1/products/${id}`)

    dispatch({
      type: FETCH_PRODUCT_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: FETCH_PRODUCT_FAIL,
      payload: error.message
    })
  }
}

export const deleteProduct = (id) => async (dispatch) => {
  dispatch({ type: DELETE_PRODUCT_REQUEST })

  try {
    const token = cookie.getJSON('accessToken')

    await axios.delete(`/api/v1/products/${id}`, {
      headers: {
        'Authorization': `Basic ${token.accessToken}`
      }
    })

    dispatch({ type: DELETE_PRODUCT_SUCCESS })
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.message
    })
  }
}