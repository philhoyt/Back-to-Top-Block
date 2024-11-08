<?php
/**
 * Plugin Name:       Back To Top Block
 * Description:       Adds a Back to Top button that helps visitors return to the top of the page.
 * Requires at least: 6.6
 * Requires PHP:      7.2
 * Version:           0.1.0
 * Author:            Phil Hoyt
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       back-to-top-block
 *
 * @package back-to-top-block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

function create_block_back_to_top_block_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'create_block_back_to_top_block_block_init' );
