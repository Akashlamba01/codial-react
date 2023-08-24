import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { useAuth } from "../hooks";
import { Home, Login, Signup, Settings, UserProfile } from "../pages";
import { Loader, Navbar } from "./";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

const Page404 = () => {
  return <h1>404</h1>;
};

const PrivateRoute = ({ children, ...rest }) => {
  const auth = useAuth();

  return (
    <Route
      {...rest}
      render={() => {
        if (auth.user) {
          return children;
        }

        return <Redirect to="/login" />;
      }}
    />
  );
};

function App() {
  const auth = useAuth();

  if (auth.loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route exact path="/login">
            <Login />
          </Route>

          <Route exact path="/register">
            <Signup />
          </Route>

          <PrivateRoute exact path="/settings">
            <Settings />
          </PrivateRoute>

          <PrivateRoute exact path="/user/:userId">
            <UserProfile />
          </PrivateRoute>

          <Route>
            <Page404 />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
