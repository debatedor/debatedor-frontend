import './App.css';
import Header from './components/Header';
import Formulario from './components/Formulario';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
        <Header/>
        </div>
      </header>
      <body id = "App-body">
        <Formulario/>
      </body>
      <footer>

      </footer>
    </div>
  );
}

export default App;
