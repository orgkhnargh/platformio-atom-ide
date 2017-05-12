/** @babel */

/**
 * Copyright (c) 2016-present, PlatformIO Plus <contact@pioplus.com>
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

import { FORGOT_FORM, LOGIN_FORM, REGISTER_FORM } from './auth-container';
import { getAuthFormError, getLastUsedUsername } from '../selectors';

import LoginForm from '../components/login-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { goTo } from '../../core/helpers';
import { loginRequest } from '../actions';


const LoginFormContainer = connect(mapStateToProps, mapDispatchToProps)(LoginForm);


function mapStateToProps(state, ownProps) {
  return {
    initialUsername: getLastUsedUsername(state),
    error: getAuthFormError(state, LOGIN_FORM),
    onRegisterClick: () => goTo(ownProps.history, `/auth/${REGISTER_FORM}`),
    onForgotClick: () => goTo(ownProps.history, `/auth/${FORGOT_FORM}`),
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    onSubmit: loginRequest,
  }, dispatch);
}


export default LoginFormContainer;
