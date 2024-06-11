import Axios from "axios";
import React, { useState } from 'react';
import Header from "./components/Header.js";
import Post from "./components/Post.js";
import './App.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header/>
      </header>
      <article>
        <Post/>
      </article>
      <footer>

      </footer>
    </div>
  );
}

export default App;
