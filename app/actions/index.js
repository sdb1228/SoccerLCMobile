import { combineActions } from 'redux-actions-magic'
import tempActions from './temp'
import tempAsyncListActions from './temp-async-list'
import soccerlcAsyncFacilitiesActions from './soccerlc-async-list'

const { types, actions } = combineActions([ tempActions, tempAsyncListActions, soccerlcAsyncFacilitiesActions ])

export { types, actions as default }
