/** @babel */

/**
 * Copyright (c) 2016-present, PlatformIO Plus <contact@pioplus.com>
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

import { getUsername, runAccountCommand, runPioAccountForgotPassword, setUserLoggedInStatus, setUsername } from '../helpers';

import AuthComponent from '../components/auth-component';
import PropTypes from 'prop-types';
import React from 'react';
import { bindActionCreators } from 'redux';

export const LOGIN_FORM = 'LOGIN';
export const REGISTER_FORM = 'REGISTER';
export const FORGOT_FORM = 'FORGOT';

export class AuthContainer extends React.Component {

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
    return <AuthComponent />;
  }

}


function mapStateToProps(state) {
  return {
    // info: getAccountInformation(state),
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    // onLoginClick: () => authFormRequest(LOGIN_FORM),
    // onCreateAccountClick: () => authFormRequest(REGISTER_FORM),
  }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(InformationPage);
