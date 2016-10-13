import { combineReducers } from 'redux-immutable'

import tempReducer from './temp'
import soccerlcReducer from './soccerlc'

export default combineReducers({
  tempData: tempReducer,
  soccerlcData: soccerlcReducer,
})
