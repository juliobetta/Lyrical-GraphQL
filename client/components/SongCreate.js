import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import query from '../queries/fetchSongs';

class SongCreate extends Component {
  state = {
    title: ''
  };

  render() {
    return (
      <div>
        <Link to="/">Back</Link>
        <h3>Create a new Song</h3>
        <form onSubmit={this.onSubmit}>
          <label>Song title:</label>
          <input
            value={this.state.title}
            onChange={this.onChangeTitle}
          />
        </form>
      </div>
    )
  }

  onChangeTitle = event => this.setState({ title: event.target.value });

  onSubmit = event => {
    event.preventDefault();

    return this.props.mutate({
      variables: { title: this.state.title },
      refetchQueries: [{ query }]
    }).then(() => this.props.history.push('/'));
  }
}

const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      id
      title
    }
  }
`;

export default graphql(mutation)(SongCreate);
