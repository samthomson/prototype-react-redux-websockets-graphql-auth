import React from 'react'
import * as ReactRedux from 'react-redux'
import './App.css'

import * as Actions from 'src/redux/actions'
import * as Selectors from 'src/redux/selectors'

function App() {

  const isServerConnected = ReactRedux.useSelector(Selectors.isServerConnected)

  const dispatch = ReactRedux.useDispatch()

  const connect = () => dispatch(Actions.sendWSConnectionRequest())
  const disconnect = () => dispatch(Actions.sendWSDisconnect())

  const ping = () => dispatch(Actions.ping())


  if (!isServerConnected) {
    return (
      <div className="App">
      <button onClick={connect}>connect</button>
        <button onClick={ping}>ping</button>
      </div>
    )
  }

  return (
    <div className="App">
      <p>this is an authed section of the app</p>
      <button onClick={disconnect}>disconnect</button>
    </div>
  )
}

export default App
