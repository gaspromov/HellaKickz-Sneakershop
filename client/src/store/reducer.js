import { combineReducers } from 'redux'
import userReducer from './user/reducers'
import photoReducer from './photo/reducers'
import {
  addProductReducer,
  fetchProductsReducer,
  fetchProductReducer,
  editProductReducer,
  deleteProductReducer
} from './product/reducers'
import {
  fetchCallbacksReducer,
  readCallbackReducer,
  deleteCallbackReducer
} from './callback/reducers'
import { uploadSlideReducer } from './slide/reducers'
import { uploadHotReducer } from './hot/reducers'
import { uploadFeedbackReducer } from './feedback/reducers'

export default combineReducers({
  user: userReducer,
  photo: photoReducer,
  addProduct: addProductReducer,
  products: fetchProductsReducer,
  product: fetchProductReducer,
  editProduct: editProductReducer,
  deleteProduct: deleteProductReducer,
  callbacks: fetchCallbacksReducer,
  readCallback: readCallbackReducer,
  deleteCallback: deleteCallbackReducer,
  uploadSlide: uploadSlideReducer,
  uploadHot: uploadHotReducer,
  uploadFeedback: uploadFeedbackReducer
})