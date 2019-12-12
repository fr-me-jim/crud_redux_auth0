import {
    ADD_BOOK,
    ADD_BOOK_SUCCESS,
    ADD_BOOK_FAIL,
    DOWNLOAD_BOOKS,
    DOWNLOAD_BOOKS_SUCCESS,
    DOWNLOAD_BOOKS_FAIL,
    GET_DELETE_BOOK,
    DELETE_BOOK_SUCCESS,
    DELETE_BOOK_FAIL,
    GET_EDIT_BOOK,
    GET_BOOK_SUCCESS,
    GET_BOOK_FAIL,
    EDIT_BOOK,
    EDIT_BOOK_SUCCESS,
    EDIT_BOOK_FAIL
} from '../types';

//reducer's state
const initialState = {
    books: [],
    error: null,
    loading: false,
    book: {}
}
    
export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_BOOK:
            return {
                ...state,
                error: null
            }
        
        case ADD_BOOK_SUCCESS:
            return {
                ...state,
                error: null,
                books: [...state.books, action.payload]
            }

        case ADD_BOOK_FAIL:
            return {
                ...state,
                error: true
            }

        case DOWNLOAD_BOOKS:
            return {
                ...state,
                loading: true,
                book: {}
            }

        case DOWNLOAD_BOOKS_SUCCESS:
            return {
                ...state,
                books: action.payload,
                loading: false,
                error: null,
                book: {}
            }

        case DOWNLOAD_BOOKS_FAIL:
            return {
                ...state,
                books: [],
                error: true,
                loading: false,
                book: {}
            }

        case GET_DELETE_BOOK:
            return {
                ...state,
                error: null
            }

        case DELETE_BOOK_SUCCESS:
            return {
                ...state,
                error: null,
                books: state.books.filter( book => book.id !== action.payload )
            }

        case DELETE_BOOK_FAIL:
            return {
                ...state,
                error: true
            }

        case GET_EDIT_BOOK:
            return {
                ...state,
                error: null
            }

        case GET_BOOK_SUCCESS:
            return {
                ...state,
                error: null,
                book: action.payload
            }

        case GET_BOOK_FAIL:
            return {
                ...state,
                error: true
            }

        case EDIT_BOOK:
            return {
                ...state,
                error: null
            }

        case EDIT_BOOK_SUCCESS:
            return {
                ...state,
                error: null,
                books: state.books.map( book => book.id === action.payload.id ? 
                    book = action.payload : book)
            }

        case EDIT_BOOK_FAIL:
            return {
                ...state,
                error: true
            }

        default:
            return state;
    }
};