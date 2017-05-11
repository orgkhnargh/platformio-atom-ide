/** @babel */

/**
 * Copyright (c) 2016-present, PlatformIO Plus <contact@pioplus.com>
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

import { authFormOpenRequest, logoutRequest } from '../actions';
import { getIsLoggedIn, getLastUsedUsername } from '../selectors';
import { LOGIN_FORM } from '../containers/auth-container';
import LoginLink from '../components/login-link';
import PropTypes from 'prop-types';
import React from 'react';
import UserStatus from '../components/user-status';
import { bindActionCreators } from 'redux';
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
      const { shortUsername, onUsernameClick, onLogoutClick } = this.props;
      return <UserStatus shortUsername={ shortUsername } onUsernameClick={ onUsernameClick } onLogoutClick={ onLogoutClick } />;
    }
    return <LoginLink onClick={ this.props.onLoginClick } />;
  }

}


function mapStateToProps(state) {
  return {
    isLoggedIn: getIsLoggedIn(state),
    shortUsername: getShortUsername(getLastUsedUsername(state)),
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    onLoginClick: () => authFormOpenRequest(LOGIN_FORM),
    onLogoutClick: logoutRequest,
  }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(UserStatusContainer);
