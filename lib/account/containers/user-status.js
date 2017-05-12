/** @babel */

/**
 * Copyright (c) 2016-present, PlatformIO Plus <contact@pioplus.com>
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

import * as actions from '../actions';

import { getIsLoggedIn, getLastUsedUsername } from '../selectors';

import LoginLink from '../components/login-link';
import PropTypes from 'prop-types';
import React from 'react';
import UserStatus from '../components/user-status';
import { connect } from 'react-redux';
import { getShortUsername } from '../helpers';


class UserStatusContainer extends React.Component {

  static propTypes = {
    onUsernameClick: PropTypes.func.isRequired,
    onLoginClick: PropTypes.func.isRequired,
    onLogoutClick: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    shortUsername: PropTypes.string,
  }

  render() {
    if (this.props.isLoggedIn) {
      return <UserStatus {...this.props} />;
    }
    return <LoginLink {...this.props} />;
  }

}


function mapStateToProps(state) {
  return {
    isLoggedIn: getIsLoggedIn(state),
    shortUsername: getShortUsername(getLastUsedUsername(state)),
  };
}


export default connect(mapStateToProps, actions)(UserStatusContainer);
