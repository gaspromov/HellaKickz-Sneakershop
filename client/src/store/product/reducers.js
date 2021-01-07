import {
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAIL,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAIL,
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAIL,
  EDIT_PRODUCT_REQUEST,
  EDIT_PRODUCT_SUCCESS,
  EDIT_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL
} from './types'

const addProductInitialState = {
  loading: false,
  loaded: false,
  error: null
}

export const addProductReducer = (state = addProductInitialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT_REQUEST:
      return {
        ...state,
        loaded: false,
        loading: true,
        error: null
      }
    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: null
      }
    case ADD_PRODUCT_FAIL:
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

const fetchProductsInitialState = {
  loading: false,
  loaded: false,
  error: null,
  entities: []
}

export const fetchProductsReducer = (state = fetchProductsInitialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: null,
        entities: action.payload
      }
    case FETCH_PRODUCTS_FAIL:
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

const fetchProductInitialState = {
  loading: false,
  loaded: false,
  error: null,
  entities: {}
}

export const fetchProductReducer = (state = fetchProductInitialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        loaded: false,
        entities: {}
      }
    case FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: null,
        entities: action.payload
      }
    case FETCH_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: action.payload,
        entities: {}
      }
    default:
      return state
  }
}

const editProductInitialState = {
  loading: false,
  loaded: false,
  error: null
}

export const editProductReducer = (state = editProductInitialState, action) => {
  switch (action.type) {
    case EDIT_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      }
    case EDIT_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: null
      }
    case EDIT_PRODUCT_FAIL:
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

const deleteProductInitialState = {
  loading: false,
  loaded: false,
  error: null
}

export const deleteProductReducer = (state = deleteProductInitialState, action) => {
  switch (action.type) {
    case DELETE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      }
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: null
      }
    case DELETE_PRODUCT_FAIL:
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

