import { createFetchAction } from '../lib/fetch-actions'
import * as provider from '../providers/temp'

const types = {
  FETCH_USER: 'FETCH_USER',
}

const actions = {
  fetchUser: createFetchAction(types.FETCH_USER, { cache: '5m' }, (state, params) => {
    return provider.getSingle().then(res => res.data.results)
  }),
}

export default { types, actions }
