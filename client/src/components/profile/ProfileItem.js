import React from 'react';
import { NavLink } from 'react-router-dom';

export default ({profile, currentProfile}) =>
  <div key={profile._id} className="card card-body bg-light mb-3">
    <div className="row">
      <div className="col-2">
        <img className="rounded-circle" src={profile.user.avatar} alt={profile.user.name} />
      </div>
      <div className="col-sm-12 col-lg-6 col-md-4 col-8">
        <h3>{currentProfile ? "You" : profile.user.name.replace(profile.user.name.charAt(0), profile.user.name.charAt(0).toUpperCase())}</h3>
        <p>{profile.status.replace(profile.status.charAt(0), profile.status.charAt(0).toUpperCase())}{!profile.company ? null : <span> at {profile.company.replace(profile.company.charAt(0), profile.company.charAt(0).toUpperCase())}</span>}</p>
        {
          profile.location ?
          <p>
            {
              profile.location.replace(profile.location.charAt(0), profile.location.charAt(0).toUpperCase())
            }
          </p>
          :
          null
        }
        <NavLink to={`/profile/handle/${profile.handle}`} className="btn btn-info">View Profile</NavLink>
      </div>
      <div className="col-sm-12 col-md-4 d-none d-md-block">
        <h4>Skill Set</h4>
        <ul className="list-group">
          {
            profile.skills.map(skill =>
              <li key={skill} className="list-group-item">
                <i className="fa fa-check pr-1"></i>
                { skill }
              </li>
            )
          }
        </ul>
      </div>
    </div>
  </div>
