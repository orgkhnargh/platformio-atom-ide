/** @babel */

/**
 * Copyright (c) 2016-present, PlatformIO Plus <contact@pioplus.com>
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

import * as ActionTypes from './actions';
import { FORGOT_FORM, LOGIN_FORM, REGISTER_FORM } from './containers/auth-container';


function lastUsedUsername(state = '', action) {
  switch (action.type) {
    case ActionTypes.UPDATE_LAST_USED_USERNAME:
      return action.newUsername;
  }
  return state;
}


function accountInformation(state = {}, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_ACCOUNT_INFORMATION:
      return action.data;
  }
  return state;
}


function authFormUsername(state = { [FORGOT_FORM]: '', [LOGIN_FORM]: '', [REGISTER_FORM]: '' }, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_AUTH_FORM_USERNAME:
      return {
        ...state,
        [action.formType]: {
          value: action.username,
          isValid: action.isValid,
        },
      };
  }
  return state;
}


function authFormPassword(state = '', action) {
  switch (action.type) {
    case ActionTypes.UPDATE_AUTH_FORM_PASSWORD:
      return action.password;
  }
  return state;
}


export default {
  accountInformation,
  lastUsedUsername,
  authFormUsername,
  authFormPassword,
};
