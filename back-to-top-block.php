<?php
/**
 * Plugin Name:       Back To Top Block
 * Plugin URI:        https://github.com/philhoyt/Back-to-Top-Block
 * Description:       Adds a customizable Back to Top button that helps visitors return to the top of the page.
 * Requires at least: 6.6
 * Requires PHP:      7.4
 * Version:           1.0.4
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
 * @since 1.0.3
 * @param string $value The button text value.
 * @return string Sanitized button text.
 */
function sanitize_button_text( $value ) {
	return sanitize_text_field( $value );
}

/**
 * Sanitizes the icon URL attribute.
 *
 * @since 1.0.3
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
 * @since 1.0.3
 * @return void
 */
function back_to_top_block_init() {
	/**
	 * Filters the arguments used to register the Back to Top block.
	 *
	 * Attributes are defined once in block.json and must not be redefined
	 * here. Sanitization callbacks are attached via the
	 * 'block_type_metadata_settings' filter so the block.json constraints
	 * (such as maxLength and pattern) are preserved.
	 *
	 * @since 1.0.3
	 * @param array $block_args Block registration arguments.
	 */
	$block_args = apply_filters( 'back_to_top_block_args', array() );

	register_block_type( __DIR__ . '/build', $block_args );
}
add_action( 'init', __NAMESPACE__ . '\\back_to_top_block_init' );

/**
 * Attaches server-side sanitization callbacks to the block's attributes.
 *
 * Using the metadata settings filter keeps block.json as the single source
 * of truth for attribute definitions while still registering sanitizers,
 * avoiding the attribute duplication that would otherwise drop block.json
 * constraints like maxLength and pattern.
 *
 * @since 1.0.4
 * @param array $settings Block type settings derived from block.json.
 * @return array Modified settings.
 */
function back_to_top_block_metadata_settings( $settings ) {
	if ( ! isset( $settings['name'] ) || 'backtotop/back-to-top-block' !== $settings['name'] ) {
		return $settings;
	}

	if ( isset( $settings['attributes']['buttonText'] ) ) {
		$settings['attributes']['buttonText']['sanitize_callback'] = __NAMESPACE__ . '\\sanitize_button_text';
	}

	if ( isset( $settings['attributes']['iconUrl'] ) ) {
		$settings['attributes']['iconUrl']['sanitize_callback'] = __NAMESPACE__ . '\\sanitize_icon_url';
	}

	return $settings;
}
add_filter( 'block_type_metadata_settings', __NAMESPACE__ . '\\back_to_top_block_metadata_settings' );
