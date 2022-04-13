import logo from './logo.svg';
import './App.css';

import React from 'react';
import Song_lookup from './components/song_lookup';
import Play from './components/play.js';

function App() {
  return (
    <div className="App">
      <Song_lookup />
      < Play />
    </div>
  );

}



export default App;
