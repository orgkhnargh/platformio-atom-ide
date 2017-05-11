/** @babel */

/**
 * Copyright (c) 2016-present, PlatformIO Plus <contact@pioplus.com>
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */


import { FORGOT_FORM, LOGIN_FORM, REGISTER_FORM } from '../containers/auth-container';
import ForgotPasswordFormContainer from '../containers/forgot-password-form-container';
import LoginFormContainer from '../containers/login-form-container';
import PropTypes from 'prop-types';
import React from 'react';
import RegisterFormContainer from '../containers/register-form-container';


export default class AuthComponent extends React.Component {

  static propTypes = {
    onSkipClick: PropTypes.func.isRequired,
    onLoginClick: PropTypes.func.isRequired,
    onRegisterClick: PropTypes.func.isRequired,
    onForgotClick: PropTypes.func.isRequired,
    isAuthRequestInProgress: PropTypes.bool.isRequired,
    formType: PropTypes.string,
  }

  static defaultProps = {
    formType: LOGIN_FORM,
  }

  getFormComponent() {
    const { isAuthRequestInProgress, onLoginClick, onRegisterClick, onForgotClick } = this.props;
    switch (this.props.formType) {
      case LOGIN_FORM:
        return <LoginFormContainer isAuthRequestInProgress={ isAuthRequestInProgress } onRegisterClick={ onRegisterClick } onForgotClick={ onForgotClick } />;

      case REGISTER_FORM:
        return <RegisterFormContainer isAuthRequestInProgress={ isAuthRequestInProgress } onLoginClick={ onLoginClick } />;

      case FORGOT_FORM:
        return <ForgotPasswordFormContainer isAuthRequestInProgress={ isAuthRequestInProgress } onRegisterClick={ onLoginClick } />;

      default:
        throw new Error('Invalid form type');
    }
  }

  render() {
    const formComponent = this.getFormComponent();
    return (
      <div className='auth-modal native-key-bindings' tabIndex='1'>
        { formComponent }
        <a onClick={ this.props.onSkipClick } className='skip-button inline-block'>Skip</a>
      </div>);
  }

}
