/** @babel */

/**
 * Copyright (c) 2016-present, PlatformIO Plus <contact@pioplus.com>
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

import { LOGIN_FORM } from '../containers/auth-container';
import PropTypes from 'prop-types';
import React from 'react';


export default class UserStatus extends React.Component {
  static propTypes = {
    authFormOpenRequest: PropTypes.func.isRequired,
  }

  constructor() {
    super(...arguments);

    this.onClick = ::this.onClick;
  }

  onClick() {
    this.props.authFormOpenRequest(LOGIN_FORM);
  }

  render() {
    return <a onClick={ this.onClick }>Log in to PlatformIO</a>;
  }
}
