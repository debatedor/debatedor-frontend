import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Feed from "./pages/feed/Feed.js";
import Login from "./pages/login/Login.js";
import Registration from "./pages/registration/Registration.js";
import MaximizedPostWrapper from "./pages/maximized-post/MaximizedPostWrapper.js";


function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Header />
        </header>
        <div className="App-body">
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element = {<Registration/>}></Route>
            <Route path="/post/:id" element={<MaximizedPostWrapper />} />
          </Routes>
        </div>
        <footer>
        </footer>
      </div>
    </Router>
  );
}

export default App;
