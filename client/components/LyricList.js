import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class LyricList extends Component {
  render() {
    return (
      <ul className="collection">
        {this.props.lyrics.map(({ id, content, likes }) =>
          <li key={id} className="collection-item">
            {content}

            <div className="vote-box">
              <i
                className="material-icons"
                onClick={this.onLike({ id, likes })}
              >
                thumb_up
              </i>
              {likes}
            </div>
          </li>
        )}
      </ul>
    )
  }

  onLike = ({ id, likes }) => () => (
    this.props.mutate({
      variables: { id },
      optimisticResponse: {
        __typename: 'Mutation',
        likeLyric: {
          id,
          __typename: 'LyricType',
          likes: likes + 1
        }
      }
    })
  );
}

const mutation = gql`
  mutation LikeLyric($id: ID!) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`;

export default graphql(mutation)(LyricList);
