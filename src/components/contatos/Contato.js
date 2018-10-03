import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { Consumer } from '../../context';

class Contato extends Component {
  state = {
    mostraInfoContato: false
  };

  onDeleteClick = async (id, dispatch) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      dispatch({
        type: 'DELETE_CONTATO',
        payload: id
      });
    } catch (e) {
      dispatch({
        type: 'DELETE_CONTATO',
        payload: id
      });
    }
  };

  render() {
    const { id, name, email, fone } = this.props.contato;
    const { mostraInfoContato } = this.state;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-c">
              <h4>
                {name}{' '}
                <i
                  onClick={() =>
                    this.setState({
                      mostraInfoContato: !this.state.mostraInfoContato
                    })
                  }
                  className="fas fa-sort-down"
                  style={{ cursor: 'pointer' }}
                />
                <i
                  className="fas fa-times"
                  style={{ cursor: 'pointer', float: 'right', color: 'red' }}
                  onClick={this.onDeleteClick.bind(this, id, dispatch)}
                />
                <Link to={`contato/editar/${id}`}>
                  <i
                    className="fas fa-pencil-alt"
                    style={{
                      cursor: 'pointer',
                      float: 'right',
                      color: 'black',
                      marginRight: '1rem'
                    }}
                  />
                </Link>
              </h4>
              {mostraInfoContato ? (
                <ul className="list-group">
                  <li className="list-group-item">Email: {email}</li>
                  <li className="list-group-item">Fone: {fone}</li>
                </ul>
              ) : null}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

Contato.propTypes = {
  contato: PropTypes.object.isRequired
};

export default Contato;
