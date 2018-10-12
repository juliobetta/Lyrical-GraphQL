import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class LyricCreate extends Component {
  constructor(props) {
    super(props)

    this.state = { content: '' };
  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <label>Add a Lyric</label>
        <input
          value={this.state.content}
          onChange={event => this.setState({ content: event.target.value })}
        />
      </form>
    )
  }

  onSubmit(event) {
    event.preventDefault();

    this.setState({ content: '' });

    return this.props.mutate({
      variables: {
        content: this.state.content,
        songId: this.props.songId
      }
    });
  }
}

const mutate = gql`
  mutation AddLyric($songId: ID!, $content: String) {
    addLyricToSong(songId: $songId, content: $content) {
      id
      lyrics {
        id
        content
        likes
      }
    }
  }
`;

export default graphql(mutate)(LyricCreate);
