import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../store/actions/profileAction';
import { postComment } from '../../store/actions/postAction';
import { TextAreaGroup } from '../Export';

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: ''
    };
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value});

  handleSubmit = (e) => {
    e.preventDefault();
    const { profile } = this.props.profile;
    const { comment } = this.state;

    const data = {
      text: comment,
      user: profile.user._id,
      name: profile.user.name,
      avatar: profile.user.avatar
    }
    this.props.postComment(this.props.postId, data);
  }

  render() {
    const { comment } = this.state;
    const { profile, post } = this.props;

    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-body">
            <form noValidate onSubmit={this.handleSubmit}>
              <TextAreaGroup
                name="comment"
                placeholder="Reply to post..."
                value={comment}
                onChange={this.handleChange}
              />
              <button disabled={comment === "" ? true : false} type="submit" className="btn btn-dark">Comment</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  postComment: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  post: state.post,
  profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile, postComment })(CommentForm);
