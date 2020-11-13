import { combineReducers } from 'redux'
import userReducer from './user/reducers'

export default combineReducers({
  test: () => 'hello',
  user: userReducer
})