/** @babel */

/**
 * Copyright (c) 2016-present, PlatformIO Plus <contact@pioplus.com>
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

import * as utils from '../utils';
import { accountLoginStatusCheckRequest, authFormOpenRequest } from './actions';
import { getStore } from '../core/store';


export function runAccountCommand(cmd, options = {}) {
  return new Promise((resolve, reject) => {
    let args = ['account', cmd];
    if (options.extraArgs) {
      args = args.concat(options.extraArgs);
    }
    utils.runPIOCommand(
      args,
      (code, stdout, stderr) => {
        if (code !== 0) {
          const error = new Error(stderr);
          return reject(error);
        }
        resolve(args.includes('--json-output') ? JSON.parse(stdout) : stdout);
      }
    );
  });
}


export function runPioAccountForgotPassword(username) {
  return runAccountCommand('forgot', {
    extraArgs: ['--username', username],
  });
}

export function runPioAccountChangePassword(oldPassword, newPassword) {
  return runAccountCommand('password', {
    extraArgs: ['--old-password', oldPassword, '--new-password', newPassword],
  });
}

export async function runPioToken(password, regenerate) {
  const extraArgs = ['--json-output', '--password', password];
  if (regenerate) {
    extraArgs.push('--regenerate');
  }
  return runAccountCommand('token', {
    extraArgs: extraArgs,
  });
}


export function openAuthModal(formType) {
  getStore().dispatch(authFormOpenRequest(formType));
}


export async function checkAuthStatusUnlessDisabled() {
  if (atom.config.get('platformio-ide.advanced.checkAuthOnStartup')) {
    getStore().dispatch(accountLoginStatusCheckRequest());
  }
}


export function getAccountStatus({ offline }) {
  const options = {
    extraArgs: ['--json-output'],
  };
  if (offline) {
    options.extraArgs.push('--offline');
  }
  return runAccountCommand('show', options);
}


export function getShortUsername(username) {
  const usernameParts = username.split('@');
  if (usernameParts && usernameParts[0]) {
    return usernameParts[0];
  }
}

export function isUsernameValid(username) {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (username && regEx.test(username)) {
    return true;
  } else {
    return false;
  }
}
