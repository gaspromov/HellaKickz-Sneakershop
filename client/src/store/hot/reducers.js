import {
  UPLOAD_HOT_REQUEST,
  UPLOAD_HOT_SUCCESS,
  UPLOAD_HOT_FAIL,
  FETCH_HOTS_REQUEST,
  FETCH_HOTS_SUCCESS,
  FETCH_HOTS_FAIL
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

const fetchHotsInitialState = {
  loading: false,
  loaded: false,
  error: null,
  entities: []
}

export const fetchHotsReducer = (state = fetchHotsInitialState, action) => {
  switch (action.type) {
    case FETCH_HOTS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_HOTS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: null,
        entities: action.payload
      }
    case FETCH_HOTS_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload
      }
    default:
      return state
  }
}