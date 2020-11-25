import {
  UPLOAD_HOT_REQUEST,
  UPLOAD_HOT_SUCCESS,
  UPLOAD_HOT_FAIL,
  FETCH_HOTS_REQUEST,
  FETCH_HOTS_SUCCESS,
  FETCH_HOTS_FAIL
} from './types'

const uploadHotInitialState = {
  loading: { 0: false, 1: false, 2: false, 3: false },
  loaded: { 0: false, 1: false, 2: false, 3: false },
  error: { 0: null, 1: null, 2: null, 3: null }
}

export const uploadHotReducer = (state = uploadHotInitialState, action) => {
  switch (action.type) {
    case UPLOAD_HOT_REQUEST:
      return {
        ...state,
        loading: { ...state.loading, [action.payload]: true },
        loaded: { ...state.loaded, [action.payload]: false },
        error: { ...state.error, [action.payload]: null }
      }
    case UPLOAD_HOT_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, [action.payload]: false },
        loaded: { ...state.loaded, [action.payload]: true },
        error: { ...state.error, [action.payload]: null },
      }
    case UPLOAD_HOT_FAIL:
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