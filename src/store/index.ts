import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import reducer from './reducer'
import { Course } from '../datatypes'
import {fetchCourse} from './actions'

const store = createStore(reducer, applyMiddleware(thunkMiddleware))

// store.dispatch(fetchCourse());

export default store