import {
  UPLOAD_FEEDBACK_REQUEST,
  UPLOAD_FEEDBACK_SUCCESS,
  UPLOAD_FEEDBACK_FAIL,
  FETCH_FEEDBACKS_REQUEST,
  FETCH_FEEDBACKS_SUCCESS,
  FETCH_FEEDBACKS_FAIL
} from './types'

const uploadFeedbackInitialState = {
  loading: false,
  loaded: false,
  error: null
}

export const uploadFeedbackReducer = (state = uploadFeedbackInitialState, action) => {
  switch (action.type) {
    case UPLOAD_FEEDBACK_REQUEST:
      return {
        ...state,
        loading: true
      }
    case UPLOAD_FEEDBACK_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: null
      }
    case UPLOAD_FEEDBACK_FAIL:
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