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
  deleteCallbackReducer,
  createCallbackReducer
} from './callback/reducers'
import { uploadSlideReducer, fetchSlidesReducer } from './slide/reducers'
import { uploadHotReducer, fetchHotsReducer } from './hot/reducers'
import { uploadFeedbackReducer, fetchFeedbacksReducer } from './feedback/reducers'

export default combineReducers({
  user: userReducer,
  photo: photoReducer,
  addProduct: addProductReducer,
  products: fetchProductsReducer,
  product: fetchProductReducer,
  editProduct: editProductReducer,
  deleteProduct: deleteProductReducer,
  callbacks: fetchCallbacksReducer,
  createCallback: createCallbackReducer,
  readCallback: readCallbackReducer,
  deleteCallback: deleteCallbackReducer,
  uploadSlide: uploadSlideReducer,
  slides: fetchSlidesReducer,
  uploadHot: uploadHotReducer,
  hots: fetchHotsReducer,
  uploadFeedback: uploadFeedbackReducer,
  feedbacks: fetchFeedbacksReducer
})