import {
  UPLOAD_SLIDE_REQUEST,
  UPLOAD_SLIDE_SUCCESS,
  UPLOAD_SLIDE_FAIL,
  FETCH_SLIDES_REQUEST,
  FETCH_SLIDES_SUCCESS,
  FETCH_SLIDES_FAIL
} from './types'

const uploadSlideInitialState = {
  loading: false,
  loaded: false,
  error: null
}

export const uploadSlideReducer = (state = uploadSlideInitialState, action) => {
  switch (action.type) {
    case UPLOAD_SLIDE_REQUEST:
      return {
        ...state,
        loaded: false,
        loading: true,
        error: null
      }
    case UPLOAD_SLIDE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: null
      }
    case UPLOAD_SLIDE_FAIL:
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

const fetchSlidesInitialState = {
  loading: false,
  loaded: false,
  error: null,
  entities: []
}

export const fetchSlidesReducer = (state = fetchSlidesInitialState, action) => {
  switch (action.type) {
    case FETCH_SLIDES_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_SLIDES_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: null,
        entities: action.payload
      }
    case FETCH_SLIDES_FAIL:
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