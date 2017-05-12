/** @babel */

/**
 * Copyright (c) 2016-present, PlatformIO Plus <contact@pioplus.com>
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

import { getError, getFlagValue, getInputValue } from '../core/selectors';


export const ACCOUNT_INFORMATION_KEY = 'accountInformation';
export const LAST_USED_USERNAME_KEY = 'lastUsedUsername';
export const IS_LOGGED_IN_KEY = 'isLoggedIn';
export const IS_AUTH_REQUEST_IN_PROGRESS_KEY = 'isAuthRequestInProgress';
export const IS_ACCOUNT_INFORMATION_UPDATE_IN_PROGRESS_KEY = 'isAccountInformationUpdateInProgress';


export function getAccountInformation(state) {
  return state.entities[ACCOUNT_INFORMATION_KEY] || {};
}

export function getIsLoggedIn(state) {
  return getFlagValue(state, IS_LOGGED_IN_KEY) || false;
}

export function getLastUsedUsername(state) {
  return getInputValue(state, LAST_USED_USERNAME_KEY) || '';
}

export function getIsAuthRequestInProgress(state) {
  return getFlagValue(state, IS_AUTH_REQUEST_IN_PROGRESS_KEY);
}

export function getAccountInformationUpdateInProgress(state) {
  return getFlagValue(state, IS_ACCOUNT_INFORMATION_UPDATE_IN_PROGRESS_KEY);
}

export function getAuthFormError(state, formType) {
  return getError(state, formType);
}
