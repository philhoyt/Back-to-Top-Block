<?php
/**
 * Plugin Name:       Back To Top Block
 * Plugin URI:        https://github.com/philhoyt/Back-to-Top-Block
 * Description:       Adds a customizable Back to Top button that helps visitors return to the top of the page.
 * Requires at least: 6.6
 * Requires PHP:      7.4
 * Version:           1.0.2
 * Author:            Phil Hoyt
 * Author URI:        https://philhoyt.com
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       back-to-top-block
 *
 * @package back-to-top-block
 */

namespace BackToTopBlock;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Sanitizes the button text attribute.
 *
 * @since 1.0.2
 * @param string $value The button text value.
 * @return string Sanitized button text.
 */
function sanitize_button_text( $value ) {
	return sanitize_text_field( $value );
}

/**
 * Sanitizes the icon URL attribute.
 *
 * @since 1.0.2
 * @param string $value The icon URL value.
 * @return string Sanitized icon URL.
 */
function sanitize_icon_url( $value ) {
	// Only allow URLs from WordPress media library or same origin.
	$url = esc_url_raw( $value );

	// If URL is empty, return empty string.
	if ( empty( $url ) ) {
		return '';
	}

	// Allow relative URLs (media library uploads).
	if ( strpos( $url, '/' ) === 0 ) {
		return $url;
	}

	// Allow URLs from the same origin (current site).
	$site_url    = site_url();
	$parsed_site = wp_parse_url( $site_url );
	$parsed_url  = wp_parse_url( $url );

	// If same host, allow it.
	if ( isset( $parsed_site['host'] ) && isset( $parsed_url['host'] ) ) {
		if ( $parsed_site['host'] === $parsed_url['host'] ) {
			return $url;
		}
	}

	// Otherwise, reject external URLs for security.
	return '';
}

/**
 * Registers the Back to Top block type.
 *
 * This function is called during WordPress initialization to register
 * the Back to Top block using the compiled assets from the build directory.
 *
 * @since 1.0.2
 * @return void
 */
function back_to_top_block_init() {
	$block_args = array(
		'attributes' => array(
			'showIcon'   => array(
				'type'    => 'boolean',
				'default' => true,
			),
			'showText'   => array(
				'type'    => 'boolean',
				'default' => true,
			),
			'buttonText' => array(
				'type'              => 'string',
				'default'           => 'Back to Top',
				'sanitize_callback' => __NAMESPACE__ . '\\sanitize_button_text',
			),
			'iconUrl'    => array(
				'type'              => 'string',
				'default'           => '',
				'sanitize_callback' => __NAMESPACE__ . '\\sanitize_icon_url',
			),
		),
	);

	/**
	 * Filters the arguments used to register the Back to Top block.
	 *
	 * @since 1.0.2
	 * @param array $block_args Block registration arguments.
	 */
	$block_args = apply_filters( 'back_to_top_block_args', $block_args );

	register_block_type( __DIR__ . '/build', $block_args );
}
add_action( 'init', __NAMESPACE__ . '\\back_to_top_block_init' );
