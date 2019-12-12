import React from 'react';

import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import clsx from 'clsx';


//actions
import { useDispatch } from 'react-redux';
import { deleteBookAction } from '../actions/booksActions';
import { useAuth0 } from "../react-auth0-spa";

import {
    Button,
  } from "reactstrap";


const Book = ({book}) => {

    //dispatch
    const dispatch = useDispatch();

    const { isAuthenticated} = useAuth0();



    const handleClick = id => {

        //ask with sweetalert
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
                Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
                )

                dispatch( deleteBookAction(id) );
            }   
          })

    }

    return (  
        <tr align="center" >
            <td className="text-dark" >
                {book.name}
            </td>
            <td>
                <span className="font-weight-bold text-dark">$ {book.price}</span>
            </td>
            <td className="actions" >
                <Link 
                    to={`/books/edit/${book.id}`} 
                    className="mr-2"    
                >
                    <Button
                        color={clsx(isAuthenticated && "success", !isAuthenticated && "secondary" )} 
                        className="btn-margin"
                        disabled={!isAuthenticated}
                    >
                        &#9998; Edit
                    </Button>
                    
                    
                </Link>

                <Button
                    color={clsx(isAuthenticated && "danger", !isAuthenticated && "secondary" )} 
                    className="btn-margin"
                    disabled={!isAuthenticated}
                    onClick={ () => handleClick(book.id) }
                >
                    &times; Delete
                </Button>
{/* 
                <button 
                    className="btn btn-danger"
                    onClick={ () => handleClick(book.id) }
                >&times; Delete</button> */}
            </td>
        </tr>
    );
}
 
export default Book;