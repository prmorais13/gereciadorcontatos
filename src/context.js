import React, { Component } from 'react';
import axios from 'axios';

const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'DELETE_CONTATO':
      return {
        ...state,
        contatos: state.contatos.filter(
          contato => contato.id !== action.payload
        )
      };

    case 'ADICIONAR_CONTATO':
      return {
        ...state,
        contatos: [action.payload, ...state.contatos]
      };

    case 'EDITAR_CONTATO':
      return {
        ...state,
        contatos: state.contatos.map(
          contato =>
            contato.id === action.payload.id
              ? (contato = action.payload)
              : contato
        )
      };

    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    contatos: [],
    //   {
    //     id: 1,
    //     nome: "Paulo Roberto",
    //     email: "prmorais1302@gmail.com",
    //     fone: "98701-5547"
    //   },
    //   {
    //     id: 2,
    //     nome: "Patricia Nunes",
    //     email: "srtapatricia@gmail.com",
    //     fone: "98736-1339"
    //   },
    //   {
    //     id: 3,
    //     nome: "Maria Fernanda",
    //     email: "nanda@gmail.com",
    //     fone: "98701-5547"
    //   }
    // ],
    dispatch: action => this.setState(state => reducer(state, action))
  };

  // componentDidMount() {
  //   axios.get('https://jsonplaceholder.typicode.com/users').then(res =>
  //     this.setState({
  //       contatos: res.data
  //     })
  //   );
  // }

  async componentDidMount() {
    const res = await axios.get('https://jsonplaceholder.typicode.com/users');
    this.setState({
      contatos: res.data
    });
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
