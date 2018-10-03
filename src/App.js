import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Provider } from './context';

import Header from './components/layout/Header';
import About from './components/paginas/About';
import NotFound from './components/paginas/NotFound';

import Contatos from './components/contatos/Contatos';
import AdicionarContato from './components/contatos/AdicionarContato';
import EditarContato from './components/contatos/EditarContato';

class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <div className="App">
            <Header marca="Gerenciamento de Contatos" />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Contatos} />
                <Route
                  exact
                  path="/contato/adicionar"
                  component={AdicionarContato}
                />
                <Route exact path="/about" component={About} />
                <Route
                  exact
                  path="/contato/editar/:id"
                  component={EditarContato}
                />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
