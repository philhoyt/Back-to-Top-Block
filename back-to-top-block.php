<?php
/**
 * Plugin Name:       Back To Top Block
 * Plugin URI:        https://github.com/philhoyt/Back-to-Top-Block
 * Description:       Adds a customizable Back to Top button that helps visitors return to the top of the page.
 * Requires at least: 6.6
 * Requires PHP:      7.2
 * Version:           1.0.1
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
 * Registers the Back to Top block type.
 *
 * This function is called during WordPress initialization to register
 * the Back to Top block using the compiled assets from the build directory.
 *
 * @since 1.0.1
 * @return void
 */
function back_to_top_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', __NAMESPACE__ . '\\back_to_top_block_init' );
