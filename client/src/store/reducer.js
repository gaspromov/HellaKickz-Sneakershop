import { combineReducers } from 'redux'
import userReducer from './user/reducers'
import photoReducer from './photo/reducers'
import { addProductReducer, fetchProductsReducer } from './product/reducers'

export default combineReducers({
  user: userReducer,
  photo: photoReducer,
  addProduct: addProductReducer,
  products: fetchProductsReducer
})