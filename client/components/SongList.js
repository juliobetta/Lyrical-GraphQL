import React, { Component } from 'react';
import { compose } from 'lodash/fp';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
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
        {this.props.data.songs.map(({ title, id }) =>
          <li key={id} className="collection-item">
            <Link to={`/songs/${id}`}>{title}</Link>
            <i
              className="material-icons"
              onClick={this.onSongDelete(id)}
            >
              delete
            </i>
          </li>
        )}
      </ul>
    );
  }

  onSongDelete = id => () => (
    this.props.mutate({ variables: { id } })
      .then(() => this.props.data.refetch())
  );
}

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

export default compose(
  graphql(mutation),
  graphql(query)
)(SongList);