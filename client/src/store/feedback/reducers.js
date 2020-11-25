import {
  UPLOAD_FEEDBACK_REQUEST,
  UPLOAD_FEEDBACK_SUCCESS,
  UPLOAD_FEEDBACK_FAIL,
  FETCH_FEEDBACKS_REQUEST,
  FETCH_FEEDBACKS_SUCCESS,
  FETCH_FEEDBACKS_FAIL
} from './types'

const uploadFeedbackInitialState = {
  loading: { 0: false, 1: false, 2: false, 3: false, 4: false, 5: false },
  loaded: { 0: false, 1: false, 2: false, 3: false, 4: false, 5: false },
  error: { 0: null, 1: null, 2: null, 3: null, 4: null, 5: null }
}

export const uploadFeedbackReducer = (state = uploadFeedbackInitialState, action) => {
  switch (action.type) {
    case UPLOAD_FEEDBACK_REQUEST:
      return {
        ...state,
        loading: { ...state.loading, [action.payload]: true },
        loaded: { ...state.loaded, [action.payload]: false },
        error: { ...state.error, [action.payload]: null }
      }
    case UPLOAD_FEEDBACK_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, [action.payload]: false },
        loaded: { ...state.loaded, [action.payload]: true },
        error: { ...state.error, [action.payload]: null },
      }
    case UPLOAD_FEEDBACK_FAIL:
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

const fetchFeedbacksInitialState = {
  loading: false,
  loaded: false,
  error: null,
  entities: []
}

export const fetchFeedbacksReducer = (state = fetchFeedbacksInitialState, action) => {
  switch (action.type) {
    case FETCH_FEEDBACKS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      }
    case FETCH_FEEDBACKS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: null,
        entities: action.payload
      }
    case FETCH_FEEDBACKS_FAIL:
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