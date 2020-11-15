import {
  UPLOAD_PHOTO_REQUEST,
  UPLOAD_PHOTO_SUCCESS,
  UPLOAD_PHOTO_FAIL,
  DELETE_PHOTOS
} from './types'
import axios from 'axios'
import cookie from 'js-cookie'

export const uploadPhoto = (photo) => async (dispatch) => {
  dispatch({ type: UPLOAD_PHOTO_REQUEST })

  try {
    const formData = new FormData()
    formData.set('file', photo)

    const token = cookie.get('accessToken')

    const { data: { filePath } } = await axios({
      method: 'post',
      url: '/api/v1/uploads/products',
      data: formData,
      headers: {
        token,
        'Content-Type': 'multipart/form-data'
      }
    })

    dispatch({
      type: UPLOAD_PHOTO_SUCCESS,
      payload: filePath
    })
  } catch (error) {
    dispatch({
      type: UPLOAD_PHOTO_FAIL,
      payload: error.message
    })
  }
}

export const deletePhotos = () => async (dispatch) => {
  dispatch({ type: DELETE_PHOTOS })
}