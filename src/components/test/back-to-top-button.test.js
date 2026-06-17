/**
 * WordPress dependencies
 */
import { renderToString } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { BackToTopButton } from '../back-to-top-button';

const render = (props) => renderToString(<BackToTopButton {...props} />);

describe('BackToTopButton', () => {
	it('renders a button with default text, aria-label and the arrow icon', () => {
		const html = render({});

		expect(html).toContain('<button');
		expect(html).toContain('type="button"');
		expect(html).toContain('class="back-to-top-link"');
		expect(html).toContain('aria-label="Back to Top"');
		expect(html).toContain('Back to Top');
		expect(html).toContain('↑');
	});

	it('visually hides the label with screen-reader-text when showText is false', () => {
		const html = render({ showText: false });

		expect(html).toContain('screen-reader-text');
		// The label text is still present for assistive technology.
		expect(html).toContain('Back to Top');
	});

	it('keeps the label visible when showText is true', () => {
		const html = render({ showText: true });

		expect(html).not.toContain('screen-reader-text');
	});

	it('omits the icon span entirely when showIcon is false', () => {
		const html = render({ showIcon: false });

		expect(html).not.toContain('back-to-top-link__icon');
		expect(html).not.toContain('↑');
	});

	it('falls back to the default label when buttonText is empty', () => {
		const html = render({ buttonText: '' });

		expect(html).toContain('aria-label="Back to Top"');
	});

	it('uses the provided buttonText for the label and aria-label', () => {
		const html = render({ buttonText: 'To the top' });

		expect(html).toContain('aria-label="To the top"');
		expect(html).toContain('To the top');
	});

	it('renders a custom icon image instead of the arrow when iconUrl is set', () => {
		const html = render({
			iconUrl: 'https://example.com/wp-content/uploads/arrow.png',
		});

		expect(html).toContain('<img');
		expect(html).toContain(
			'src="https://example.com/wp-content/uploads/arrow.png"'
		);
		expect(html).not.toContain('↑');
	});
});
