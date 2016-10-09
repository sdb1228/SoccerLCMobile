import { combineReducers } from 'redux-immutable'

import tempReducer from './temp'

export default combineReducers({
  tempData: tempReducer,
})
