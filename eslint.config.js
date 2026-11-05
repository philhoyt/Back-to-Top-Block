/*
 * ESLint flat config for Back To Top Block.
 *
 * Extends the wp-scripts default flat config (which bundles the
 * WordPress eslint-plugin recommended rules). Required for ESLint v9+,
 * which ignores the legacy .eslintrc.* format.
 */
const defaultConfig = require('@wordpress/scripts/config/eslint.config.cjs');
const jestPlugin = require('eslint-plugin-jest');

module.exports = [
	...defaultConfig,
	{
		// .claude/ holds Claude Code hook scripts copied in by /wp-setup, not plugin source.
		ignores: ['build/**', 'node_modules/**', 'vendor/**', '.claude/**'],
	},
	{
		// @wordpress/* packages are provided by WordPress at runtime and
		// externalized by webpack, so they are not installed locally. Treat
		// them as resolvable core modules for the import/* rules.
		settings: {
			'import/core-modules': [
				'@wordpress/blocks',
				'@wordpress/block-editor',
				'@wordpress/components',
				'@wordpress/element',
				'@wordpress/i18n',
				'@wordpress/url',
			],
		},
	},
	// The unit suite stays on Jest (wp-scripts test-unit-jest); the default
	// test override in @wordpress/eslint-plugin 27+ targets Vitest instead.
	{
		...jestPlugin.configs['flat/recommended'],
		files: ['src/**/test/**/*.js'],
	},
];
