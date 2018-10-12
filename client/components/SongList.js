import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class SongList extends Component {
  render() {
    if (this.props.data.loading) {
      return <div>Loading...</div>
    }

    return this.renderSongs();
  }

  renderSongs() {
    return (
      <ul className="collection">
        {this.props.data.songs.map(song =>
          <li key={song.id} className="collection-item">
            {song.title}
          </li>
        )}
      </ul>
    );
  }
}

const query = gql`
  {
    songs {
      id
      title
    }
  }
`;

export default graphql(query)(SongList);