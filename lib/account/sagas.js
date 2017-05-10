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
import { call, take } from 'redux-saga/effects';
import AuthModal from './containers/auth-modal';


function* watchAuthForm() {
  try {
    while (true) {
      const { formType } = yield take(actions.AUTH_FORM_REQUEST);
      const modal = new AuthModal({ formType });
      yield call(::modal.open);
    }
  } catch (error) {
    console.error(error);
  }
}

export default [
  watchAuthForm,
];
