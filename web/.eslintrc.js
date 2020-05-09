module.exports = {
    // Specifies the ESLint parser
    parser: "@typescript-eslint/parser", 
    parserOptions: {
    // Allows for the parsing of modern ECMAScript features
      ecmaVersion: 2020,
      // Allows for the use of imports
      sourceType: "module",
      ecmaFeatures: {
        // Allows for parsing of JSX
        jsx: true
      },
      settings: {
          react: {
              // Tells eslint-plugin-react to automatically detect the version of React to use
              version: "detect"
          }
      }
    },
  
    extends: [
        // Uses the recommended rules from @eslint-plugin-react
        "plugin:react/recommended",
        // Uses the recommended rules from the @typescript-eslint/eslint-plugin
        "plugin:@typescript-eslint/recommended"
    ],
  
    rules: {
        // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
        // e.g. "@typescript-eslint/explicit-function-return-type": "off",
        maxLen: {
            code: 80,
            tabWidth: 2
        }
    }
};