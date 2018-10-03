import React, { Component } from 'react';
import axios from 'axios';

import { Consumer } from '../../context';

import TextInputGroup from '../layout/TextInputGroup';

class EditarContato extends Component {
  state = {
    name: '',
    email: '',
    fone: '',
    errors: {}
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );

    const contato = res.data;

    this.setState({
      name: contato.name,
      email: contato.email,
      fone: contato.fone
    });

    // const { name, email, fone } = res.data;

    // this.setState({
    //   name,
    //   email,
    //   fone
    // });
  }

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

    const editarContato = {
      name,
      email,
      fone
    };

    const { id } = this.props.match.params;

    const res = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      editarContato
    );
    dispatch({
      type: 'EDITAR_CONTATO',
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
              <div className="card-header">Editar Contato</div>
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
                    value="Atualizar Contato"
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

export default EditarContato;
