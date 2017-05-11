/** @babel */

/**
 * Copyright (c) 2016-present, PlatformIO Plus <contact@pioplus.com>
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';


export default class UserStatus extends React.Component {
  static propTypes = {
    onClick: PropTypes.func,
  }

  render() {
    return <a onClick={ this.props.onClick }>Log in to PlatformIO</a>;
  }
}
