/** @babel */

/**
 * Copyright (c) 2016-present, PlatformIO Plus <contact@pioplus.com>
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

import PasswordInput from '../components/password-input';
import PlatformIOLogo from '../../home/components/pio-logo';
import PropTypes from 'prop-types';
import React from 'react';
import UsernameInput from '../components/username-input';


export default class LoginForm extends React.Component {

  static propTypes = {
    initialUsername: PropTypes.string,
    error: PropTypes.string,
    loginRequest: PropTypes.func.isRequired,
    onRegisterClick: PropTypes.func.isRequired,
    onForgotClick: PropTypes.func.isRequired,
    authFormCloseRequest: PropTypes.func.isRequired,
    isAuthRequestInProgress: PropTypes.bool.isRequired,
  }

  constructor() {
    super(...arguments);

    this.state = {
      username: this.props.initialUsername || '',
      password: '',
    };

    this.handleUsernameChange = ::this.handleUsernameChange;
    this.handlePasswordChange = ::this.handlePasswordChange;
    this.handleSubmit = ::this.handleSubmit;
  }

  handleUsernameChange(username) {
    this.setState({
      username,
    });
  }

  handlePasswordChange(password) {
    this.setState({
      password,
    });
  }

  handleSubmit() {
    this.props.loginRequest(this.state.username, this.state.password);
  }

  render() {
    return (
      <div>
        <div className='header'>
          <PlatformIOLogo />
        </div>
        <form onSubmit={ this.handleSubmit }>
          <UsernameInput value={ this.state.username } onChange={ this.handleUsernameChange } />
          <PasswordInput value={ this.state.password } onChange={ this.handlePasswordChange } />
          <div className='block'>
            <button type='submit' disabled={ this.props.isAuthRequestInProgress } className={ (this.props.isAuthRequestInProgress ? 'btn-inprogress' : '') + ' auth-complete-button btn btn-lg btn-primary' }>
              Log In
            </button>
          </div>
        </form>
        <a onClick={ this.props.onForgotClick } className='forgot-password-link'>Forgot password?</a>
        <p>
          Do not have an account?
          <br/>
          <a onClick={ this.props.onRegisterClick }>Create one for FREE!</a>
        </p>
        { this.props.error && (
          <div className='error-block native-key-bindings'>
            <pre className='error-messages'>{ this.props.error }</pre>
          </div>
          ) }
        <a onClick={ this.props.authFormCloseRequest } className='skip-button inline-block'>Skip</a>
      </div>
    );
  }

}
