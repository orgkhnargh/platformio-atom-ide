/** @babel */

/**
 * Copyright (c) 2016-present, PlatformIO Plus <contact@pioplus.com>
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

/* eslint-disable no-constant-condition */

import * as actions from './actions';
import { call, put, take } from 'redux-saga/effects';
import AuthModal from './containers/auth-modal';
import { runAccountCommand } from './helpers';


function* watchAuthForm() {
  while (true) {
    try {
      const { formType } = yield take(actions.AUTH_FORM_REQUEST);
      const modal = new AuthModal({ formType });
      yield call(::modal.open);
    } catch (error) {
      console.error(error);
    }
  }
}

function* watchLoginRequest() {
  while (true) {
    try {
      const { username, password } = yield take(actions.LOGIN_REQUEST);
      yield call(runAccountCommand, 'login', {
        extraArgs: ['--username', username, '--password', password],
      });
      yield put(actions.loginSuccess());
    } catch (error) {
      console.error(error);
    }
  }
}

export default [
  watchAuthForm,
  watchLoginRequest,
];
