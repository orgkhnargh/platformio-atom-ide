/** @babel */

/**
 * Copyright (c) 2016-present, PlatformIO Plus <contact@pioplus.com>
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

import * as ActionTypes from './actions';


function isLoggedIn(state = false, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_LOGIN_STATUS:
      return action.isLoggedIn;
    case ActionTypes.LOGIN_SUCCESS:
      return true;
    case ActionTypes.LOGOUT_SUCCESS:
      return false;
  }
  return state;
}


function lastUsedUsername(state = '', action) {
  switch (action.type) {
    case ActionTypes.UPDATE_LAST_USED_USERNAME:
      return action.newUsername;
  }
  return state;
}


function accountInformation(state = {}, action) {
  switch (action.type) {
    case ActionTypes.ACCOUNT_INFO_UPDATE_SUCCESS:
      return action.data;
  }
  return state;
}

function accountInformationUpdateInProgress(state = false, action) {
  switch (action.type) {
    case ActionTypes.ACCOUNT_INFO_UPDATE_REQUEST:
      return true;
    case ActionTypes.ACCOUNT_INFO_UPDATE_SUCCESS:
    case ActionTypes.ACCOUNT_INFO_UPDATE_FAILURE:
      return false;
  }
  return state;
}


function isAuthRequestInProgress(state = false, action) {
  switch (action.type) {
    case ActionTypes.AUTH_REQUEST_IN_PROGRESS:
      return action.isInProgress;
  }
  return state;
}


function authFormErrors(state = {}, action) {
  switch (action.type) {
    case ActionTypes.AUTH_FAILURE:
      return {
        ...state,
        [action.formType]: action.errorText,
      };

    case ActionTypes.LOGOUT_SUCCESS:
    case ActionTypes.REGISTER_SUCCESS:
    case ActionTypes.FORGOT_PASSWORD_SUCCESS:
      return {};
  }
  return state;
}


export default {
  accountInformation,
  accountInformationUpdateInProgress,
  lastUsedUsername,
  isAuthRequestInProgress,
  isLoggedIn,
  authFormErrors,
};
