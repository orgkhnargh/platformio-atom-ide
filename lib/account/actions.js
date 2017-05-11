/** @babel */

/**
 * Copyright (c) 2016-present, PlatformIO Plus <contact@pioplus.com>
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

export const AUTH_FORM_OPEN_REQUEST = 'AUTH_FORM_OPEN_REQUEST';
export const AUTH_FORM_CLOSE_REQUEST = 'AUTH_FORM_CLOSE_REQUEST';
export const AUTH_REQUEST_IN_PROGRESS = 'AUTH_REQUEST_IN_PROGRESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';
export const UPDATE_LOGIN_ERROR = 'UPDATE_LOGIN_ERROR';
export const UPDATE_LAST_USED_USERNAME = 'UPDATE_LAST_USED_USERNAME';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const UPDATE_LOGIN_STATUS = 'UPDATE_LOGIN_STATUS';
export const ACCOUNT_INFO_UPDATE_REQUEST = 'ACCOUNT_INFO_UPDATE_REQUEST';
export const ACCOUNT_INFO_UPDATE_SUCCESS = 'ACCOUNT_INFO_UPDATE_SUCCESS';
export const ACCOUNT_INFO_UPDATE_FAILURE = 'ACCOUNT_INFO_UPDATE_FAILURE';

function action(type, payload = {}) {
  return {
    type,
    ...payload,
  };
}

export const authFormOpenRequest = (formType) => action(AUTH_FORM_OPEN_REQUEST, {
  formType,
});
export const authFormCloseRequest = () => action(AUTH_FORM_CLOSE_REQUEST);
export const authRequestInProgress = (isInProgress) => action(AUTH_REQUEST_IN_PROGRESS, {
  isInProgress,
});
export const authFailure = (formType, errorText) => action(AUTH_FAILURE, {
  formType,
  errorText,
});
export const updateLoginError = (errorText) => action(UPDATE_LOGIN_ERROR, {
  errorText,
});
export const updateLastUsedUsername = (newUsername) => action(UPDATE_LAST_USED_USERNAME, {
  newUsername,
});
export const loginRequest = (username, password) => action(LOGIN_REQUEST, {
  username,
  password,
});
export const loginSuccess = () => action(LOGIN_SUCCESS);
export const registerRequest = (username) => action(REGISTER_REQUEST, {
  username,
});
export const registerSuccess = () => action(REGISTER_SUCCESS);
export const forgotPasswordRequest = (username) => action(FORGOT_PASSWORD_REQUEST, {
  username,
});
export const forgotPasswordSuccess = () => action(FORGOT_PASSWORD_SUCCESS);
export const logoutRequest = () => action(LOGOUT_REQUEST);
export const logoutSuccess = () => action(LOGOUT_SUCCESS);
export const updateLoginStatus = (isLoggedIn) => action(UPDATE_LOGIN_STATUS, {
  isLoggedIn,
});
export const accountInfoUpdateRequest = () => action(ACCOUNT_INFO_UPDATE_REQUEST);
export const accountInfoUpdateSuccess = (data) => action(ACCOUNT_INFO_UPDATE_SUCCESS, {
  data,
});
export const accountInfoUpdateFailure = () => action(ACCOUNT_INFO_UPDATE_FAILURE);
