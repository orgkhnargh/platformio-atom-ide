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
export const AUTH_FORM_SUCCESS = 'AUTH_FORM_SUCCESS';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const ACCOUNT_INFO_UPDATE_REQUEST = 'ACCOUNT_INFO_UPDATE_REQUEST';

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
export const authFormSuccess = () => action(AUTH_FORM_SUCCESS);
export const loginRequest = (username, password) => action(LOGIN_REQUEST, {
  username,
  password,
});
export const registerRequest = (username) => action(REGISTER_REQUEST, {
  username,
});
export const forgotPasswordRequest = (username) => action(FORGOT_PASSWORD_REQUEST, {
  username,
});
export const logoutRequest = () => action(LOGOUT_REQUEST);
export const accountInfoUpdateRequest = () => action(ACCOUNT_INFO_UPDATE_REQUEST);
