/** @babel */

/**
 * Copyright (c) 2016-present, PlatformIO Plus <contact@pioplus.com>
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

import { getUsername, runAccountCommand, setUserLoggedInStatus, setUsername } from '../helpers';

import PasswordInput from '../components/password-input';
import PlatformIOLogo from '../../home/components/pio-logo';
import PropTypes from 'prop-types';
import React from 'react';
import UsernameInput from '../components/username-input';

export const LOGIN_FORM = 'LOGIN';
export const REGISTER_FORM = 'REGISTER';
export const FORGOT_FORM = 'FORGOT';

export default class LoginForm extends React.Component {

  static propTypes = {
    // onResolve: PropTypes.func.isRequired,
    // onReject: PropTypes.func.isRequired,
    // formType: PropTypes.string,
  }

  constructor() {
    super(...arguments);

    this.state = {
      initialUsername: getUsername(),
      username: '',
      isUsernameValid: false,
      password: '',
      disabled: false,
      error: '',
    };
  }

  onSubmit() {}

  doLogin() {
    // const { username, isUsernameValid, password } = this.state;
    //
    // if (!username || !isUsernameValid || !password) {
    //   return;
    // }
    //
    // this.setState({
    //   disabled: true
    // });
    //
    // return runAccountCommand('login', {
    //   extraArgs: ['--username', username, '--password', password],
    // })
    //   .then(() => {
    //     this.setError('');
    //     setUsername(username);
    //     setUserLoggedInStatus(true);
    //     this.props.onResolve();
    //   })
    //   .catch((error) => {
    //     this.setError(error);
    //     this.setState({
    //       disabled: false
    //     });
    //   });
  }

  onDidClose() {
    // this.props.onResolve();
  }

  handleUsernameChange(username) {
    this.setState({
      username: username,
    });
  }

  handleUsernameValidityChange(isValid) {
    this.setState({
      isUsernameValid: isValid,
    });
  }

  handlePasswordChange(password) {
    this.setState({
      password: password,
    });
  }

  handleCreateAccountLinkClick() {
    this.setState({
      formType: this.constructor.REGISTER,
      error: '',
    });
  }

  handleForgotPasswordLinkClick() {
    this.setState({
      formType: this.constructor.FORGOT,
      error: '',
    });
  }

  handleLoginLinkClick() {
    this.setState({
      formType: this.constructor.LOGIN,
    });
  }

  setError(error) {
    this.setState({
      error: (error instanceof Error) ? error.message : error.toString(),
    });
  }

  isLogin() {
    return this.state.formType == this.constructor.LOGIN;
  }

  isRegister() {
    return this.state.formType == this.constructor.REGISTER;
  }

  isNotRegister() {
    return this.state.formType != this.constructor.REGISTER;
  }

  render() {
    return (
      <div>
        <div className='header'>
          <PlatformIOLogo />
        </div>
        <form onSubmit={ ::this.onSubmit }>
          <UsernameInput initial={ this.state.initialUsername } onValidityChange={ ::this.handleUsernameValidityChange } onValueChange={ ::this.handleUsernameChange } />
          <PasswordInput value={ this.state.password } onChange={ ::this.handlePasswordChange } />
          <div className='block'>
            <button onClick={ ::this.onSubmit } disabled={ this.state.disabled ? 'disabled' : '' } className='auth-complete-button btn btn-lg btn-primary'>
              Log In
            </button>
          </div>
        </form>
        <a className='forgot-password-link' style={ { display: this.isLogin() ? 'block' : 'none' } } onClick={ ::this.handleForgotPasswordLinkClick }>Forgot password?</a>
        <p>
          Do not have an account?
          <br/>
          <a href='#' onClick={ ::this.handleCreateAccountLinkClick }>Create one for FREE!</a>
        </p>
        <div className='error-block' style={ { display: this.state.error ? 'block' : 'none' } }>
          <pre className='error-messages'>{ this.state.error }</pre>
        </div>
        <a onClick={ ::this.onDidClose } className='skip-button inline-block'>Skip</a>
      </div>
    );
  }

}
