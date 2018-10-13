import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import './style/style.css';

import Layout from './components/Layout';
import SongList from './components/SongList';
import SongCreate from './components/SongCreate';
import SongDetail from './components/SongDetail';


const client = new ApolloClient({
  /**
   * @see https://dev.apollodata.com/react/cache-updates.html
  */
  dataIdFromObject: o => o.id,

  link: new HttpLink({ uri: '/graphql' }),
  cache: new InMemoryCache()
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Layout exact path="/" component={SongList} />
          <Layout exact path="/songs/new" component={SongCreate} />
          <Layout exact path="/songs/:id" component={SongDetail} />
        </Switch>
      </Router>
    </ApolloProvider>
  )
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
