import { combineReducers } from 'redux'
import userReducer from './user/reducers'
import photoReducer from './photo/reducers'
import {
  addProductReducer,
  fetchProductsReducer,
  deleteProductReducer
} from './product/reducers'

export default combineReducers({
  user: userReducer,
  photo: photoReducer,
  addProduct: addProductReducer,
  products: fetchProductsReducer,
  deleteProduct: deleteProductReducer
})