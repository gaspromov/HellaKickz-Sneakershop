import {
  UPLOAD_PHOTO_REQUEST,
  UPLOAD_PHOTO_SUCCESS,
  UPLOAD_PHOTO_FAIL,
  DELETE_PHOTOS
} from './types'

const initialPhotoState = {
  loading: false,
  links: [],
  error: null
}

export default (state = initialPhotoState, action) => {
  switch (action.type) {
    case UPLOAD_PHOTO_REQUEST:
      return {
        ...state,
        loading: true
      }
    case UPLOAD_PHOTO_SUCCESS:
      return {
        ...state,
        loading: false,
        links: [...state.links, action.payload],
        error: null
      }
    case UPLOAD_PHOTO_FAIL:
      return {
        ...state,
        loading: false,
        links: [],
        error: action.payload
      }
    case DELETE_PHOTOS:
      return {
        ...state,
        links: []
      }
    default:
      return state
  }
}