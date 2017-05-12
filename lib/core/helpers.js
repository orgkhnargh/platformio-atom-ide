/** @babel */

/**
 * Copyright (c) 2016-present, PlatformIO Plus <contact@pioplus.com>
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

import Telemetry from '../telemetry';


export function goTo(history, path, state) {
  if (history.length) {
    const lastEntry = history.entries[history.index];
    if (lastEntry.pathname === path && JSON.stringify(lastEntry.state) === JSON.stringify(state)) {
      return history.replace(path, state);
    }
  }
  history.push(path, state);
  Telemetry.hitScreenView(path);
  console.debug(history);
}
