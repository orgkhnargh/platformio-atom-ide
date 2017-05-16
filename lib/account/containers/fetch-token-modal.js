/** @babel */

/**
 * Copyright (c) 2016-present, PlatformIO Plus <contact@pioplus.com>
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

import BaseModal from '../../core/base-modal';
import FetchTokenModalContainer from '../containers/fetch-token-modal-container';


export default class FetchTokenModal extends BaseModal {

  get component() {
    return FetchTokenModalContainer;
  }

}
