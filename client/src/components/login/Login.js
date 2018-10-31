import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../store/actions/authAction';
import { TextFieldGroup } from '../Export';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    const currentUser = {email, password};
    this.props.loginUser(currentUser);
  }

  render() {
    const { email, password, errors } = this.state;
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">Sign in to your DevConnector account</p>
              <form noValidate onSubmit={this.handleSubmit}>
                <TextFieldGroup
                  name="email"
                  value={email}
                  placeholder="Email Address"
                  type="email"
                  error={errors.email}
                  onChange={this.handleChange}
                />
                <TextFieldGroup
                  name="password"
                  value={password}
                  placeholder="Password"
                  type="password"
                  error={errors.password}
                  onChange={this.handleChange}
                />
                { errors.notconfirmed && <h3 className="display-7 text-danger">{errors.notconfirmed}</h3> }
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

const dispatchStateToProps = {
  loginUser
};

export default connect(mapStateToProps, dispatchStateToProps)(Login);
