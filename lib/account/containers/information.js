/** @babel */

/**
 * Copyright (c) 2016-present, PlatformIO Plus <contact@pioplus.com>
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

import { LOGIN_FORM, REGISTER_FORM } from '../containers/auth-container';
import AccountInfo from '../components/info';
import PropTypes from 'prop-types';
import React from 'react';
import { authFormRequest } from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getAccountInformation } from '../selectors';


class InformationPage extends React.Component {

  static propTypes = {
    onLoginClick: PropTypes.func.isRequired,
    onCreateAccountClick: PropTypes.func.isRequired,
    info: PropTypes.object,
  }

  render() {
    if (this.props.info) {
      return <AccountInfo data={ this.props.info } />;
    } else {
      const { onLoginClick, onCreateAccountClick } = this.props;
      return (
        <div>
          <ul className='block background-message text-center'>
            <li>
              You are not logged in!
            </li>
          </ul>
          <div className='row'>
            <div className='col-xs text-right'>
              <button onClick={ onLoginClick } className='btn btn-primary btn-lg'>
                Log in to PlatformIO
              </button>
            </div>
            <div className='col-xs text-left'>
              <button onClick={ onCreateAccountClick } className='btn btn-primary btn-lg'>
                Create a Free Account
              </button>
            </div>
          </div>
        </div>);
    // } else {
    //   return (
    //     <ul className='background-message text-center'>
    //       <li>
    //         <span className='loading loading-spinner-small inline-block'></span> Loading...
    //       </li>
    //     </ul>);
    }
  }

}


function mapStateToProps(state) {
  return {
    info: getAccountInformation(state),
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    onLoginClick: () => authFormRequest(LOGIN_FORM),
    onCreateAccountClick: () => authFormRequest(REGISTER_FORM),
  }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(InformationPage);
