import React, { Component } from 'react';
// import uuid from 'uuid';
import axios from 'axios';

import { Consumer } from '../../context';

import TextInputGroup from '../layout/TextInputGroup';

class AdicionarContato extends Component {
  state = {
    name: '',
    email: '',
    fone: '',
    errors: {}
  };

  onChange = e =>
    this.setState({
      [e.target.name]: e.target.value
    });

  onSubmit = async (dispatch, e) => {
    e.preventDefault();

    const { name, email, fone } = this.state;

    // Checa se tem erros
    if (name === '') {
      this.setState({ errors: { name: 'O Nome é obrigatório.' } });
      return;
    }

    if (email === '') {
      this.setState({ errors: { email: 'O E-mail é obrigatório.' } });
      return;
    }

    if (fone === '') {
      this.setState({ errors: { fone: 'O Nome é obrigatório.' } });
      return;
    }

    const novoContato = {
      //id: uuid(),
      name,
      email,
      fone
    };

    const res = await axios.post(
      'https://jsonplaceholder.typicode.com/users',
      novoContato
    );
    dispatch({
      type: 'ADICIONAR_CONTATO',
      payload: res.data
    });

    // Limpa o estado do formulário
    this.setState({
      name: '',
      email: '',
      fone: '',
      errors: {}
    });

    this.props.history.push('/');
  };

  render() {
    const { name, email, fone, errors } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Adicionar Contato</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    label="Nome"
                    name="name"
                    placeholder="Entre com o nome"
                    value={name}
                    onChange={this.onChange}
                    error={errors.name}
                  />
                  <TextInputGroup
                    label="E-mail"
                    name="email"
                    type="email"
                    placeholder="Entre com o e-mail"
                    value={email}
                    onChange={this.onChange}
                    error={errors.email}
                  />
                  <TextInputGroup
                    label="Fone"
                    name="fone"
                    placeholder="Entre com o fone"
                    value={fone}
                    onChange={this.onChange}
                    error={errors.fone}
                  />

                  <input
                    type="submit"
                    className="btn btn-light btn-block"
                    value="Adicionar Contato"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default AdicionarContato;
