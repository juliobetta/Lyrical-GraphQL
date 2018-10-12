import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import query from '../queries/fetchSong';

class SongDetail extends Component {
  render() {
    const { data } = this.props;

    if(data.loading) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <Link to="/">Back</Link>
        <h3>{data.song.title}</h3>
      </div>
    )
  }
}

export default graphql(query, {
  options: ({ params: { id } }) => ({ variables: { id } })
})(SongDetail);
