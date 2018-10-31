import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { deletePost, likePost } from '../../store/actions/postAction';

class PostItem extends React.Component {
  handleLike = (postId) => this.props.likePost(postId);

  findUserLikes(likes) {
    const { auth } = this.props;
    return likes.filter(like => like.user === auth.user.id).length > 0;
  }

  render() {
    const { auth, postItem } = this.props;
    return (
      <Fragment>
        <div className="row">
          <div className="col-md-2">
            <NavLink to={`/profile/user/${postItem.user}`}>
              <img className="rounded-circle d-none d-md-block" src={postItem.avatar}
                alt={postItem.name} />
            </NavLink>
            <br />
            <p className="text-center">{postItem.user === auth.user.id ? "You" : postItem.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{postItem.text}</p>
            <button onClick={() => this.handleLike(postItem._id)} type="button" className={`btn ${this.findUserLikes(postItem.likes) ? "btn-success" : "btn-light"} mr-1`}>
              <i className="fas fa-thumbs-up text-dark" />
              <span className="badge badge-light">{postItem.likes ? postItem.likes.length : 0}</span>
            </button>
            <NavLink to={`/post/${postItem._id}`} className="btn btn-info mr-1">
              Comments {postItem.comments ? postItem.comments.length : null}
            </NavLink>
            {
              postItem.user === auth.user.id ?
              <button onClick={() => this.props.deletePost(postItem._id)} type="button" className="btn btn-danger mr-1">
                <i className="fas fa-times" />
              </button> :
              null
            }
          </div>
        </div>
        <hr />
      </Fragment>
    )
  }
}

PostItem.propTypes = {
  postItem: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deletePost, likePost })(PostItem);
