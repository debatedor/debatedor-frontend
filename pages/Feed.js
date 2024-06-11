import Axios from "axios";
import React, { useState } from 'react';
import Header from "./components/Header";
import Post from "./components/Post";
import './App.css'

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Header/>
            </header>
            <body>
                <Post/>
            </body>
            <footer>

            </footer>
        </div>
    );
}

export default App;