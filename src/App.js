import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import FormularioLogin from './pages/FormularioLogin.js';
import FormularioRegistro from './pages/FormularioRegistro';
import DetailPostWrapper from './components/DetailPostWrapper';
import Feed from "./components/Feed.js";

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
            <Route path="/login" element={<FormularioLogin />} />
            <Route path="/register" element = {<FormularioRegistro/>}></Route>
            <Route path="/post/:id" element={<DetailPostWrapper />} />
          </Routes>
        </div>
        <footer>
        </footer>
      </div>
    </Router>
  );
}

export default App;
