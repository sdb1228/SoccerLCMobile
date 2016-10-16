import { combineActions } from 'redux-actions-magic'
import tempActions from './temp'
import tempAsyncListActions from './temp-async-list'
import soccerlcAsyncFacilitiesActions from './soccerlc-async-list'

import fetchExample from './fetch-example'

const { types, actions } = combineActions([ tempActions, tempAsyncListActions, soccerlcAsyncFacilitiesActions, fetchExample ])

export { types, actions as default }
