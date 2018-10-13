import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';
import { addSong, fetchSongs } from '../graphql/song';

class SongCreate extends Component {
  state = {
    title: ''
  };

  render() {
    return (
      <div>
        <Link to="/">Back</Link>
        <h3>Create a new Song</h3>
        <Mutation mutation={addSong} update={this.onAddSong}>
          {addSong => (
            <form onSubmit={this.onSubmit(addSong)}>
              <label>Song title:</label>
              <input
                value={this.state.title}
                onChange={this.onChangeTitle}
              />
            </form>
          )}
        </Mutation>
      </div>
    )
  }

  onChangeTitle = event => this.setState({ title: event.target.value });

  onSubmit = addSong => event => {
    event.preventDefault();

    return addSong({ variables: { title: this.state.title } });
  }

  onAddSong = (cache, { data: { addSong: newSong } }) => {
    const { songs } = cache.readQuery({ query: fetchSongs });

    cache.writeQuery({
      query: fetchSongs,
      data: { songs: [...songs, newSong ]}
    });

    return this.props.history.push('/');
  }
}

export default SongCreate;
