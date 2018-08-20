/* global window */
/* eslint-disable no-underscore-dangle */
import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux'
import ReduxThunk from 'redux-thunk'
import reducer from './reducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// ReduxThunk allows us to dispatch state in a specific order if necessary.
export default createStore(
  reducer,
  composeEnhancers(applyMiddleware(ReduxThunk))
)
