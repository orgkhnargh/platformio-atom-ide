/** @babel */

/**
 * Copyright (c) 2016-present, PlatformIO Plus <contact@pioplus.com>
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

import fs from 'fs-plus';
import path from 'path';


export const ATOM_CONFIG = {
  showPIOHome: {
    title: 'Show PlatformIO Home on startup',
    type: 'boolean',
    default: true,
    order: 0
  },
  highlightActiveProject: {
    title: 'Highlight active project',
    type: 'boolean',
    default: true,
    order: 10
  },
  autoUpdateIDE: {
    title: 'Automatically Update PlatformIO IDE',
    type: 'boolean',
    default: true,
    order: 15
  },
  autoCloseSerialMonitor: {
    title: 'Automatically close Serial Port Monitor before uploading',
    description: '',
    type: 'boolean',
    default: true,
    order: 20
  },
  autoRebuildAutocompleteIndex: {
    title: 'Automatically rebuild C/C++ Project Index',
    description: 'Rebuild C/C++ Project Index (Intelligent Code Completion, ' +
      'Smart Code Linter) when new libraries are added or [platformio.ini](http://docs.platformio.org/page/projectconf.html) is modified',
    type: 'boolean',
    default: true,
    order: 30
  },
  useBuiltinPIOCore: {
    title: 'Use built-in PlatformIO Core',
    description: 'PlatformIO IDE has built-in [PlatformIO Core](http://docs.platformio.org/en/latest/core.html) ' +
      'and depends on it. Uncheck this option (NOT RECOMMENDED) to use own version of ' +
      'installed PlatformIO Core (it should be located in the system `PATH`)',
    type: 'boolean',
    default: true,
    order: 40
  },
  advanced: {
    type: 'object',
    title: 'Advanced',
    order: 50,
    properties: {
      showPlatformIOFiles: {
        title: 'Show PlatformIO service files',
        description: 'Do not hide in `Tree View` PlatformIO service files and ' +
          'directories (`.pioenvs`, `.piolibdeps`, other configuration files)',
        type: 'boolean',
        default: false,
        order: 0
      },
      useDevelopmentIDE: {
        title: 'Use development version of PlatformIO IDE',
        description: '[Git](https://git-scm.com/downloads) should be installed in a system.',
        type: 'boolean',
        default: false,
        order: 5
      },
      useDevelopmentPIOCore: {
        title: 'Use development version of PlatformIO Core',
        description: 'This option is valid when "Use built-in PlatformIO Core" is enabled. ' +
        'To upgrade to the latest development version, please use ' +
        '`Menu: PlatformIO > Upgrade PlatformIO Core`.',
        type: 'boolean',
        default: false,
        order: 10
      },
      customLibraryStorages: {
        title: 'Custom Library Storages',
        description: 'Specify folder path to custom library storage. ' +
          'You will be able to list installed libraries, check updates or install ' +
          'new libraries. Multiple paths are allowed, separate them with `, ` (comma + space)',
        type: 'string',
        default: '',
        order: 20
      },
      customPATH: {
        title: 'Custom PATH for `platformio` command',
        description: 'Paste here the result of `echo $PATH` (Unix) / `echo %PATH%` ' +
          '(Windows) command by typing into your system terminal ' +
          'if you prefer to use custom version of PlatformIO Core',
        type: 'string',
        default: '',
        order: 30
      },
      checkAuthOnStartup: {
        title: 'Check PIO Account authentication status on IDE startup',
        description: 'If the user is not logged in, a login form will be displayed.',
        type: 'boolean',
        default: true,
        order: 40
      },
    }
  }
};

export const IS_WINDOWS = process.platform.startsWith('win');
export const PKG_BASE_DIR = path.resolve(path.dirname(__filename), '..');
export const CACHE_DIR = path.join(PKG_BASE_DIR, '.cache');
export const PIO_HOME_DIR = _getPioHomeDir(process.env.PLATFORMIO_HOME_DIR || path.join(fs.getHomeDirectory(), '.platformio'));
export const ENV_DIR = path.join(PIO_HOME_DIR, 'penv');
export const ENV_BIN_DIR = path.join(ENV_DIR, IS_WINDOWS ? 'Scripts' : 'bin');

export const ATOM_DEPENDENCIES = {
  'build': {
    requirements: '>=0.56.0',
    required: true
  },
  'busy': {
    requirements: '>=0.1.0',
    required: true
  },
  'platformio-ide-terminal': {
    requirements: '>=2.5.0'
  },
  'platformio-ide-debugger': {
    requirements: '>=1.1.0'
  },
  'autocomplete-clang': {
    requirements: '>=0.11.3'
  },
  'linter-ui-default': {
    requirements: '>=1.1.0'
  },
  'intentions': {
    requirements: '>=1.1.2'
  },
  'linter': {
    // forceVersion: '1.11.23',
    requirements: '>=1.11.3'
  },
  'linter-gcc': {
    requirements: '>=0.6.5'
  },
  'language-ini': {
    requirements: '>=1.14.0'
  },
  'tool-bar': {
    requirements: '>=0.2.0'
  },
  'file-icons': {
    requirements: '>=1.7'
  },
  'minimap': {
    requirements: '>=4'
  }
};
export const ATOM_CONFLICTED_DEPENDENCIES = {
  'build-platformio': {
    requirements: '*'
  },
  'busy-signal': {
    requirements: '*'
  }
};

export const PIO_CORE_MIN_VERSION = '3.4.0-b.1';
export const DEFAULT_PIO_ARGS = ['-f', '-c', 'atom'];
export const TERMINAL_REOPEN_DELAY = 1000; // ms, dalay before serial monitor restore
export const AUTO_REBUILD_DELAY = 3000; // ms
export const INPUT_FILTER_DELAY = 200; // ms, dalay before filtering projects, libs, platorms

export const PLATFORMIO_API_ENDPOINT = 'http://api.platformio.org';

function _getPioHomeDir(pioHomeDir) {
  if (IS_WINDOWS) {
    // Make sure that all path characters have valid ASCII codes.
    for (const char of pioHomeDir) {
      if (char.charCodeAt(0) > 127) {
        // If they don't, put the pio home directory into the root of the disk.
        const homeDirPathFormat = path.parse(pioHomeDir);
        return path.format({
          root: homeDirPathFormat.root,
          dir: homeDirPathFormat.root,
          base: '.platformio',
          name: '.platformio',
        });
      }
    }
  }
  return pioHomeDir;
}
