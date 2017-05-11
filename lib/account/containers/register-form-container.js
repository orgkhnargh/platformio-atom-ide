/** @babel */

/**
 * Copyright (c) 2016-present, PlatformIO Plus <contact@pioplus.com>
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import { REGISTER_FORM } from './auth-container';
import React from 'react';
import RegisterForm from '../components/register-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getAuthFormError } from '../selectors';
import { registerRequest } from '../actions';

class RegisterFormContainer extends React.Component {

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onLoginClick: PropTypes.func.isRequired,
    error: PropTypes.string,
  }

  render() {
    const { onSubmit, onLoginClick, error } = this.props;
    return <RegisterForm error={ error } onLoginClick={ onLoginClick } onSubmit={ onSubmit } />;
  }

}


function mapStateToProps(state) {
  return {
    error: getAuthFormError(state, REGISTER_FORM),
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    onSubmit: registerRequest,
  }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(RegisterFormContainer);
