import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProfileByHandle, getProfileById } from '../../store/actions/profileAction';
import { Spinner, ProfileHeader, ProfileAbout, ProfileExp, ProfileEdu, ProfileGithub } from '../Export';

class Profile extends Component {

  componentDidMount() {
    if (this.props.match.params.id && !this.props.profile.loading) {
      this.props.getProfileById(this.props.match.params.id);
    }
    if (this.props.match.params.handle && this.props.match.params.handle !== "user" && !this.props.profile.loading){
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push('/not-found');
    }
  }

  render() {
    const { profile, loading } = this.props.profile;
    
    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12" style={{position: 'relative'}}>
              <div className="row">
                <div className="col-6">
                  {
                    this.props.match.params.id ?
                    <NavLink to="/feeds" className="btn btn-light mb-3 float-left">Back To Posts</NavLink>
                    :
                    <NavLink to="/profiles" className="btn btn-light mb-3 float-left">Back To Profiles</NavLink>
                  }
                </div>
                <div className="col-6">

                </div>
              </div>
              {
                profile === null || loading ?
                <Spinner />
                :
                <Fragment>
                  <ProfileHeader profile={profile} />
                  <ProfileAbout profile={profile} />
                  <div className="row">
                    {
                      (profile.experience && profile.experience.length > 0) ?
                      <ProfileExp profile={profile} /> :
                        null
                      }
                    {
                      (profile.education && profile.education.length > 0) ?
                      <ProfileEdu profile={profile} /> :
                        null
                      }
                  </div>
                  {
                    profile.githubUsername ? <ProfileGithub username={profile.githubUsername} /> : null
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

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfileByHandle: PropTypes.func.isRequired,
  getProfileById: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfileByHandle, getProfileById })(Profile);
