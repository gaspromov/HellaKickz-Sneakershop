import { combineReducers } from 'redux'
import userReducer from './user/reducers'
import photoReducer from './photo/reducers'
import {
  addProductReducer,
  fetchProductsReducer,
  deleteProductReducer
} from './product/reducers'
import {
  fetchCallbacksReducer,
  readCallbackReducer,
  deleteCallbackReducer
} from './callback/reducers'
import { uploadSlideReducer } from './slide/reducers'
import { uploadHotReducer } from './hot/reducers'

export default combineReducers({
  user: userReducer,
  photo: photoReducer,
  addProduct: addProductReducer,
  products: fetchProductsReducer,
  deleteProduct: deleteProductReducer,
  callbacks: fetchCallbacksReducer,
  readCallback: readCallbackReducer,
  deleteCallback: deleteCallbackReducer,
  uploadSlide: uploadSlideReducer,
  uploadHot: uploadHotReducer
})