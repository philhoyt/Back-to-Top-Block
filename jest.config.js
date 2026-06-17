/*
 * Jest config for unit tests.
 *
 * Extends the @wordpress/scripts default unit-test config and adds a setup
 * file that polyfills TextEncoder/TextDecoder for react-dom/server.
 */
const defaultConfig = require('@wordpress/scripts/config/jest-unit.config.js');

module.exports = {
	...defaultConfig,
	setupFiles: [
		...(defaultConfig.setupFiles || []),
		'<rootDir>/jest.setup.js',
	],
};
