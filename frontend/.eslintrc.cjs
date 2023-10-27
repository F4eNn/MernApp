module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "no-duplicate-imports": "error",
		"no-console": [
			"warn",
			{
				"allow": ["error"]
			}
		],
		"no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
		"no-unused-expressions": "warn",
		"quotes": ["error", "single", { "allowTemplateLiterals": true }],
		"object-shorthand": "error",
		"react-hooks/exhaustive-deps": "error",
		"no-multi-spaces": "warn",
		"no-else-return": "error",
		"no-empty": "error",
		"import/order": [
			"error",
			{
				"newlines-between": "always",
				"groups": [
					["builtin", "external"],
					["internal", "parent", "sibling", "index"]
				]
			}
		]
  },
}
