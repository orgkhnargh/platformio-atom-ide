/** @babel */

/**
 * Copyright (c) 2016-present, PlatformIO Plus <contact@pioplus.com>
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

export function getIsLoggedIn(state) {
  return state.isLoggedIn;
}


export function getAccountInformation(state) {
  return state.accountInformation;
}

export function getAuthFormUsername(state, formType) {
  return state.authFormUsername[formType];
}

export function getAuthFormPassword(state) {
  return state.authFormPassword;
}

export function getLastUsedUsername(state) {
  return state.lastUsedUsername;
}
