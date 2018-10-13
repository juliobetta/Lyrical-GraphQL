import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { addLyricToSong } from '../graphql/song';

class LyricCreate extends Component {
  state = { content: '' };

  render() {
    return (
      <Mutation mutation={addLyricToSong}>
        {addLyricToSong => (
          <form onSubmit={this.onSubmit(addLyricToSong)}>
            <label>Add a Lyric</label>
            <input
              value={this.state.content}
              onChange={event => this.setState({ content: event.target.value })}
            />
          </form>
        )}
      </Mutation>
    )
  }

  onSubmit = addLyricToSong => event => {
    event.preventDefault();

    this.setState({ content: '' });

    return addLyricToSong({
      variables: {
        content: this.state.content,
        songId: this.props.songId
      }
    });
  }
}

export default LyricCreate;
