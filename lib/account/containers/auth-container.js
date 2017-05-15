/** @babel */

/**
 * Copyright (c) 2016-present, PlatformIO Plus <contact@pioplus.com>
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */


import { Route, Switch } from 'react-router';

import ForgotPasswordFormContainer from '../containers/forgot-password-form-container';
import LoginFormContainer from '../containers/login-form-container';
import React from 'react';
import RegisterFormContainer from '../containers/register-form-container';


export const LOGIN_FORM = 'LOGIN';
export const REGISTER_FORM = 'REGISTER';
export const FORGOT_FORM = 'FORGOT';


export default class AuthContainer extends React.Component {

  render() {
    return (
      <div className='auth-modal pio-native-key-bindings-tab-fix native-key-bindings' tabIndex='1'>
        <Switch>
          <Route path={ `/auth/${LOGIN_FORM}` } component={ LoginFormContainer } />
          <Route path={ `/auth/${REGISTER_FORM}` } component={ RegisterFormContainer } />
          <Route path={ `/auth/${FORGOT_FORM}` } component={ ForgotPasswordFormContainer } />
        </Switch>
      </div>
    );
  }

}
