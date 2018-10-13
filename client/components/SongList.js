import React, { Component } from 'react';
import { compose } from 'lodash/fp';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';
import { fetchSongs, deleteSong } from '../graphql/song';

class SongList extends Component {
  render() {
    return (
      <Query query={fetchSongs}>
        {({ loading, data }) => {
          if (loading) {
            return <div>Loading...</div>
          }

          return (
            <div>
              {this.renderSongs(data.songs)}

              <Link to="/songs/new" className="btn-floating btn-large red right">
                <i className="material-icons">add</i>
              </Link>
            </div>
          );
        }}
      </Query>
    );
  }

  renderSongs(songs) {
    return (
      <ul className="collection">
        {songs.map(({ title, id }) =>
          <Mutation key={id} mutation={deleteSong} update={this.onDeleteSong(id)}>
            {deleteSong => (
              <li className="collection-item">
                <Link to={`/songs/${id}`}>{title}</Link>
                <i
                  className="material-icons"
                  onClick={() => deleteSong({ variables: { id } })}
                >
                  delete
                </i>
              </li>
            )}
          </Mutation>
        )}
      </ul>
    );
  }

  onDeleteSong = songId => (cache, { data: { deleteSong } }) => {
    const { songs } = cache.readQuery({ query: fetchSongs });

    return cache.writeQuery({
      query: fetchSongs,
      data: { songs: songs.filter(({ id }) => id !== songId) }
    })
  }
}

export default SongList;