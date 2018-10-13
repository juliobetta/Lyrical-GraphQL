import gql from 'graphql-tag';

// #################################################################################################
// MUTATIONS #######################################################################################
// #################################################################################################

export const addSong = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      id
      title
    }
  }
`;

export const deleteSong = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

export const addLyricToSong = gql`
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

export const likeLyric = gql`
  mutation LikeLyric($id: ID!) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`;


// #################################################################################################
// QUERIES #########################################################################################
// #################################################################################################

export const fetchSong = gql`
  query GetSong($id: ID!) {
    song(id: $id) {
      id
      title
      lyrics {
        id
        content
        likes
      }
    }
  }
`;

export const fetchSongs = gql`
  {
    songs {
      id
      title
    }
  }
`;
