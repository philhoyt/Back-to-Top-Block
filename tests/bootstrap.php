<?php
/**
 * PHPUnit bootstrap file.
 *
 * Loads the WordPress test suite and the plugin under test. Requires the
 * WordPress test library to be installed (for example via `wp-env` or
 * `bin/install-wp-tests.sh`); set WP_TESTS_DIR if it lives outside the
 * default temporary location.
 *
 * @package back-to-top-block
 */

$btt_tests_dir = getenv( 'WP_TESTS_DIR' );

if ( ! $btt_tests_dir ) {
	$btt_tests_dir = rtrim( sys_get_temp_dir(), '/\\' ) . '/wordpress-tests-lib';
}

$btt_functions = $btt_tests_dir . '/includes/functions.php';

if ( ! file_exists( $btt_functions ) ) {
	echo "Could not find the WordPress test suite at {$btt_tests_dir}." . PHP_EOL; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	echo 'Install it with wp-env or bin/install-wp-tests.sh, or set WP_TESTS_DIR.' . PHP_EOL;
	exit( 1 );
}

require_once $btt_functions;

/**
 * Manually loads the plugin being tested.
 *
 * @return void
 */
function btt_manually_load_plugin() {
	require dirname( __DIR__ ) . '/back-to-top-block.php';
}
tests_add_filter( 'muplugins_loaded', 'btt_manually_load_plugin' );

require $btt_tests_dir . '/includes/bootstrap.php';
