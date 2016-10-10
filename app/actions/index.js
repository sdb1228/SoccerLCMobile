import { combineActions } from 'redux-actions-magic'
import tempActions from './temp'
import tempAsyncListActions from './temp-async-list'

const { types, actions } = combineActions([ tempActions, tempAsyncListActions ])

export { types, actions as default }
