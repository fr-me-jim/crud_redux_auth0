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

import axiosClient from '../config/axios';
import Swal from 'sweetalert2';


//Main Function - add new book
export function addNewBookAction (book) {
    return (dispatch) => {
        dispatch( newBook() );

        //insert into api
        axiosClient.post('/books', book)
            .then( response => {
                if ( response.status === 201 ) {
                    //if all good -> insert it
                    dispatch( newBookSuccess(book) );
                }
            })
            .catch( error => {
                const { status } = error.response;
                if ( status === 404 || status === 403 || status === 400 ) {
                    //report error
                    dispatch( newBookFail() );
                }
            });

    }
}

export const newBook = () => ({
    type: ADD_BOOK
});

export const newBookSuccess = book => ({
    type: ADD_BOOK_SUCCESS,
    payload: book
});

export const newBookFail = () => ({
    type: ADD_BOOK_FAIL
});

// get books via API -- main function
export function getBooksAction() {
    return dispatch => {
        dispatch( getBooksStart() );

        //queryAPI
        axiosClient.get('/books')
            .then( response => {
                setTimeout(() => {
                    dispatch( downloadSuccess(response.data) );
                }, 1000);
                
            } )
            .catch( error => {
                dispatch( downloadFail() );
            } );
    }
}

export const getBooksStart = () => ({
    type: DOWNLOAD_BOOKS
});

export const downloadSuccess = books => ({
    type: DOWNLOAD_BOOKS_SUCCESS,
    payload: books
});

export const downloadFail = () => ({
    type: DOWNLOAD_BOOKS_FAIL
});

// delete book -- main function
export function deleteBookAction( id ) {  
    return dispatch => {
        dispatch( getDeleteBook() );

        // delete from API
        axiosClient.delete(`/books/${id}`)
            .then( response => {
                if( response.status === 200 )
                    dispatch( deleteSuccess(id) );
            } )
            .catch( error => {
                dispatch( deleteFail() );
            } );
    }
}

export const getDeleteBook = () => ({
    type: GET_DELETE_BOOK
});

export const deleteSuccess = id => ({
    type: DELETE_BOOK_SUCCESS,
    payload: id
}); 

export const deleteFail = () => ({
    type: DELETE_BOOK_FAIL
});

// get edit book -- main function
export function getEditBookAction( id ) {  
    return dispatch => {
        dispatch( getEditBook() );

        //get book from API
        axiosClient.get(`/books/${id}`)
            .then( response => {
                if( response.status === 200 )
                    dispatch( getEditSuccess(response.data) );
            } )
            .catch( error => {
                dispatch( getEditFail() );
            } );
    }
}

export const getEditBook = () => ({
    type: GET_EDIT_BOOK
});

export const getEditSuccess = book => ({
    type: GET_BOOK_SUCCESS,
    payload: book
});

export const getEditFail = () => ({
    type: GET_BOOK_FAIL
});

// edit book -- main function
export function editBookAction( book ) {
    return dispatch => {
        dispatch( editBook() );

        //query API
        axiosClient.put(`/books/${book.id}`, book)
            .then( response => {
                if( response.status === 200 ) {
                    
                    dispatch( editBookSuccess(book) );
                    
                    Swal.fire(
                        'Saved changes!',
                        'The book has been updated succesfully.',
                        'success'
                    );
                }
            } )
            .catch( error => {
                console.log(error);
                dispatch( editBookFail() );
            } );
    }
}

export const editBook = () => ({
    type: EDIT_BOOK
});

export const editBookSuccess = book => ({
    type: EDIT_BOOK_SUCCESS,
    payload: book
});

export const editBookFail = () => ({
    type: EDIT_BOOK_FAIL
});


