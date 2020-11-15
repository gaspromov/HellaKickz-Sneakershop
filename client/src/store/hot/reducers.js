import {
  UPLOAD_HOT_REQUEST,
  UPLOAD_HOT_SUCCESS,
  UPLOAD_HOT_FAIL
} from './types'

const uploadHotInitialState = {
  loading: false,
  loaded: false,
  error: null
}

export const uploadHotReducer = (state = uploadHotInitialState, action) => {
  switch (action.type) {
    case UPLOAD_HOT_REQUEST:
      return {
        ...state,
        loading: true
      }
    case UPLOAD_HOT_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: null
      }
    case UPLOAD_HOT_FAIL:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: action.payload
      }
    default:
      return state
  }
}