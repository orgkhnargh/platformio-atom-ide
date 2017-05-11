/** @babel */

/**
 * Copyright (c) 2016-present, PlatformIO Plus <contact@pioplus.com>
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

import { getAuthFormError, getLastUsedUsername } from '../selectors';
import { FORGOT_FORM } from './auth-container';
import ForgotPasswordForm from '../components/forgot-password-form';
import PropTypes from 'prop-types';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { forgotPasswordRequest } from '../actions';



class ForgotPasswordFormContainer extends React.Component {

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onRegisterClick: PropTypes.func.isRequired,
    initialUsername: PropTypes.string,
    error: PropTypes.string,
  }

  render() {
    const { onSubmit, onRegisterClick, initialUsername, error } = this.props;
    return <ForgotPasswordForm error={ error }
             initialUsername={ initialUsername }
             onRegisterClick={ onRegisterClick }
             onSubmit={ onSubmit } />;
  }

}


function mapStateToProps(state) {
  return {
    initialUsername: getLastUsedUsername(state),
    error: getAuthFormError(state, FORGOT_FORM),
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    onSubmit: forgotPasswordRequest,
  }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordFormContainer);
