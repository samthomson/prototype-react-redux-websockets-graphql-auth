import React from 'react';
import { createClient } from 'graphql-ws'
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';

function App() {

  const client = createClient({
    url: 'ws://127.0.0.1:3501/wsgraphql',
  })

  const ping = async () => {
    const result = await new Promise((resolve, reject) => {
      // @ts-ignore
      let result;
      client.subscribe(
        {
          query: '{ ping }',
        },
        {
          next: (data) => (result = data),
          error: reject,
          // @ts-ignore
          complete: () => resolve(result),
        },
      );
    })
    console.log('result', result)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <button onClick={() => ping()}>ping</button>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
    </div>
  );
}

export default App;
