/** @babel */

/**
 * Copyright (c) 2016-present, PlatformIO Plus <contact@pioplus.com>
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */


import AuthComponent from '../components/auth-component';
import { authFormCloseRequest } from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export const LOGIN_FORM = 'LOGIN';
export const REGISTER_FORM = 'REGISTER';
export const FORGOT_FORM = 'FORGOT';


const AuthContainer = connect(null, mapDispatchToProps)(AuthComponent);


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    onSkipClick: authFormCloseRequest,
  }, dispatch);
}


export default AuthContainer;
