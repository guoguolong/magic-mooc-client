import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import './index.css';
import CourseEdit from './components/admin/CourseEdit';
import CourseList from './components/admin/CourseList';
// import Signup from './components/admin/SignupForm';
// import Signup from './components/admin/StyledSignupForm';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  // <React.StrictMode>
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
  // </React.StrictMode>
  , document.getElementById('root')
);

serviceWorker.unregister();