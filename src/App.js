import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Formulario from './components/Formulario';
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
            <Route path="/comment/:id" element={<CommentDetailPage />} />
          </Routes>
        </div>
        <footer>
        </footer>
      </div>
    </Router>
  );
}

export default App;
