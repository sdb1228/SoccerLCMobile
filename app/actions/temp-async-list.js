import { createActions } from 'redux-actions'

import * as provider from '../providers/temp'

const types = [
  'TEMP_ASYNC_LIST_START',
  'TEMP_ASYNC_LIST_SUCCESS',
  'TEMP_ASYNC_LIST_FAIL',
]

const { tempAsyncStart, tempAsyncSuccess, tempAsyncFail} = createActions(
  'TEMP_ASYNC_LIST_START',
  'TEMP_ASYNC_LIST_SUCCESS',
  'TEMP_ASYNC_LIST_FAIL',
)

const actions = [tempAsyncStart, tempAsyncSuccess, tempAsyncFail]
actions.getTempDataList = () => {
  return (dispatch) => {
    dispatch(actions.tempAsyncListStart())
    provider.getList()
      .then(res => dispatch(actions.tempAsyncListSuccess(res.data.results)))
      .catch(err => dispatch(actions.tempAsyncListFail(err)))
  }
}

export default { types, actions }
