import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from "../react-auth0-spa";

const Header = () => {

    const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

    const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin
    });

    return (  
        <nav className="navbar navbar-expand-lg justify-content-between">
            <div className="container-fluid">
                <h1>
                    <Link to={'/'} className="text-light" >
                        CRUD -- React && Redux Hooks
                    </Link>
                </h1>

                <Link 
                    to={'/books/new'} 
                    className="btn btn-info new-post d-block d-md-inline-block" 
                >
                    &#43; Add Book 
                </Link>

                <button
                    className="btn btn-danger"
                    onClick={() => logoutWithRedirect()}
                >
                    Log Out
                </button>
            </div>
        </nav>
    );
}
 
export default Header;