import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { confirmUser } from '../../store/actions/authAction';
import { Spinner } from '../Export';

class Verify extends Component {
  componentDidMount() {
    this.props.confirmUser(this.props.match.params.token);
  }

  render() {
    const { verified } = this.props.auth;
    return (
      <div>
        {
          !verified && <Spinner />
        }
        {
          verified && <h2 className="display-4 text-center text-success">Congrats!!! Now login to see awesoneness</h2>
        }
      </div>
    );
  }
}

Verify.propTypes = {
  auth: PropTypes.object.isRequired,
  confirmUser: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { confirmUser })(Verify);
