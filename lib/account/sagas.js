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
import * as selectors from './selectors';
import * as utils from '../utils';

import { FORGOT_FORM, LOGIN_FORM, REGISTER_FORM } from './containers/auth-container';
import { call, fork, put, race, select, take, takeEvery } from 'redux-saga/effects';
import { deleteEntity, deleteError, updateEntity, updateError, updateFlagValue, updateInputValue } from '../core/actions';
import { isUsernameValid, runAccountCommand, runPioAccountChangePassword, runPioToken } from './helpers';

import AuthContainer from './containers/auth-container';
import { CompositeDisposable } from 'atom';
import FetchTokenFormContainer from './containers/fetch-token-form-container';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { channel } from 'redux-saga';
import { getIsLoggedIn } from './selectors';
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

      yield fork(openModal, modalCompoment, actions.AUTH_FORM_CLOSE_REQUEST, actions.authFormCloseRequest);

      const { success } = yield race({
        success: take(actions.AUTH_FORM_SUCCESS),
        cancel: take(actions.AUTH_FORM_CLOSE_REQUEST),
      });

      if (success) {
        yield put(actions.authFormCloseRequest());
      }
    } catch (error) {
      console.error(error);
    }
  });
}

function* openModal(component, closeAction, closeActionCreator) {
  let panel;
  const subscriptions = new CompositeDisposable();
  try {
    const element = document.createElement('div');
    element.classList.add('pio-template-root');

    ReactDOM.render(component, element);

    panel = atom.workspace.addModalPanel({
      item: element,
    });

    const panelInvisibleChannel = yield call(channel);
    subscriptions.add(panel.onDidChangeVisible((visible) => !visible && panelInvisibleChannel.put('PANEL_BECAME_INVISIBLE')));

    const panelDestroyedChannel = yield call(channel);
    subscriptions.add(panel.onDidDestroy(() => panelDestroyedChannel.put('PANEL_DESTROYED')));

    subscriptions.add(atom.commands.add('atom-workspace', {
      'core:cancel': () => panel.destroy(),
    }));

    // `coseAction` may be fired externally (e.g., when user clicks `Cancel`
    // on a modal).
    const { visibleChanged, panelDestroyed } = yield race({
      closedByExternalAction: take(closeAction),
      visibleChanged: take(panelInvisibleChannel),
      panelDestroyed: take(panelDestroyedChannel),
    });

    // If `closeAction` wasn't fired but the panel bacame invisible or was
    // destroyed externally, we have to dispatch `closeAction` here in order to
    // unblock sagas that may be waiting for it.
    if (visibleChanged || panelDestroyed) {
      yield put(closeActionCreator());
    }

  } catch (error) {
    console.error(error);
  } finally {
    if (panel) {
      panel.destroy();
    }
    subscriptions.dispose();
  }
}

function* watchLoginRequest() {
  yield takeEvery(actions.LOGIN_REQUEST, function*({ username, password }) {
    try {
      if (!isUsernameValid(username)) {
        yield put(updateError(LOGIN_FORM, 'Invalid username'));
        return;
      }
      if (!password) {
        yield put(updateError(LOGIN_FORM, 'Password cannot be empty'));
        return;
      }
      yield put(updateFlagValue(selectors.IS_AUTH_REQUEST_IN_PROGRESS_KEY, true));
      yield put(updateInputValue(selectors.LAST_USED_USERNAME_KEY, username));
      yield call(runAccountCommand, 'login', {
        extraArgs: ['--username', username, '--password', password],
      });
      yield put(updateFlagValue(selectors.IS_LOGGED_IN_KEY, true));
      yield put(actions.authFormSuccess());
      yield put(deleteError(LOGIN_FORM));
      yield put(updateFlagValue(selectors.IS_AUTH_REQUEST_IN_PROGRESS_KEY, false));
      atom.notifications.addSuccess('You have logged in successfully');

      // Immediately request info update, which will in turn update the
      // Information  page in if it's opened.
      yield put(actions.accountInfoUpdateRequest());
    } catch (error) {
      yield put(updateError(LOGIN_FORM, error.message));
      console.error(error);
    } finally {
      yield put(updateFlagValue(selectors.IS_AUTH_REQUEST_IN_PROGRESS_KEY, false));
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
      yield put(updateFlagValue(selectors.IS_AUTH_REQUEST_IN_PROGRESS_KEY, true));
      yield put(updateInputValue(selectors.LAST_USED_USERNAME_KEY, username));
      yield call(runAccountCommand, 'register', {
        extraArgs: ['--username', username],
      });
      yield put(actions.authFormSuccess());
      yield put(deleteError(REGISTER_FORM));
      atom.notifications.addSuccess('You have been registered successfully', {
        detail: 'Your password was sent to the email address you specified',
      });
    } catch (error) {
      yield put(updateError(REGISTER_FORM, error.message));
      console.error(error);
    } finally {
      yield put(updateFlagValue(selectors.IS_AUTH_REQUEST_IN_PROGRESS_KEY, false));
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
      yield put(updateFlagValue(selectors.IS_AUTH_REQUEST_IN_PROGRESS_KEY, true));
      yield put(updateInputValue(selectors.LAST_USED_USERNAME_KEY, username));
      yield call(runAccountCommand, 'forgot', {
        extraArgs: ['--username', username],
      });
      yield put(actions.authFormSuccess());
      yield put(deleteError(FORGOT_FORM));
      atom.notifications.addSuccess('Password reset request has been sent successfully', {
        detail: 'Please check your email for instructions',
      });
    } catch (error) {
      yield put(updateError(FORGOT_FORM, error.message));
      console.error(error);
    } finally {
      yield put(updateFlagValue(selectors.IS_AUTH_REQUEST_IN_PROGRESS_KEY, false));
    }
  });
}

