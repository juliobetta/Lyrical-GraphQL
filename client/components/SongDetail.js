import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import LyricCreate from './LyricCreate';
import LyricList from './LyricList';
import query from '../queries/fetchSong';


class SongDetail extends Component {
  render() {
    const { data: { song = null }, data } = this.props;

    if(data.loading) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <Link to="/">Back</Link>
        <h3>{song.title}</h3>
        <LyricList lyrics={song.lyrics} />
        <LyricCreate songId={song.id}/>
      </div>
    )
  }
}

export default graphql(query, {
  options: ({ params: { id } }) => ({ variables: { id } })
})(SongDetail);
