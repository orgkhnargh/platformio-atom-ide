/** @babel */

/**
 * Copyright (c) 2016-present, PlatformIO Plus <contact@pioplus.com>
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */


import { FORGOT_FORM, LOGIN_FORM, REGISTER_FORM } from '../containers/auth-container';
import { Route, Switch } from 'react-router';

import ForgotPasswordFormContainer from '../containers/forgot-password-form-container';
import LoginFormContainer from '../containers/login-form-container';
import PropTypes from 'prop-types';
import React from 'react';
import RegisterFormContainer from '../containers/register-form-container';


export default class AuthComponent extends React.Component {

  static propTypes = {
    onSkipClick: PropTypes.func.isRequired,
  }

  render() {
    return (
      <div className='auth-modal native-key-bindings' tabIndex='1'>
        <Switch>
          <Route path={ `/auth/${LOGIN_FORM}` } component={ LoginFormContainer } />
          <Route path={ `/auth/${REGISTER_FORM}` } component={ RegisterFormContainer } />
          <Route path={ `/auth/${FORGOT_FORM}` } component={ ForgotPasswordFormContainer } />
        </Switch>
        <a onClick={ this.props.onSkipClick } className='skip-button inline-block'>Skip</a>
      </div>
    );
  }

}


// { routes.slice(0).reverse().map(item => (
//   <Route key={ item.path }
//       exact={ item.exact }
//       path={ item.path }
//       component={ item.component } />
//   )) }