function* watchLogoutRequest() {
  while (true) {
    try {
      yield take(actions.LOGOUT_REQUEST);
      yield call(runAccountCommand, 'logout');
      yield put(updateFlagValue(selectors.IS_LOGGED_IN_KEY, false));
      atom.notifications.addSuccess('Logout Success!');
    } catch (error) {
      if (error.message.includes('not logged in')) {
        yield put(updateFlagValue(selectors.IS_LOGGED_IN_KEY, false));
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
      yield put(deleteEntity(/^accountInformation/));
      const data = yield call(runAccountCommand, 'show', {
        extraArgs: ['--json-output'],
      });
      yield put(updateEntity(selectors.ACCOUNT_INFORMATION_KEY, data));
      if (data && data.username) {
        yield put(updateFlagValue(selectors.IS_LOGGED_IN_KEY, true));
        yield put(updateInputValue(selectors.LAST_USED_USERNAME_KEY, data.username));
      }
    } catch (error) {
      console.error(error);
    } finally {
      yield put(actions.accountInfoUpdateCompleted());
    }
  }
}

function* watchAccountLoginStatusCheckRequest() {
  while (true) {
    try {
      yield take(actions.ACCOUNT_LOGIN_STATUS_CHECK_REQUEST);
      yield put(actions.accountInfoUpdateRequest());

      yield take(actions.ACCOUNT_INFO_UPDATE_COMPLETED);

      const isLoggedIn = yield select(getIsLoggedIn);
      if (!isLoggedIn) {
        yield put(actions.authFormOpenRequest(LOGIN_FORM));
      }
    } catch (error) {
      console.error(error);
    }
  }
}

function* watchTokenFetchFormOpenRequest() {
  while (true) {
    try {
      const { regenerate } = yield take(actions.TOKEN_FETCH_FORM_OPEN_REQUEST);

      const modalCompoment = (
        <Provider store={ getStore() }>
          <FetchTokenFormContainer regenerate={ regenerate } />
        </Provider>
      );

      yield fork(openModal, modalCompoment, actions.TOKEN_FETCH_FORM_CLOSE_REQUEST, actions.tokenFetchFormCloseRequest);

      const { success } = yield race({
        success: take(actions.TOKEN_FETCH_SUCCESS),
        cancel: take(actions.TOKEN_FETCH_FORM_CLOSE_REQUEST),
      });

      if (success) {
        yield put(actions.tokenFetchFormCloseRequest());
      }
    } catch (error) {
      console.error(error);
    } finally {
      yield put(deleteError(/^fetchToken/));
    }
  }
}

function* watchTokenFetchRequest() {
  while (true) {
    try {
      const { password, regenerate } = yield take(actions.TOKEN_FETCH_REQUEST);

      yield put(updateFlagValue(selectors.IS_TOKEN_FETCH_IN_PROGRESS_KEY, true));
      const { status, result } = yield call(runPioToken, password, regenerate);
      if (status === 'success') {
        yield put(updateEntity(selectors.TOKEN_KEY, result));
        yield put(actions.tokenFetchSuccess());
        const verb = regenerate ? 'regenerated' : 'fetched';
        atom.notifications.addSuccess(`Token has been ${verb} successfully.`);
      }
    } catch (error) {
      yield put(updateError(selectors.FETCH_TOKEN_ERROR_KEY, error.message));
      console.error(error);
    } finally {
      yield put(updateFlagValue(selectors.IS_TOKEN_FETCH_IN_PROGRESS_KEY, false));
    }
  }
}

function* watchPasswordChangeRequest() {
  while (true) {
    try {
      const { oldPassword, newPassword } = yield take(actions.PASSWORD_CHANGE_REQUEST);

      yield put(updateFlagValue(selectors.IS_PASSWORD_CHANGE_IN_PROGRESS_KEY, true));
      yield call(runPioAccountChangePassword, oldPassword, newPassword);
      atom.notifications.addSuccess('Password has been changed successfully!');
    } catch (error) {
      utils.notifyError('Failed to change password', error);
    } finally {
      yield put(updateFlagValue(selectors.IS_PASSWORD_CHANGE_IN_PROGRESS_KEY, false));
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
  watchAccountLoginStatusCheckRequest,
  watchTokenFetchFormOpenRequest,
  watchTokenFetchRequest,
  watchPasswordChangeRequest,
];
