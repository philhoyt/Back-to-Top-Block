<?php
/**
 * Tests for the block attribute sanitization callbacks.
 *
 * @package back-to-top-block
 */

namespace BackToTopBlock\Tests;

use WP_UnitTestCase;
use function BackToTopBlock\sanitize_button_text;
use function BackToTopBlock\sanitize_icon_url;

/**
 * Covers sanitize_button_text() and sanitize_icon_url().
 */
class Test_Sanitization extends WP_UnitTestCase {

	/**
	 * Plain text passes through unchanged.
	 *
	 * @return void
	 */
	public function test_button_text_passes_plain_text() {
		$this->assertSame( 'Back to Top', sanitize_button_text( 'Back to Top' ) );
	}

	/**
	 * HTML tags are stripped from the button text.
	 *
	 * @return void
	 */
	public function test_button_text_strips_tags() {
		$this->assertSame( 'Hello', sanitize_button_text( '<b>Hello</b>' ) );
	}

	/**
	 * An empty icon URL returns an empty string.
	 *
	 * @return void
	 */
	public function test_icon_url_empty_returns_empty() {
		$this->assertSame( '', sanitize_icon_url( '' ) );
	}

	/**
	 * Relative (media library) URLs are allowed.
	 *
	 * @return void
	 */
	public function test_icon_url_allows_relative() {
		$this->assertSame(
			'/wp-content/uploads/icon.png',
			sanitize_icon_url( '/wp-content/uploads/icon.png' )
		);
	}

	/**
	 * Same-origin URLs are allowed.
	 *
	 * @return void
	 */
	public function test_icon_url_allows_same_origin() {
		$url = site_url( '/wp-content/uploads/icon.png' );
		$this->assertSame( $url, sanitize_icon_url( $url ) );
	}

	/**
	 * External URLs are rejected for security.
	 *
	 * @return void
	 */
	public function test_icon_url_rejects_external() {
		$this->assertSame(
			'',
			sanitize_icon_url( 'https://evil.example.org/icon.png' )
		);
	}
}
