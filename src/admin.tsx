import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
// import { resolvers, typeDefs } from './resolvers';

import CourseEdit from './components/admin/CourseEdit';
import CourseList from './components/admin/CourseList';
import config from './store/config'
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
  // resolvers,
  // typeDefs,
});

ReactDOM.render(
  // <React.StrictMode>
  <ApolloProvider client={client}>
    <Router>
      <Switch>
        <Route path="/admin/course/:courseId(\d+)?">
          <CourseEdit />
        </Route>
        <Route path="/admin">
          <CourseList />
        </Route>
      </Switch>
    </Router>
  </ApolloProvider>    
  // </React.StrictMode>
  , document.getElementById('root')
);

serviceWorker.unregister();