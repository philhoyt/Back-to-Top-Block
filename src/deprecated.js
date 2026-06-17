/**
 * Deprecated save implementations for backward compatibility.
 *
 * Pre-1.0.4 markup used the raw `buttonText` and `iconUrl` values. The current
 * save() applies a default fallback to the aria-label/text and decodes the
 * icon URL, which changes the serialized markup for blocks saved with empty
 * button text or percent-encoded icon URLs. This deprecation lets that older
 * content validate and migrate cleanly instead of throwing a block-recovery
 * error in the editor.
 */
import { useBlockProps } from '@wordpress/block-editor';

import metadata from './block.json';

const v1 = {
	attributes: metadata.attributes,
	save({ attributes }) {
		const { showIcon, showText, buttonText, iconUrl } = attributes;

		return (
			<div {...useBlockProps.save()}>
				<button
					type="button"
					className="back-to-top-link"
					aria-label={buttonText}
				>
					<span
						className={`back-to-top-link__text ${
							!showText ? 'screen-reader-text' : ''
						}`}
					>
						{buttonText}
					</span>{' '}
					{showIcon && (
						<span
							aria-hidden="true"
							className="back-to-top-link__icon"
						>
							{iconUrl ? <img src={iconUrl} alt="" /> : '↑'}
						</span>
					)}
				</button>
			</div>
		);
	},
};

export default [v1];
