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
    logoutRequest: PropTypes.func,
  }

  render() {
    return (
      <div>
        <span className='icon icon-person'></span>
        <a className='username' onClick={ this.props.onUsernameClick }>
          { this.props.shortUsername }
        </a>
        (<a className='logout-link' onClick={ this.props.logoutRequest }>logout</a>)
      </div>);
  }
}
