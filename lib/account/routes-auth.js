/** @babel */

/**
 * Copyright (c) 2016-present, PlatformIO Plus <contact@pioplus.com>
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

import { FORGOT_FORM, LOGIN_FORM, REGISTER_FORM } from './containers/auth-container';

import ForgotPasswordFormContainer from './containers/forgot-password-form-container';
import LoginFormContainer from './containers/login-form-container';
import RegisterFormContainer from './containers/register-form-container';


const routes = [
  {
    path: `/auth/${LOGIN_FORM}`,
    component: LoginFormContainer
  },
  {
    path: `/auth/${REGISTER_FORM}`,
    component: RegisterFormContainer
  },
  {
    path: `/auth/${FORGOT_FORM}`,
    component: ForgotPasswordFormContainer
  },
];

export default routes;
