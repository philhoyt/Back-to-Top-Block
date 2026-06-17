/*
 * Polyfill TextEncoder/TextDecoder for the jsdom test environment.
 *
 * react-dom/server (used to render components to static markup in unit tests)
 * requires these Web APIs, which jsdom does not provide by default.
 */
const { TextEncoder, TextDecoder } = require('util');

if (typeof global.TextEncoder === 'undefined') {
	global.TextEncoder = TextEncoder;
}

if (typeof global.TextDecoder === 'undefined') {
	global.TextDecoder = TextDecoder;
}
