/** @babel */

/**
 * Copyright (c) 2016-present, PlatformIO Plus <contact@pioplus.com>
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */


import AuthComponent from '../components/auth-component';
import PropTypes from 'prop-types';
import React from 'react';
import { authFormCloseRequest } from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getIsAuthRequestInProgress } from '../selectors';

export const LOGIN_FORM = 'LOGIN';
export const REGISTER_FORM = 'REGISTER';
export const FORGOT_FORM = 'FORGOT';


export class AuthContainer extends React.Component {

  static propTypes = {
    onSkipClick: PropTypes.func.isRequired,
    isAuthRequestInProgress: PropTypes.bool.isRequired,
    formType: PropTypes.string,
  }

  constructor() {
    super(...arguments);

    this.goToLogin = ::this.goToLogin;
    this.goToRegister = ::this.goToRegister;
    this.goToForgot = ::this.goToForgot;

    this.state = {
      formType: this.props.formType,
    };
  }

  goTo(formType) {
    this.setState({
      formType,
    });
  }

  goToLogin() {
    this.goTo(LOGIN_FORM);
  }

  goToRegister() {
    this.goTo(REGISTER_FORM);
  }

  goToForgot() {
    this.goTo(FORGOT_FORM);
  }

  render() {
    const { isAuthRequestInProgress, onSkipClick } = this.props;
    return <AuthComponent formType={ this.state.formType }
             isAuthRequestInProgress={ isAuthRequestInProgress }
             onSkipClick={ onSkipClick }
             onLoginClick={ this.goToLogin }
             onRegisterClick={ this.goToRegister }
             onForgotClick={ this.goToForgot } />;
  }

}


function mapStateToProps(state) {
  return {
    isAuthRequestInProgress: getIsAuthRequestInProgress(state),
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    onSkipClick: authFormCloseRequest,
  }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);
