/*
 * ESLint flat config for Back To Top Block.
 *
 * Extends the wp-scripts default flat config (which bundles the
 * WordPress eslint-plugin recommended rules). Required for ESLint v9+,
 * which ignores the legacy .eslintrc.* format.
 */
const defaultConfig = require('@wordpress/scripts/config/eslint.config.cjs');

module.exports = [
	...defaultConfig,
	{
		ignores: ['build/**', 'node_modules/**', 'vendor/**'],
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
];
