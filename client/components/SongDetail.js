import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import LyricCreate from './LyricCreate';
import LyricList from './LyricList';
import { fetchSong } from '../graphql/song';


class SongDetail extends Component {
  render() {
    return (
      <Query query={fetchSong} variables={{ id: this.props.match.params.id }}>
        {({ loading, data: { song = null } }) => {
          if (loading) {
            return <div>Loading...</div>
          }

          return (
            <div>
              <Link to="/">Back</Link>
              <h3>{song.title}</h3>
              <LyricList lyrics={song.lyrics} />
              <LyricCreate songId={song.id} />
            </div>
          );
        }}
      </Query>
    )
  }
}

export default SongDetail;
