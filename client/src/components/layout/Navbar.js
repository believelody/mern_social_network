import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../store/actions/authAction';
import { clearCurrentProfile } from '../../store/actions/profileAction';

class Navbar extends Component {

  logout = (e) => {
    e.preventDefault();
    this.props.logoutUser();
    window.location.href = '/';
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const AuthLinks = ({user}) => (
      <Fragment>
        <li className="nav-item">
          <NavLink className="nav-link text-light mr-4" to="/feeds">Posts Feeds</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link text-light mr-4" to="/dashboard">Dashboard</NavLink>
        </li>
        <li className="nav-item">
          <button className="btn btn-danger" onClick={this.logout}>Logout</button>
        </li>
      </Fragment>
    );
    const GuestLinks = () => (
      <Fragment>
        <li className="nav-item">
          <NavLink className="nav-link" to="/register">Sign Up</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/login">Login</NavLink>
        </li>
      </Fragment>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <NavLink className="navbar-brand" to={isAuthenticated ? "/dashboard" : "/"}>DevConnector</NavLink>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/profiles"> Developers
                </NavLink>
              </li>
            </ul>

            <ul className="navbar-nav ml-auto">
              {
                !this.props.auth.isAuthenticated ?
                  <GuestLinks /> :
                  <AuthLinks user={user} />
              }
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(Navbar);
