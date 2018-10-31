import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getPost } from '../../store/actions/postAction';
import { Spinner, CommentForm, Comment } from '../Export';

class Post extends Component {
  componentDidMount() {
    if (!this.props.post.loading) {
      this.props.getPost(this.props.match.params.post_id);
    }
  }

  render() {
    const { loading, post } = this.props.post;

    return (
      <div>
        {
          post === null || loading ?
          <Spinner /> :
          <div className="post">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="card card-body mb-3">
                    <div className="row">
                      <div className="col-md-2">
                        <NavLink to={`/profile/user/${post.user}`}>
                          <img className="rounded-circle d-none d-md-block" src={post.avatar}
                            alt={post.name} />
                        </NavLink>
                        <br />
                        <p className="text-center">{post.name}</p>
                      </div>
                      <div className="col-md-10">
                        <p className="lead">{post.text}</p>
                      </div>
                    </div>
                  </div>
                  <CommentForm postId={post._id} />
                  {
                    post.comments && post.comments.length > 0 ?
                    <div className="comments">
                      {
                        post.comments.map(comment =>
                          <Comment key={comment._id} post={post} comment={comment} />
                        )
                      }
                    </div>  :
                    <h3>There are no comments yet. Be the first to comment</h3>
                  }
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  post: state.post
})

export default connect(mapStateToProps, { getPost })(Post);
