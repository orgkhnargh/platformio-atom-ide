/** @babel */

/**
 * Copyright (c) 2016-present, PlatformIO Plus <contact@pioplus.com>
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

import { getAuthFormPassword, getAuthFormUsername, getLastUsedUsername } from '../selectors';
import { loginRequest, updateAuthFormPassword, updateAuthFormUsername } from '../actions';
import { LOGIN_FORM } from '../containers/auth-container';
import LoginForm from '../components/login-form';
import PropTypes from 'prop-types';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isUsernameValid } from '../helpers';


class LoginFormContainer extends React.Component {

  static propTypes = {
    onUsernameChange: PropTypes.func.isRequired,
    onPasswordChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }

  constructor() {
    super(...arguments);

    this.handleUsernameChange = ::this.handleUsernameChange;
    this.handleSubmit = ::this.handleSubmit;
  }

  handleUsernameChange(username) {
    this.props.onUsernameChange(username, isUsernameValid(username));
  }

  handleSubmit() {
    this.props.onSubmit(this.props.username, this.props.password);
  }

  render() {
    return <LoginForm username={ this.props.username }
             password={ this.props.password }
             onUsernameChange={ this.handleUsernameChange }
             onPasswordChange={ this.props.onPasswordChange }
             onSubmit={ this.handleSubmit } />;
  }

}


function mapStateToProps(state) {
  return {
    username: getAuthFormUsername(state, LOGIN_FORM).value || getLastUsedUsername(state),
    password: getAuthFormPassword(state),
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    onUsernameChange: (...args) => updateAuthFormUsername(LOGIN_FORM, ...args),
    onPasswordChange: updateAuthFormPassword,
    onSubmit: loginRequest
  }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginFormContainer);
