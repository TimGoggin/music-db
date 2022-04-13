import logo from './logo.svg';
import './App.css';

import React from 'react';
import Song_lookup from './components/song_lookup';
import Dubstep from './components/dubstep';
import Epic from './components/Epic';
import Sunny from './components/Sunny';

function App() {
  return (
    <div className="App">
      <Song_lookup />
      < Dubstep />
      <Epic />
      <Sunny/>
    </div>
  );

}



export default App;
