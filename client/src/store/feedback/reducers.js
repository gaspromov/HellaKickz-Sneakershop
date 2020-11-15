import {
  UPLOAD_FEEDBACK_REQUEST,
  UPLOAD_FEEDBACK_SUCCESS,
  UPLOAD_FEEDBACK_FAIL
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