import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './redux/store'
import './css/index.css'
import AppContainer from './Container/AppContainer'
import registerServiceWorker from './registerServiceWorker'

/** Redux DevTools cannot serialize ES6 maps, I have this here just for debug
 * purposes.
 */
Map.prototype.toJSON = function() {
  return JSON.parse(JSON.stringify([...this]))
}

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
