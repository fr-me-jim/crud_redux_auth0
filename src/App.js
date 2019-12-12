import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";

import Books from './components/Books';
import NewBook from './components/NewBook';
import EditBook from './components/EditBook';
import PrivateRoute from "./components/PrivateRoute";
import Loading from "./components/Loading";
import NavBar from "./components/NavBar";
import Profile from "./views/Profile";

// auth
import { useAuth0 } from "./react-auth0-spa";
import history from "./utils/history";

// styles
import "./App.css";

//redux
import { Provider } from 'react-redux'

//import store
import store from './store'

// fontawesome
import initFontAwesome from "./utils/initFontAwesome";
initFontAwesome();

const App = () => {
  const { loading } = useAuth0();

  if (loading) {
    return <Loading />;
  }

  return (
    <Router history={history}>
      <Provider store={store} >
        <div id="app" className="d-flex flex-column h-100">
          <NavBar />
          <Container className="flex-grow-1 mt-5">
            <Switch>
              <Route exact path="/" component={ Books } />
              <Route exact path="/books/new" component={ NewBook } />
              <Route exact path="/books/edit/:id" component={ EditBook } />

              <PrivateRoute path="/profile" component={Profile} />
            </Switch>
          </Container>
        </div>
      </Provider>
    </Router>
  );
};

export default App;
