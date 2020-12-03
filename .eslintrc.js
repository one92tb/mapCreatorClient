module.exports = {
  env: {
    browser: true,
    jest: true
  },
  extends: 'airbnb',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
  },
  plugins: [
    'react',
    'testing-library',
    'jsx-a11y',
    'import',
    'react-hooks',
    'flowtype'
  ],
  rules: {
    /* JSX */
    'comma-dangle': 0,
    'react/jsx-uses-vars': 1,
    'react/display-name': 1,
    'no-unused-vars': 'warn',
    'no-console': 1,
    'no-unexpected-multiline': 'warn',
    'linebreak-style': 0,
    'import/no-named-as-default': 0,
    'import/prefer-default-export': 0,
    'react/jsx-props-no-spreading': 0,
    'no-shadow': 0,
    'jsx-quotes': [2, 'prefer-single'],
    'no-nested-ternary': 0,
    'react/jsx-one-expression-per-line': 'off',
    'no-plusplus': 'off',
    'no-param-reassign': [2, { props: false }],
    'react/prop-types': 0,
    'react/default-props-match-prop-types': 0,
    'no-unused-expressions': 0,
    'react/no-did-update-set-state': 0,
    'max-len': [2, 125, 4, { ignoreUrls: true }],
    'react/jsx-fragments': 0,
    'react/no-access-state-in-setstate': 0,
    'no-underscore-dangle': 0,
    'no-return-assign': 0,
    'consistent-return': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'import/no-extraneous-dependencies': 0,
  }
};
