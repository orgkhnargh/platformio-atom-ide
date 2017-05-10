/** @babel */

/**
 * Copyright (c) 2016-present, PlatformIO Plus <contact@pioplus.com>
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

import PasswordInput from '../components/password-input';
import PlatformIOLogo from '../../home/components/pio-logo';
import PropTypes from 'prop-types';
import React from 'react';
import UsernameInput from '../components/username-input';


export default class LoginForm extends React.Component {

  static propTypes = {
    onUsernameChange: PropTypes.func.isRequired,
    onPasswordChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }

  render() {
    const { username, password, onUsernameChange, onPasswordChange, onSubmit } = this.props;
    return (
      <div>
        <div className='header'>
          <PlatformIOLogo />
        </div>
        <form onSubmit={ onSubmit }>
          <UsernameInput value={ username } onChange={ onUsernameChange } />
          <PasswordInput value={ password } onChange={ onPasswordChange } />
          <div className='block'>
            <button type='submit' className='auth-complete-button btn btn-lg btn-primary'>
              Log In
            </button>
          </div>
        </form>
        <a className='forgot-password-link'>Forgot password?</a>
        <p>
          Do not have an account?
          <br/>
          <a href='#'>Create one for FREE!</a>
        </p>
      </div>
    );
  }

}
