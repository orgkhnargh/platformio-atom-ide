/** @babel */

/**
 * Copyright (c) 2016-present, PlatformIO Plus <contact@pioplus.com>
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

import { LOGIN_FORM, REGISTER_FORM } from './auth-container';

import RegisterForm from '../components/register-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getAuthFormError } from '../selectors';
import { goTo } from '../../core/helpers';
import { registerRequest } from '../actions';


const RegisterFormContainer = connect(mapStateToProps, mapDispatchToProps)(RegisterForm);


function mapStateToProps(state, ownProps) {
  return {
    error: getAuthFormError(state, REGISTER_FORM),
    onLoginClick: () => goTo(ownProps.history, `/auth/${LOGIN_FORM}`),
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    onSubmit: registerRequest,
  }, dispatch);
}


export default RegisterFormContainer;
