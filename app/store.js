import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise'
import createLogger from 'redux-logger'

const logger = createLogger({
  stateTransformer: s => s.toJS(),
  duration: true,
  diff: true,
})

const middleware = [thunk, promise, logger]

export default applyMiddleware(...middleware)(createStore)
