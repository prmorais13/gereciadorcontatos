import React, { Component } from 'react';

class Teste extends Component {
  state = {
    title: '',
    userId: '',
    id: ''
  };

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(data =>
        this.setState({
          title: data.title,
          userId: data.userId,
          id: data.id
        })
      );
  }

  render() {
    const { title, userId, id } = this.state;
    return (
      <div>
        <h1>{title}</h1>
        <p>
          {userId} - {id}
        </p>
      </div>
    );
  }
}

export default Teste;
