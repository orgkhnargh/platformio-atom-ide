/** @babel */

/**
 * Copyright (c) 2016-present, PlatformIO Plus <contact@pioplus.com>
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

import * as ActionTypes from './actions';


function username(state = null, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_USERNAME:
      return action.newUsername;
  }
  return state;
}


function accountInformation(state = null, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_ACCOUNT_INFORMATION:
      return action.data;
  }
  return state;
}


export default {
  username,
  accountInformation,
};
