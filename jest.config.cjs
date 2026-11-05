/*
 * Jest configuration.
 *
 * `@wordpress/scripts` 36 moved test-unit-js to Vitest and stopped shipping
 * Jest defaults. This keeps the existing Jest suite on the published
 * WordPress preset, per the scripts package's vitest-migration guide
 * ("Keep an existing Jest suite"), and adds a setup file that polyfills
 * TextEncoder/TextDecoder for react-dom/server.
 */
const preset = require('@wordpress/jest-preset-default/jest-preset');

module.exports = {
	preset: '@wordpress/jest-preset-default',
	transform: {
		'\\.[jt]sx?$': [
			'babel-jest',
			{ presets: ['@wordpress/babel-preset-default'] },
		],
	},
	setupFiles: [...preset.setupFiles, '<rootDir>/jest.setup.js'],
};
