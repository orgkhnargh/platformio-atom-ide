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
import * as utils from '../utils';

import { ACCOUNT_INFORMATION_KEY, IS_ACCOUNT_INFORMATION_UPDATE_IN_PROGRESS_KEY, IS_LOGGED_IN_KEY, LAST_USED_USERNAME_KEY } from './selectors';
import { FORGOT_FORM, LOGIN_FORM, REGISTER_FORM } from './containers/auth-container';
import { call, fork, put, take, takeEvery } from 'redux-saga/effects';
import { isUsernameValid, runAccountCommand } from './helpers';
import { updateEntity, updateError, updateFlagValue, updateInputValue } from '../core/actions';

import AuthContainer from './containers/auth-container';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { getStore } from '../core/store';


function* watchAuthForm() {
  yield takeEvery(actions.AUTH_FORM_OPEN_REQUEST, function*({ formType }) {
    try {
      const modalCompoment = (
        <Provider store={ getStore() }>
          <MemoryRouter initialEntries={ [`/auth/${formType}`] }>
            <AuthContainer />
          </MemoryRouter>
        </Provider>
      );

      yield fork(openModal, modalCompoment, actions.AUTH_FORM_CLOSE_REQUEST);
      yield take([
        actions.AUTH_FORM_CLOSE_REQUEST,
        actions.AUTH_FORM_SUCCESS,
      ]);
      yield put(actions.authFormCloseRequest());
    } catch (error) {
      console.error(error);
    }
  });
}


function* openModal(component, closeAction) {
  let panel;
  try {
    const element = document.createElement('div');
    element.classList.add('pio-template-root');

    ReactDOM.render(component, element);

    panel = atom.workspace.addModalPanel({
      item: element,
    });

    yield take(closeAction);
  } catch (error) {
    console.error(error);
  } finally {
    if (panel) {
      panel.destroy();
    }
  }
}


function* watchLoginRequest() {
  yield takeEvery(actions.LOGIN_REQUEST, function*({ username, password }) {
    try {
      if (!isUsernameValid(username)) {
        yield put(updateError(LOGIN_FORM, 'Invalid username'));
        return;
      }
      yield put(updateInputValue(LAST_USED_USERNAME_KEY, username));
      yield call(runAccountCommand, 'login', {
        extraArgs: ['--username', username, '--password', password],
      });
      yield put(updateFlagValue(IS_LOGGED_IN_KEY, true));
      yield put(actions.authFormSuccess());
      yield put(updateError(LOGIN_FORM, null));
      atom.notifications.addSuccess('You have logged in successfully');

      // Immediately request info update, which will in turn update the
      // Information  page in if it's opened.
      yield put(actions.accountInfoUpdateRequest());
    } catch (error) {
      yield put(updateError(LOGIN_FORM, error.message));
      console.error(error);
    }
  });
}


function* watchRegisterRequest() {
  yield takeEvery(actions.REGISTER_REQUEST, function*({ username }) {
    try {
      if (!isUsernameValid(username)) {
        yield put(updateError(REGISTER_FORM, 'Invalid username'));
        return;
      }
      yield put(updateInputValue(LAST_USED_USERNAME_KEY, username));
      yield call(runAccountCommand, 'register', {
        extraArgs: ['--username', username],
      });
      yield put(actions.authFormSuccess());
      yield put(updateError(REGISTER_FORM, null));
      atom.notifications.addSuccess('You have been registered successfully', {
        detail: 'Your password was sent to the email address you specified',
      });
    } catch (error) {
      yield put(updateError(REGISTER_FORM, error.message));
      console.error(error);
    }
  });
}


function* watchForgotPasswordRequest() {
  yield takeEvery(actions.FORGOT_PASSWORD_REQUEST, function*({ username }) {
    try {
      if (!isUsernameValid(username)) {
        yield put(updateError(FORGOT_FORM, 'Invalid username'));
        return;
      }
      yield put(updateInputValue(LAST_USED_USERNAME_KEY, username));
      yield call(runAccountCommand, 'forgot', {
        extraArgs: ['--username', username],
      });
      yield put(actions.authFormSuccess());
      yield put(updateError(FORGOT_FORM, null));
      atom.notifications.addSuccess('Password reset request has been sent successfully', {
        detail: 'Please check your email for instructions',
      });
    } catch (error) {
      yield put(updateError(FORGOT_FORM, error.message));
      console.error(error);
    }
  });
}


function* watchLogoutRequest() {
  while (true) {
    try {
      yield take(actions.LOGOUT_REQUEST);
      yield call(runAccountCommand, 'logout');
      yield put(updateFlagValue(IS_LOGGED_IN_KEY, false));
      atom.notifications.addSuccess('Logout Success!');
    } catch (error) {
      if (error.message.includes('not logged in')) {
        yield put(updateFlagValue(IS_LOGGED_IN_KEY, false));
        atom.notifications.addSuccess('Logout Success!');
      } else {
        utils.notifyError('Logout Failed!', error);
      }
    }
  }
}


function* watchAccountInfoUpdateRequest() {
  while (true) {
    try {
      yield take(actions.ACCOUNT_INFO_UPDATE_REQUEST);
      yield put(updateFlagValue(IS_ACCOUNT_INFORMATION_UPDATE_IN_PROGRESS_KEY, true));
      const data = yield call(runAccountCommand, 'show', {
        extraArgs: ['--json-output'],
      });
      yield put(updateEntity(ACCOUNT_INFORMATION_KEY, data));
    } catch (error) {
      console.error(error);
    } finally {
      yield put(updateFlagValue(IS_ACCOUNT_INFORMATION_UPDATE_IN_PROGRESS_KEY, false));
    }
  }
}


export default [
  watchAuthForm,
  watchLoginRequest,
  watchRegisterRequest,
  watchForgotPasswordRequest,
  watchLogoutRequest,
  watchAccountInfoUpdateRequest,
];
