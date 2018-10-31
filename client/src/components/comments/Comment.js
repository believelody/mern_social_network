import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { deleteComment } from '../../store/actions/postAction';

class Comment extends Component {

  render() {
    const { auth, post, comment } = this.props;
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <NavLink to={`/profile/user/${comment.user}`}>
              <img className="rounded-circle d-none d-md-block" src={comment.avatar} alt={comment.name} />
            </NavLink>
            <br />
            <p className="text-center">{comment.user === auth.user.id ? "You" : comment.name}</p>
          </div>
          <div className="col-md-10">
            {
              comment.user === auth.user.id ?
              <button onClick={() => this.props.deleteComment(post._id, comment._id)} type="button" className="btn btn-danger float-right">
                <i className="fas fa-times" />
              </button> :
              null
            }
            <p className="lead">{comment.text}</p>
          </div>
        </div>
      </div>
    );
  }

}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteComment })(Comment);
