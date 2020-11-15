import {
  UPLOAD_PHOTO_REQUEST,
  UPLOAD_PHOTO_SUCCESS,
  UPLOAD_PHOTO_FAIL,
  DELETE_ALL_PHOTOS,
  DELETE_PHOTO
} from './types'

const initialPhotoState = {
  loading: false,
  entities: {},
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
        entities: { ...state.entities, [action.payload.id]: action.payload.link },
        error: null
      }
    case UPLOAD_PHOTO_FAIL:
      return {
        ...state,
        loading: false,
        entities: {},
        error: action.payload
      }
    case DELETE_ALL_PHOTOS:
      return {
        ...state,
        entities: {}
      }
    case DELETE_PHOTO:
      const { [action.payload]: deletedValue, ...newEntities } = state.entities
      return {
        ...state,
        entities: newEntities
      }
    default:
      return state
  }
}