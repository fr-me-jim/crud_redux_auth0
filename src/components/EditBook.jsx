import React, { useEffect, useRef } from 'react';

//actions
import { useDispatch, useSelector } from 'react-redux';
import { getEditBookAction, editBookAction } from '../actions/booksActions';
import { validateFormAction, validationError, validationSuccess } from '../actions/validationActions';

const EditBook = ({ history, match }) => {

    // refs
    const nameRef = useRef('');
    const priceRef = useRef('');

    //dispatch
    const dispatch = useDispatch();
    const editBook = book => dispatch( editBookAction(book) );

    const validateForm = () => dispatch( validateFormAction() );
    const successForm = () => dispatch( validationSuccess() );
    const errorForm = () => dispatch( validationError() );

    //id
    const { id } = match.params;

    useEffect(() => {
        dispatch( getEditBookAction(id) );
        
    }, [ dispatch, id ]);

    //get state
    const book = useSelector( state => state.books.book );
    const { error } = useSelector( state => state.books );
    const errForm = useSelector( state => state.error.error );


    //when loading
    if(!book) return 'Loading..';

    //on submit, set changes
    const handleSubmit = e => {
        e.preventDefault();

        const name = nameRef.current.value;
        const price = priceRef.current.value;

        // validate form 
        validateForm()
        if ( name.trim() === '' || price.trim() === '' ) {
            errorForm();
            return;
        }

        // if all good:
        successForm();

        // save changes
        editBook({
            id,
            name,
            price
        });

        // redirect
        history.push('/');
    }

    return (  
        <div className="row justify-content-center mt-5">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center text-primary">Edit Book</h2>

                        { errForm ? 
                            <div className="alert alert-danger text-center mt-4">
                                All fields are mandatory!
                            </div> 
                            : null 
                        }

                        { error ? 
                            <div className="alert alert-danger font-weight-bold text-center mt-4">
                                Something went wrong!
                            </div>
                            : null
                        }

                        <form
                            onSubmit={handleSubmit}
                        >
                            <div className="form-group">
                                <label>Title</label>
                                <input 
                                    type="text" 
                                    className="form-control text-dark" 
                                    placeholder="Title"
                                    defaultValue={book.name}
                                    ref={nameRef}
                                />
                            </div>
                            <div className="form-group">
                                <label>Book's Price</label>
                                <input 
                                    type="text" 
                                    className="form-control text-dark" 
                                    placeholder="Price" 
                                    defaultValue={book.price}
                                    ref={priceRef}
                                />
                            </div>

                            <button 
                                type="submit" 
                                className="btn btn-success font-weight-bold text-uppercase d-block w-100"
                            
                            >Save Changes</button>
                        </form>
 
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default EditBook;