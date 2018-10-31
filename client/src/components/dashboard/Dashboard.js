import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProfile, clearCurrentProfile, deleteExperience, deleteEducation } from '../../store/actions/profileAction';
import { deleteAccount } from '../../store/actions/authAction';
import { Spinner, ProfileActions, ExpCredentials, EduCredentials } from '../Export';
import setAuthToken from '../../utils/setAuthToken';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  deleteAccount = (e) => {
    e.preventDefault();
    if (window.confirm('Are you sure? This can NOT be undone')) {
      this.props.clearCurrentProfile();
      this.props.deleteAccount();
      localStorage.removeItem('jwtToken');
      setAuthToken(false);
    }
  }

  render() {
    const { profile, loading } = this.props.profile;
    const { user } = this.props.auth;

    return (
      <div className="dashboard">
      {
        profile === null && loading && <Spinner />
      }
      {
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <h1 className="display-4">Dashboard</h1>
              {
                profile !== null && !loading &&
                <Fragment>
                  <h3 className="lead text-muted">
                    Welcome <NavLink to={`/profile/${profile.handle}`}>{user.name}</NavLink>
                  </h3>
                  <ProfileActions />
                  {
                    profile.experience.length > 0 ?
                    <Fragment>
                      <hr />
                      <ExpCredentials
                        header="Experience Credentials"
                        experience={profile.experience}
                        deleteExperience={this.props.deleteExperience}
                      />
                    </Fragment> :
                    null
                  }
                  {
                    profile.education.length > 0 ?
                    <Fragment>
                      <hr />
                      <EduCredentials
                        header="Education Credentials"
                        education={profile.education}
                        deleteEducation={this.props.deleteEducation}
                      />
                    </Fragment> :
                    null
                  }
                </Fragment>
              }
              {
                profile === null && !loading &&
                <Fragment>
                  <h3 className="lead text-muted">Welcome {user.name}</h3>
                  <p>
                    You have not yet setup a profile. Please tell us more about you.
                  </p>
                  <NavLink to="/create-profile" className="btn btn-lg btn-info">Create my profile</NavLink>
                </Fragment>
              }
              <hr />
              <div style={{marginBottom: "60px"}}>
                <button onClick={this.deleteAccount} className="btn btn-danger">
                  Delete My Account
                </button>
              </div>
            </div>
          </div>
        </div>
      }
      </div>
    );
  }
}

Dashboard.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  clearCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  deleteAccount,
  clearCurrentProfile,
  deleteExperience,
  deleteEducation
})(Dashboard);
