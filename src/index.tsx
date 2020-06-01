import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import { resolvers, typeDefs } from './store/resolvers';

import config from './store/config'
import App from './App';
import * as serviceWorker from './serviceWorker';

import './index.css';

const cache = new InMemoryCache();
const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: config.baseApiUrl,
    headers: {
      // authorization: localStorage.getItem('token'),
      'client-name': 'Magic Mooc Admin[web]',
      'client-version': '1.0.0',
    },
  }),
  resolvers,
  typeDefs,
});

ReactDOM.render(
  // <React.StrictMode>
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  // </React.StrictMode>
  , document.getElementById('root')
);

serviceWorker.unregister();
