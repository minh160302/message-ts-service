module.exports = {
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: "module" // Allows for the use of imports
  },
  extends: [
    "plugin:@typescript-eslint/recommended", // Uses the recommended rules from the @typescript-eslint/eslint-plugin
  ],
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
  "@typescript-eslint/explicit-function-return-type": "off",
  '@typescript-eslint/no-var-requires': 'off',
  '@typescript-eslint/no-unused-vars': 'off',
  '@typescript-eslint/no-explicit-any': 'off',
  "@typescript-eslint/no-empty-function": "off",
  "@typescript-eslint/explicit-module-boundary-types": "off",
  }
};

// module.exports = {
//   root: true, // Make sure eslint picks up the config at the root of the directory
//   parserOptions: {
//       ecmaVersion: 2020, // Use the latest ecmascript standard
//       sourceType: 'module', // Allows using import/export statements
//       ecmaFeatures: {
//           jsx: true // Enable JSX since we're using React
//       }
//   },
//   settings: {
//       react: {
//           version: 'detect' // Automatically detect the react version
//       }
//   },
//   env: {
//       browser: true, // Enables browser globals like window and document
//       amd: true, // Enables () and define() as global variables as per the amd spec.
//       node: true // Enables Node.js global variables and Node.js scoping.
//   },
//   extends: [
//       'eslint:recommended',
//       'plugin:react/recommended',
//       'plugin:jsx-a11y/recommended',
//       'plugin:prettier/recommended' // Make this the last element so prettier config overrides other formatting rules
//   ],
//   rules: {
//       'prettier/prettier': ['error', {}, { usePrettierrc: true }, { "endOfLine": "auto" }], // Use our .prettierrc file as source
//       'react/react-in-jsx-scope': 'off',
//       'jsx-a11y/anchor-is-valid': [
//           'error',
//           {
//               components: ['Link'],
//               specialLink: ['hrefLeft', 'hrefRight'],
//               aspects: ['invalidHref', 'preferButton']
//           }
//       ]
//   }
// };
