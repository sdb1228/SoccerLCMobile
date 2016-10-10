import { createActions } from 'redux-actions-magic'

import * as provider from '../providers/temp'

const actionDefs = [
  'TEMP_ASYNC_LIST_START',
  'TEMP_ASYNC_LIST_SUCCESS',
  'TEMP_ASYNC_LIST_FAIL',
]

const { types, actions } = createActions(actionDefs)

actions.getTempDataList = () => {
  return (dispatch) => {
    dispatch(actions.tempAsyncListStart())
    provider.getList()
      .then(res => dispatch(actions.tempAsyncListSuccess(res.data.results)))
      .catch(err => dispatch(actions.tempAsyncListFail(err)))
  }
}

export default { types, actions }
