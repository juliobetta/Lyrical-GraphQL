import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { likeLyric } from '../graphql/song';

class LyricList extends Component {
  render() {
    return (
      <ul className="collection">
        {this.props.lyrics.map(({ id, content, likes }) =>
          <Mutation key={id} mutation={likeLyric}>
            {likeLyric => (
              <li className="collection-item">
                {content}

                <div className="vote-box">
                  <i
                    className="material-icons"
                    onClick={this.onClickLike(likeLyric, { id, likes })}
                  >
                    thumb_up
                  </i>
                  {likes}
                </div>
              </li>
            )}
          </Mutation>
        )}
      </ul>
    )
  }

  onClickLike = (likeLyric, { id, likes }) => () => (
    likeLyric({
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
  )
}

export default LyricList;
