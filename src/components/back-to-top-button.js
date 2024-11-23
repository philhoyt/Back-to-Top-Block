import { __ } from '@wordpress/i18n';
import { safeDecodeURI } from '@wordpress/url';

export const BackToTopButton = ( {
	showIcon = true,
	showText = true,
	buttonText = __( 'Back to Top', 'back-to-top-block' ),
	iconUrl = '',
} ) => {
	// Sanitize and validate inputs
	const sanitizedButtonText =
		buttonText || __( 'Back to Top', 'back-to-top-block' );
	const sanitizedIconUrl = iconUrl ? safeDecodeURI( iconUrl ) : '';

	const buttonProps = {
		type: 'button',
		className: 'back-to-top-link',
		'aria-label': sanitizedButtonText,
	};

	return (
		<button { ...buttonProps }>
			<span
				className={ `back-to-top-link__text ${
					! showText ? 'screen-reader-text' : ''
				}` }
			>
				{ sanitizedButtonText }
			</span>{ ' ' }
			{ showIcon && (
				<span aria-hidden="true" className="back-to-top-link__icon">
					{ sanitizedIconUrl ? (
						<img
							src={ sanitizedIconUrl }
							alt=""
							onError={ ( e ) => {
								e.target.style.display = 'none';
							} }
						/>
					) : (
						'↑'
					) }
				</span>
			) }
		</button>
	);
};
