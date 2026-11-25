=== Back To Top Block ===
Contributors:      philhoyt
Tags:              block, scroll, navigation, back-to-top, scroll-to-top
Requires at least: 6.6
Tested up to:      7.2
Stable tag:        1.0.6
Requires PHP:      7.4
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html

Adds a Back to Top button block that scrolls the page to the top when clicked

== Description ==

Back To Top Block adds one block, "Back To Top Block", to the block editor. Place it where you want the button to appear, usually at the end of a long post or in a footer template part. Clicking the button scrolls the window to the top of the page.

The block settings panel has four controls:

* Show or hide the up arrow icon.
* Show or hide the button text. Hidden text is still read by screen readers.
* Change the button text (default "Back to Top", up to 50 characters).
* Pick an image from the media library to replace the arrow icon.

The scroll is animated unless the visitor's browser has reduced motion turned on, in which case it jumps. After the scroll, focus moves to the top of the page through the theme's skip link when one exists.

The button is a plain `<button>` with an aria-label and an outline on keyboard focus. Text, background, spacing and typography can be set through the block's style controls.

Button text is sanitized on save. Icon URLs are limited to the site's own domain; an icon URL on another domain is dropped.

== Installation ==

1. Upload the plugin files to the `/wp-content/plugins/back-to-top-block` directory, or install the plugin through the WordPress plugins screen.
2. Activate the plugin through the Plugins screen in WordPress.
3. In the block editor, add the Back To Top Block to a post, page or template.

== Frequently Asked Questions ==

= Is the button fixed to the corner of the screen? =

No. The button sits where you place the block and scrolls with the page. For a button that is always visible, put the block in a template part and position it with your theme's CSS.

= Can I use my own icon? =

Yes. Choose an image from the media library in the block settings. Images hosted on another domain are rejected when the post is saved.

= Which themes does it work with? =

Any theme that supports the block editor. Colors, spacing and typography come from the block's style controls, so the button picks up your theme's presets.

== Screenshots ==

1. The block settings panel with the icon, text and custom icon controls.

== Changelog ==

= 1.0.6 =
* Tested up to WordPress 7.2.
* Rewrote the plugin description and FAQ in plain English.

= 1.0.5 =
* Tested up to WordPress 7.1.
* Upgraded the build tooling to @wordpress/scripts 37.

= 1.0.4 =
* Fixed blocks saved with older versions showing a validation error in the editor.
* Updated the build tooling and added Jest and PHPUnit tests.
* Tested up to WordPress 7.0.

= 1.0.3 =
* Added server-side sanitization of the button text and icon URL attributes.
* Rejected icon URLs that point to another domain.
* Added the `back_to_top_block_args` filter for block registration arguments.
* Fixed the button text fallback when the text is empty.
* Added a fallback for browsers that do not support the `scrollTo` options object.

= 1.0.2 =
* Improved focus management after the scroll finishes.
* Minor accessibility improvements.

= 1.0.1 =
* First release: button block with text and icon toggles, custom icon upload and smooth scrolling.

= 1.0.0 =
* Initial commit with the Playground blueprint and demo content.
