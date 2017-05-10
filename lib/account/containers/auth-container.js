/** @babel */

/**
 * Copyright (c) 2016-present, PlatformIO Plus <contact@pioplus.com>
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */


import AuthComponent from '../components/auth-component';
import PropTypes from 'prop-types';
import React from 'react';
import { authCancelled } from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export const LOGIN_FORM = 'LOGIN';
export const REGISTER_FORM = 'REGISTER';
export const FORGOT_FORM = 'FORGOT';


export class AuthContainer extends React.Component {

  static propTypes = {
    onResolve: PropTypes.func.isRequired,
    onSkipClick: PropTypes.func.isRequired,
    formType: PropTypes.string,
  }

  constructor() {
    super(...arguments);

    this.onSkipClick = ::this.onSkipClick;
  }

  onSkipClick() {
    this.props.onSkipClick();
    this.props.onResolve();
  }

  render() {
    return <AuthComponent onSkipClick={ this.onSkipClick }  />;
  }

}


function mapStateToProps() {
  return {
    // info: getAccountInformation(state),
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    onSkipClick: authCancelled,
  }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);
