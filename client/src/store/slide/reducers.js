import {
  UPLOAD_SLIDE_REQUEST,
  UPLOAD_SLIDE_SUCCESS,
  UPLOAD_SLIDE_FAIL,
  FETCH_SLIDES_REQUEST,
  FETCH_SLIDES_SUCCESS,
  FETCH_SLIDES_FAIL
} from './types'

const uploadSlideInitialState = {
  loading: { 0: false, 1: false, 2: false },
  loaded: { 0: false, 1: false, 2: false },
  error: { 0: null, 1: null, 2: null }
}

export const uploadSlideReducer = (state = uploadSlideInitialState, action) => {
  switch (action.type) {
    case UPLOAD_SLIDE_REQUEST:
      return {
        ...state,
        loading: { ...state.loading, [action.payload]: true },
        loaded: { ...state.loaded, [action.payload]: false },
        error: { ...state.error, [action.payload]: null }
      }
    case UPLOAD_SLIDE_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, [action.payload]: false },
        loaded: { ...state.loaded, [action.payload]: true },
        error: { ...state.error, [action.payload]: null },
      }
    case UPLOAD_SLIDE_FAIL:
      return {
        ...state,
        loading: { ...state.loading, [action.payload.id]: false },
        loaded: { ...state.loaded, [action.payload]: true },
        error: { ...state.error, [action.payload.id]: action.payload.error }
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