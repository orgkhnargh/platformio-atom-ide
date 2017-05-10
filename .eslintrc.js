module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true,
    "jasmine": true
  },
  "plugins": ["react", "redux-saga"],
  "extends": ["eslint:recommended", "plugin:react/recommended"],
  "globals": {
    "atom": true,
  },
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "rules": {
    "brace-style": ["warn", "1tbs", { "allowSingleLine": true }],
    "comma-dangle": [
      "error",
      "only-multiline"
    ],
    "curly": [
      "warn",
      "all"
    ],
    "indent": [
      "warn",
      2,
      { "SwitchCase": 1 }
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "no-console": [
      "error",
      {"allow": ["warn", "error", "debug"]},
    ],
    "object-curly-spacing": ["warn", "always"],
    "prefer-const": "error",
    "quotes": [
      "error",
      "single",
      "avoid-escape"
    ],
    "react/jsx-indent": ["warn", 2],
    "semi": [
      "error",
      "always"
    ],
    "sort-imports": [
      "warn",
      {
        "ignoreCase": false,
        "ignoreMemberSort": false,
        "memberSyntaxSortOrder": ["none", "all", "multiple", "single"]
      }
    ],
    "space-infix-ops": "warn",
  },
};
