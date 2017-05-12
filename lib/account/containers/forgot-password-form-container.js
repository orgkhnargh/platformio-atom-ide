/** @babel */

/**
 * Copyright (c) 2016-present, PlatformIO Plus <contact@pioplus.com>
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

import { FORGOT_FORM, REGISTER_FORM } from './auth-container';
import { getAuthFormError, getLastUsedUsername } from '../selectors';

import ForgotPasswordForm from '../components/forgot-password-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { forgotPasswordRequest } from '../actions';
import { goTo } from '../../core/helpers';


const ForgotPasswordFormContainer = connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordForm);


function mapStateToProps(state, ownProps) {
  return {
    initialUsername: getLastUsedUsername(state),
    error: getAuthFormError(state, FORGOT_FORM),
    onRegisterClick: () => goTo(ownProps.history, `/auth/${REGISTER_FORM}`),
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    onSubmit: forgotPasswordRequest,
  }, dispatch);
}


export default ForgotPasswordFormContainer;
