import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import query from '../queries/fetchSongs';

class SongList extends Component {
  render() {
    if (this.props.data.loading) {
      return <div>Loading...</div>
    }

    return (
      <div>
        {this.renderSongs()}

        <Link to="/songs/new" className="btn-floating btn-large red right">
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
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

export default graphql(query)(SongList);