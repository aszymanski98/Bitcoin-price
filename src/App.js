import React from 'react';
import logo from './logo.svg';
import './App.css';

import Crypto from './Components/Crypto';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Bitcoin price</h1>
      </header>
      <Crypto />
    </div>
  );
}

export default App;
