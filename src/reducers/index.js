import { combineReducers } from 'redux';

//reducers
import booksReducer from './booksReducer'
import validationReducer from './validationReducer'

export default combineReducers ({
    books: booksReducer,
    error: validationReducer
});