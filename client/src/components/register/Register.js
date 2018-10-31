import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../../store/actions/authAction';
import { TextFieldGroup } from '../Export';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, password2 } = this.state;

    const newUser = {name, email, password, password2};
    this.props.registerUser(newUser);
  }

  render() {
    const { name, email, password, password2, errors } = this.state;
    const { verify } = this.props.auth;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your DevConnector account</p>
              <form noValidate onSubmit={this.handleSubmit}>
                <TextFieldGroup
                  name="name"
                  value={name}
                  placeholder="Enter your name"
                  error={errors.name}
                  onChange={this.handleChange}
                />
                <TextFieldGroup
                  name="email"
                  value={email}
                  placeholder="Email Address"
                  type="email"
                  error={errors.email}
                  info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
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
                <TextFieldGroup
                  name="password2"
                  value={password2}
                  placeholder="Confirm Password"
                  type="password"
                  error={errors.password2}
                  onChange={this.handleChange}
                />
                { verify && <h3 className="display-7 text-success">{verify}</h3> }

                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

const dispatchStateToProps = {
  registerUser
};

export default connect(mapStateToProps, dispatchStateToProps)(Register);
