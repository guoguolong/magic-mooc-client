import React from 'react'
import { Provider} from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import store from './store/index';

import Header from './components/Header'
import Course from './components/Course'
import Catalog from './components/Catalog'
import NotFound from './components/NotFound'

export default function App() {
    return (
        <Provider store={store}>
            <Router>
                <div>
                    <Header></Header>
                    <Switch>
                        <Route path="/course/:courseId/:articleId?">
                            <Course />
                        </Route>
                        <Route path="/courses">
                            <Redirect to="/"/>
                        </Route>
                        <Route exact path="/index.html">
                            <Redirect to="/"/>
                        </Route>
                        <Route exact path="/">
                            <Catalog />
                        </Route>
                        <Route path="*">
                            <NotFound />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </Provider>
    )
}