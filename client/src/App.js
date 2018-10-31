import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import store from './store';
import { setCurrentUser, logoutUser } from './store/actions/authAction';
import { clearCurrentProfile } from './store/actions/profileAction';
import './App.css';
import {
  Navbar,
  Footer,
  Landing,
  Register,
  Login,
  Dashboard,
  Profiles,
  Profile,
  CreateProfile,
  EditProfile,
  PrivateRoute,
  AddExperience,
  AddEducation,
  Feeds,
  Post,
  Verify,
  NotFound
} from './components/Export';

//  Check for token
if (localStorage.jwtToken) {
  //  Set auth token header
  setAuthToken(localStorage.jwtToken);
  //  Decode token
  const decoded = jwt_decode(localStorage.jwtToken);
  //  Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  //  Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //  Logout user
    store.dispatch(logoutUser());
    //  Clear current profile
    store.dispatch(clearCurrentProfile());
    //  Redirect to login
    window.location.href = '/';
  }
}

class App extends Component {

  render () {
    return (
      <BrowserRouter>
        <div>
          <Navbar />
          <div style={{ minHeight: "70.5vh", position: "relative" }}>
            <Route exact path="/" component={Landing} />
            <Route exact path="/profiles" component={Profiles} />
            <Route path="/profile/handle/:handle" component={Profile} />
            <Route path="/verify/:token" component={Verify} />
            <Route exact path="/not-found" component={NotFound} />
            <div style={{ width: "100%", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </div>
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/profile/user/:id" component={Profile} />
              <PrivateRoute exact path="/create-profile" component={CreateProfile} />
              <PrivateRoute exact path="/edit-profile" component={EditProfile} />
              <PrivateRoute exact path="/add-experience" component={AddExperience} />
              <PrivateRoute exact path="/add-education" component={AddEducation} />
              <PrivateRoute exact path="/feeds" component={Feeds} />
              <PrivateRoute exact path="/post/:post_id" component={Post} />
            </Switch>
            <Switch>
            </Switch>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
