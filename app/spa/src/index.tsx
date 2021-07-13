import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import { applyMiddleware, createStore, Store as ReduxStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import { Store } from 'src/redux/store'
import { appReducers } from 'src/redux/reducers'
import socketMiddleware from 'src/redux/socket-middleware'

const store: ReduxStore<Store> = createStore(
	appReducers,
	composeWithDevTools(applyMiddleware(socketMiddleware)),
)


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)