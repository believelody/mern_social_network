import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProfiles, getCurrentProfile, clearCurrentProfile } from '../../store/actions/profileAction';
import { Spinner, ProfileItem } from '../Export';

class Profiles extends Component {

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.getCurrentProfile();
    }
    else {
      this.props.clearCurrentProfile();
    }
    this.props.getProfiles();
  }

  render() {
    const currentProfile = this.props.profile.profile;
    const { profiles, loading } = this.props.profile;

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12" style={{position: 'relative'}}>
              <h1 className="display-4 text-center">Developer Profiles</h1>
              <p className="lead text-center">Browse and connect with developers</p>
              {
                (profiles === null || loading) ?
                <Spinner /> :
                <Fragment>
                  {
                    profiles.length > 0 ?
                    profiles.map(profile => <ProfileItem key={profile._id} currentProfile={ currentProfile ? currentProfile : null} profile={profile} /> ) :
                    <h4>There are no profiles</h4>
                  }
                </Fragment>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profiles.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfiles: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getProfiles, getCurrentProfile, clearCurrentProfile })(Profiles);
