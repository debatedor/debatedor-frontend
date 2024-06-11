import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Formulario from './components/FormularioLogin.js';
import DetailPostWrapper from './components/DetailPostWrapper';
import CommentDetailPage from './components/Comment';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Header />
        </header>
        <div className="App-body">
          <Routes>
            <Route path="/" element={<Formulario />} />
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
