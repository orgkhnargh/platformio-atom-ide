/** @babel */

/**
 * Copyright (c) 2016-present, PlatformIO Plus <contact@pioplus.com>
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

import BaseModal from '../../core/base-modal';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { getStore } from '../../core/store';


export default class ModalWithProvider extends BaseModal {

  renderComponent() {
    ReactDOM.render(
      <Provider store={ getStore() }>
        <this.component { ...this.props } onResolve={ ::this.resolve } onReject={ ::this.reject } />
      </Provider>,
      this._element
    );
  }

}
