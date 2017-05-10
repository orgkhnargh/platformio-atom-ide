/** @babel */

/**
 * Copyright (c) 2016-present, PlatformIO Plus <contact@pioplus.com>
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

export const AUTH_FORM_REQUEST = 'AUTH_FORM_REQUEST';
export const UPDATE_USERNAME = 'UPDATE_USERNAME';
export const UPDATE_ACCOUNT_INFORMATION = 'UPDATE_ACCOUNT_INFORMATION';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';

function action(type, payload = {}) {
  return { type, ...payload };
}

export const authFormRequest = (formType) => action(AUTH_FORM_REQUEST, { formType });
export const updateUsername = (newUsername) => action(AUTH_FORM_REQUEST, { newUsername });
export const updateAccountInformation = (data) => action(UPDATE_ACCOUNT_INFORMATION, { data });
export const loginRequest = (username, password) => action(LOGIN_REQUEST, { username, password });
