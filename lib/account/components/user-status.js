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
    shortUsername: PropTypes.string,
    onUsernameClick: PropTypes.func,
    onLogoutClick: PropTypes.func,
  }

  render() {
    const { shortUsername, onUsernameClick, onLogoutClick } = this.props;
    return (
      <div>
        <span className='icon icon-person'></span>
        <a className='username' onClick={ onUsernameClick }>
          { shortUsername }
        </a>
        (<a className='logout-link' onClick={ onLogoutClick }>logout</a>)
      </div>);
  }
}
