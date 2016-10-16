import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'
import parseDuration from 'parse-duration'

// yikes, global state..
var fetchState = {}

const singleFetchReducer = combineReducers({
  isLoading: handleActions({
    START: () => true,
    SUCCESS: () => false,
    FAIL: () => false,
  }, false),
  error: handleActions({
    FAIL: (state, { payload }) => ({
      timestamp: Date.now(),
      message: payload.err && payload.err.toString(),
    }),
  }, null),
  cache: handleActions({
    SUCCESS: (state, { payload }) => ({ data: payload.data, lastUpdated: payload.timestamp }),
  }, { data: null, lastUpdated: null }),
})

const fetchStateReducer = (state, action) => {
  const payload = action.payload
  const key = payload.key

  if (key) {
    // update individual fetch
    state[key] = singleFetchReducer(state[key], action)
    return state
  } else {
    return state
  }
}

// we use a hash key so that way we identify requests uniquely per action
// that means we cache the getUser(x) result not just getUser
// this also allows us to run multiple getUser but only one getUser(x) at once
const calcKey = (actionName, params = {}) => {
  // this is sad, do more fancy things in the future
  return `${actionName}###${params.toString()}`
}

const getFetchState = (key) => {
  fetchState = fetchStateReducer(fetchState, { type: 'GET', payload: { key } })
  return fetchState[key]
}

const updateFetchState = (key, action, payload) => {
  // using reducers without a store.. :O
  fetchState = fetchStateReducer(fetchState, { type: action, payload: { key, ...payload } })
  return fetchState[key]
}

// USAGE:
// actions.getUsers = createFetchAction('GET_USERS', { cache: '2h' }, (state, params) => {
//   return api.getUsers(state, params.page)
// })
// or just: actions.getUsers = createFetchAction('GET_USERS', { cache: '2h' }, api.getUsers)
// or just: actions.getUsers = createFetchAction('GET_USERS', api.getUsers)
export const createFetchAction = (actionName, actionOptions, fetchData) => {
  // action level things?
  const expiry = actionOptions.cache && parseDuration(actionOptions.cache) || 0
  const createAction = (data, timestamp) => ({
    type: actionName,
    payload: { data, timestamp },
  })

  // action invocation level
  // example: actions.myAction({ params: { id: 2 }, force: false }, (actionState) => { console.log('action status:', actionState.status) })
  return (query = {}, stateChangeCallback = () => {}) => {
    // QUERY + FETCH STATE LEVEL LOGIC

    const fetchKey = calcKey(actionName, query.params)
    const updateState = (action, data) => {
      const newState = updateFetchState(fetchKey, action, data)
      stateChangeCallback(newState)
    }

    // retrieve the state from the global fetchState
    const { cache, isLoading } = getFetchState(fetchKey)

    // check if there's a fetch out for this data
    // we check for this first so that way we don't return cached data if fresh data is coming
    if (isLoading) {
      // do nothing I guess?
      // the in progress fetch is going to dispatch the action, right!?
    } else {
      // we need to get the data ourselves and dispatch the action
      // if good data exists AND is fresh enough, grab it
      if (!query.force && cache.data && (cache.updatedAt + expiry) > Date.now()) {
        return createAction(cache.data, cache.updatedAt)
      } else {
        // we need to fetch fresh data
        return (dispatch, getState) => {
          // this puts it in isLoading: true
          updateState('START')

          // relies on user to pass in a func that returns a promise .. yikes
          // could be a db query, ajax call, whatever returns a data promise
          fetchData(getState(), query.params)
            .then(data => {
              const timestamp = Date.now()
              updateState('SUCCESS', { data, timestamp })
              dispatch(createAction(data, timestamp))
            })
            .catch(err => {
              // decide what to do next..
              // ..retry? how often? should it wait between retries? give up eventually?
              // only retry on certain errors? like 5xx or internet connection errs but not 4xx?
              updateState('FAIL', {err})

              // for now just dispatch errror
              const action = createAction(err)
              action.error = true
              dispatch(action)
            })
        }
      }
    }
  }
}
