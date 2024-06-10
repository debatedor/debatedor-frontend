import './App.css';
import Header from './components/Header';
//import FormularioLogin from './components/FormularioLogin';
import FormularioRegistro from './components/FormularioRegistro'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
        <Header/>
        </div>
      </header>
      <body id = "App-body">
        <FormularioRegistro></FormularioRegistro>
      </body>
      <footer>

      </footer>
    </div>
  );
}

export default App;
