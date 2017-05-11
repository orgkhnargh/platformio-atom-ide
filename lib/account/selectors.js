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


export function getLastUsedUsername(state) {
  return state.lastUsedUsername;
}


export function getIsAuthRequestInProgress(state) {
  return state.isAuthRequestInProgress;
}


export function getAccountInformationUpdateInProgress(state) {
  return state.accountInformationUpdateInProgress;
}


export function getAuthFormError(state, formType) {
  return state.authFormErrors[formType];
}
