/** @babel */

/**
 * Copyright (c) 2016-present, PlatformIO Plus <contact@pioplus.com>
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

export const AUTH_FORM_REQUEST = 'AUTH_FORM_REQUEST';
export const AUTH_CANCELLED = 'AUTH_CANCELLED';
export const UPDATE_LAST_USED_USERNAME = 'UPDATE_LAST_USED_USERNAME';
export const UPDATE_AUTH_FORM_USERNAME = 'UPDATE_AUTH_FORM_USERNAME';
export const UPDATE_AUTH_FORM_PASSWORD = 'UPDATE_AUTH_FORM_PASSWORD';
export const UPDATE_ACCOUNT_INFORMATION = 'UPDATE_ACCOUNT_INFORMATION';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

function action(type, payload = {}) {
  return { type, ...payload };
}

export const authFormRequest = (formType) => action(AUTH_FORM_REQUEST, { formType });
export const authCancelled = () => action(AUTH_CANCELLED);
export const updateLastUsedUsername = (newUsername) => action(AUTH_FORM_REQUEST, { newUsername });
export const updateAuthFormUsername = (formType, username, isValid) => action(UPDATE_AUTH_FORM_USERNAME, { formType, username, isValid });
export const updateAuthFormPassword = (password) => action(UPDATE_AUTH_FORM_PASSWORD, { password });
export const updateAccountInformation = (data) => action(UPDATE_ACCOUNT_INFORMATION, { data });
export const loginRequest = (username, password) => action(LOGIN_REQUEST, { username, password });
export const loginSuccess = () => action(LOGIN_SUCCESS);
