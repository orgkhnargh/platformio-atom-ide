/** @babel */

/**
 * Copyright (c) 2016-present, PlatformIO Plus <contact@pioplus.com>
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

import { getUsername, runAccountCommand, runPioAccountForgotPassword, setUserLoggedInStatus, setUsername } from '../helpers';

import LoginForm from '../components/login-form';
import PasswordInput from '../components/password-input';
import PropTypes from 'prop-types';
import React from 'react';
import UsernameInput from '../components/username-input';

export const LOGIN_FORM = 'LOGIN';
export const REGISTER_FORM = 'REGISTER';
export const FORGOT_FORM = 'FORGOT';

export class AuthComponent extends React.Component {

  static LOGIN = LOGIN_FORM;
  static REGISTER = REGISTER_FORM;
  static FORGOT = FORGOT_FORM;
  static COMPLETE_BUTTON_TEXT = {
    LOGIN: 'Log In',
    REGISTER: 'Register',
    FORGOT: 'Submit',
  }
  static HEADER_TEXT = {
    LOGIN: 'Log in to PlatformIO',
    REGISTER: 'Create a Free PIO Account',
    FORGOT: 'Forgot Password',
  }

  static propTypes = {
    onResolve: PropTypes.func.isRequired,
    onReject: PropTypes.func.isRequired,
    formType: PropTypes.string,
  }

  constructor(props) {
    super(...arguments);

    this.state = {
      initialUsername: getUsername(),
      username: '',
      isUsernameValid: false,
      password: '',
      formType: props.formType || LOGIN_FORM,
      disabled: false,
      error: '',
    };
  }

  onSubmit() {
    switch (this.state.formType) {
      case this.constructor.LOGIN:
        return this.doLogin();

      case this.constructor.REGISTER:
        return this.doRegister();

      case this.constructor.FORGOT:
        return this.doForgot();

      default:
        throw new Error(`Invalid form type: ${this.state.formType}`);
    }

  }

  doLogin() {
    const { username, isUsernameValid, password } = this.state;

    if (!username || !isUsernameValid || !password) {
      return;
    }

    this.setState({
      disabled: true
    });

    return runAccountCommand('login', {
      extraArgs: ['--username', username, '--password', password],
    })
      .then(() => {
        this.setError('');
        setUsername(username);
        setUserLoggedInStatus(true);
        this.props.onResolve();
      })
      .catch((error) => {
        this.setError(error);
        this.setState({
          disabled: false
        });
      });
  }

  doRegister() {
    const { username, isUsernameValid } = this.state;

    if (!username || !isUsernameValid) {
      return;
    }

    this.setState({
      disabled: true
    });

    return runAccountCommand('register', {
      extraArgs: ['--username', username],
    })
      .then(() => {
        this.setError('');
        atom.notifications.addSuccess('You have been successfully registered.', {
          detail: 'Your password was sent to the email address you specified.',
        });
        this.setState({
          formType: this.constructor.LOGIN,
          disabled: false,
        });
      })
      .catch((error) => {
        this.setError(error);
        this.setState({
          disabled: false
        });
      });
  }

  doForgot() {
    const { username, isUsernameValid } = this.state;

    if (!username || !isUsernameValid) {
      return;
    }

    this.setState({
      disabled: true
    });

    return runPioAccountForgotPassword(username)
      .then(() => {
        this.setError('');
        atom.notifications.addSuccess('Password reset request has been sent successfully.', {
          detail: 'Please check your email for instructions.',
        });
        this.setState({
          formType: this.constructor.LOGIN,
          disabled: false,
        });
      })
      .catch((error) => {
        this.setError(error);
        this.setState({
          disabled: false
        });
      });
  }

  onSkipClick() {
    this.props.onResolve();
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

  render() {
    let formComponent = null;
    switch (this.state.formType) {
      case LOGIN_FORM:
        formComponent = <LoginForm />;
        break;
      case REGISTER_FORM:
      case FORGOT_FORM:
        formComponent = (
          <div>
            <div className='header'>
              <h1>{ this.constructor.HEADER_TEXT[this.state.formType] }</h1>
            </div>
            <div className='block' style={ { display: this.isRegister() ? 'block' : 'none' } }>
              <b>PIO Account</b> opens access to the extra professional features:
              <ul className='info-messages'>
                <li>
                  <a href='http://docs.platformio.org/page/plus/pio-remote.html'>PIO Remote™</a>
                </li>
                <li>
                  <a href='http://docs.platformio.org/page/plus/unit-testing.html'>Unit Testing</a>
                </li>
                <li>
                  <a href='http://docs.platformio.org/page/ide.html#ide-cloud'>Cloud IDEs</a>
                </li>
                <li>
                  <a href='http://docs.platformio.org/page/plus/debugging.html'>PIO Unified Debugger</a>
                </li>
              </ul>
              <br />
            </div>
            <form onSubmit={ ::this.onSubmit }>
              <UsernameInput initial={ this.state.initialUsername } onValidityChange={ ::this.handleUsernameValidityChange } onValueChange={ ::this.handleUsernameChange } />
              <div style={ { display: this.isLogin() ? 'block' : 'none' } }>
                <PasswordInput value={ this.state.password } onChange={ ::this.handlePasswordChange } />
              </div>
              <div className='block'>
                <button onClick={ ::this.onSubmit } disabled={ this.state.disabled ? 'disabled' : '' } className='auth-complete-button btn btn-lg btn-primary'>
                  { this.constructor.COMPLETE_BUTTON_TEXT[this.state.formType] }
                </button>
              </div>
            </form>
            <a className='forgot-password-link' style={ { display: this.isLogin() ? 'block' : 'none' } } onClick={ ::this.handleForgotPasswordLinkClick }>Forgot password?</a>
            <div className='register-or-login-link'>
              <p style={ { display: this.isNotRegister() ? 'block' : 'none' } }>
              Do not have an account?
              <br/>
                <a href='#' onClick={ ::this.handleCreateAccountLinkClick }>Create one for FREE!</a>
              </p>
              <p style={ { display: this.isRegister() ? 'block' : 'none' } }>
              Already have an account? <a href='#' onClick={ ::this.handleLoginLinkClick }>Login now!</a>
              </p>
            </div>
            <div className='error-block native-key-bindings' style={ { display: this.state.error ? 'block' : 'none' } }>
              <pre className='error-messages'>{ this.state.error }</pre>
            </div>
          </div>
        );
        break;
      default:
        throw new Error('Invalid form type');
    }
    return (
      <div className='auth-modal native-key-bindings' tabIndex='1'>
        { formComponent }
        <a onClick={ ::this.onSkipClick } className='skip-button inline-block'>Skip</a>
      </div>);
  }

}
