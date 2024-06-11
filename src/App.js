import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import FormularioLogin from './pages/FormularioLogin.js';
import FormularioRegistro from './pages/FormularioRegistro';
import DetailPostWrapper from './components/DetailPostWrapper';
import CommentDetailPage from './components/Comment';
import Usuario from "./pages/Usuario.js"
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
            <Route path="/form" element={<FormularioLogin />} />
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
/*<Routes>
  <Route path="/" element={<FormularioLogin />} />
  <Route path="/Registro" element={<FormularioRegistro />} />
  <Route path="/post/:id" element={<DetailPostWrapper />} />
  <Route path="/comment/:id" element={<CommentDetailPage />} />
  <Route path="/usuario" element={<Usuario />} />
</Routes>*/