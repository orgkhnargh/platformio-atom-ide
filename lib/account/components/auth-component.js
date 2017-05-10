/** @babel */

/**
 * Copyright (c) 2016-present, PlatformIO Plus <contact@pioplus.com>
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */


import LoginFormContainer from '../containers/login-form-container';
import PropTypes from 'prop-types';
import React from 'react';

export const LOGIN_FORM = 'LOGIN';
export const REGISTER_FORM = 'REGISTER';
export const FORGOT_FORM = 'FORGOT';

export default class AuthComponent extends React.Component {

  static propTypes = {
    onSkipClick: PropTypes.func.isRequired,
    formType: PropTypes.string,
  }

  static defaultProps = {
    formType: LOGIN_FORM,
  }

  render() {
    let formComponent = null;
    switch (this.props.formType) {
      case LOGIN_FORM:
        formComponent = <LoginFormContainer />;
        break;
      case REGISTER_FORM:
      case FORGOT_FORM:
        formComponent = <div>Other form</div>;
        /*formComponent = (
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
              <UsernameInput value={ this.state.initialUsername } onValidityChange={ ::this.handleUsernameValidityChange } onValueChange={ ::this.handleUsernameChange } />
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
        );*/
        break;
      default:
        throw new Error('Invalid form type');
    }
    return (
      <div className='auth-modal native-key-bindings' tabIndex='1'>
        { formComponent }
        <a onClick={ this.props.onSkipClick } className='skip-button inline-block'>Skip</a>
      </div>);
  }

}
