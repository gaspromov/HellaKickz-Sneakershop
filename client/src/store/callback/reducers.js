import {
  FETCH_CALLBACKS_REQUEST,
  FETCH_CALLBACKS_SUCCESS,
  FETCH_CALLBACKS_FAIL,
  READ_CALLBACK_REQUEST,
  READ_CALLBACK_SUCCESS,
  READ_CALLBACK_FAIL,
  DELETE_CALLBACK_REQUEST,
  DELETE_CALLBACK_SUCCESS,
  DELETE_CALLBACK_FAIL,
  CREATE_CALLBACK_REQUEST,
  CREATE_CALLBACK_SUCCESS,
  CREATE_CALLBACK_FAIL
} from './types'

const fetchCallbacksInitialState = {
  loading: false,
  loaded: false,
  error: null,
  entities: []
}

export const fetchCallbacksReducer = (state = fetchCallbacksInitialState, action) => {
  switch (action.type) {
    case FETCH_CALLBACKS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_CALLBACKS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: null,
        entities: action.payload
      }
    case FETCH_CALLBACKS_FAIL:
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

const readCallbackInitialState = {
  loading: false,
  loaded: false,
  error: null
}

export const readCallbackReducer = (state = readCallbackInitialState, action) => {
  switch (action.type) {
    case READ_CALLBACK_REQUEST:
      return {
        ...state,
        loading: true
      }
    case READ_CALLBACK_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: null
      }
    case READ_CALLBACK_FAIL:
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

const deleteCallbackInitialState = {
  loading: false,
  loaded: false,
  error: null
}

export const deleteCallbackReducer = (state = deleteCallbackInitialState, action) => {
  switch (action.type) {
    case DELETE_CALLBACK_REQUEST:
      return {
        ...state,
        loading: true
      }
    case DELETE_CALLBACK_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: null
      }
    case DELETE_CALLBACK_FAIL:
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

const createCallbackInitialState = {
  loading: false,
  loaded: false,
  error: null
}

export const createCallbackReducer = (state = createCallbackInitialState, action) => {
  switch (action.type) {
    case CREATE_CALLBACK_REQUEST:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null
      }
    case CREATE_CALLBACK_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: null
      }
    case CREATE_CALLBACK_FAIL:
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