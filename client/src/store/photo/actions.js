import {
  UPLOAD_PHOTO_REQUEST,
  UPLOAD_PHOTO_SUCCESS,
  UPLOAD_PHOTO_FAIL,
  DELETE_ALL_PHOTOS,
  DELETE_PHOTO
} from './types'
import axios from 'axios'
import cookie from 'js-cookie'
import { nanoid } from 'nanoid'

export const uploadPhoto = (photo, folder, id) => async (dispatch) => {
  dispatch({ type: UPLOAD_PHOTO_REQUEST })

  try {
    const formData = new FormData()
    formData.set('file', photo)

    const token = cookie.getJSON('accessToken')

    const { data: { filePath } } = await axios({
      method: 'post',
      url: `/api/v1/uploads/${folder}`,
      data: formData,
      headers: {
        'Authorization': `Basic ${token.accessToken}`,
        'Content-Type': 'multipart/form-data'
      }
    })

    dispatch({
      type: UPLOAD_PHOTO_SUCCESS,
      payload: { link: filePath, id: id || id === 0 ? id : nanoid() }
    })
  } catch (error) {
    dispatch({
      type: UPLOAD_PHOTO_FAIL,
      payload: error.message
    })
  }
}

export const deletePhotos = (id) => async (dispatch) => {
  if (id) {
    dispatch({
      type: DELETE_PHOTO,
      payload: id
    })
  } else {
    dispatch({ type: DELETE_ALL_PHOTOS })
  }
}