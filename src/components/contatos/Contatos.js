import React, { Component } from "react";

import { Consumer } from "../../context";

import Contato from "./Contato";

class Contatos extends Component {
  render() {
    return (
      <Consumer>
        {value => {
          const { contatos } = value;
          return (
            <React.Fragment>
              <h1 className="display-4 mb-2">
                <span className="text-primary">Lista de </span>
                Contatos
              </h1>
              {contatos.map(contato => (
                <Contato key={contato.id} contato={contato} />
              ))}
            </React.Fragment>
          );
        }}
      </Consumer>
    );
  }
}

export default Contatos;
