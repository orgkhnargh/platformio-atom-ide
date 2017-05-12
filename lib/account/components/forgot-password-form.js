/** @babel */

/**
 * Copyright (c) 2016-present, PlatformIO Plus <contact@pioplus.com>
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import UsernameInput from '../components/username-input';


export default class ForgotPasswordForm extends React.Component {

  static propTypes = {
    forgotPasswordRequest: PropTypes.func.isRequired,
    onRegisterClick: PropTypes.func.isRequired,
    initialUsername: PropTypes.string,
    error: PropTypes.string,
    authFormCloseRequest: PropTypes.func.isRequired,
    isAuthRequestInProgress: PropTypes.bool.isRequired,
  }

  constructor() {
    super(...arguments);

    this.state = {
      username: this.props.initialUsername || '',
    };

    this.handleUsernameChange = ::this.handleUsernameChange;
    this.handleSubmit = ::this.handleSubmit;
  }

  handleUsernameChange(username) {
    this.setState({
      username,
    });
  }

  handleSubmit() {
    this.props.forgotPasswordRequest(this.state.username);
  }

  render() {
    return (
      <div>
        <div className='header'>
          <h1>Forgot Password</h1>
        </div>
        <form onSubmit={ this.handleSubmit }>
          <UsernameInput value={ this.state.username } onChange={ this.handleUsernameChange } />
          <div className='block'>
            <button type='submit' disabled={ this.props.isAuthRequestInProgress } className={ (this.props.isAuthRequestInProgress ? 'btn-inprogress' : '') + ' auth-complete-button btn btn-lg btn-primary' }>
              Submit
            </button>
          </div>
        </form>
        <p>
          Do not have an account?
          <br/>
          <a onClick={ this.props.onRegisterClick }>Create one for FREE!</a>
        </p>
        { this.props.error && (
          <div className='error-block native-key-bindings'>
            <pre className='error-messages'>{ this.props.error }</pre>
          </div>
          ) }
        <a onClick={ this.props.authFormCloseRequest } className='skip-button inline-block'>Skip</a>
      </div>
    );
  }

}
