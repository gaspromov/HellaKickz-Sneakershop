import {
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAIL,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAIL
} from './types'
import axios from 'axios'
import cookie from 'js-cookie'

export const addProduct = (product) => async (dispatch, getState) => {
  dispatch({ type: ADD_PRODUCT_REQUEST })

  try {
    const { photo: { links } } = getState()
    const token = cookie.getJSON('accessToken')

    await axios.post('/api/v1/products', {
      photos: links,
      ...product
    }, {
      headers: {
        'Authorization': `Basic ${token.accessToken}`
      }
    })

    dispatch({ type: ADD_PRODUCT_SUCCESS })
  } catch (error) {
    console.dir(error)
    dispatch({
      type: ADD_PRODUCT_FAIL,
      payload: error.response.data.message
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