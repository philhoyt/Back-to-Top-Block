import { __ } from '@wordpress/i18n';

export const BackToTopButton = ( {
	isEditor = false,
	showIcon = true,
	showText = true,
	buttonText = __( 'Back to Top', 'your-text-domain' ),
	iconUrl = '',
} ) => {
	const buttonProps = {
		type: 'button',
		className: 'back-to-top-link',
		'aria-label': buttonText,
		...( isEditor && { onClick: () => window.scrollTo( { top: 0 } ) } ),
	};

	return (
		<button { ...buttonProps }>
			<span
				className={ `back-to-top-link__text ${
					! showText ? 'screen-reader-text' : ''
				}` }
			>
				{ buttonText }
			</span>{ ' ' }
			{ showIcon && (
				<span aria-hidden="true" className="back-to-top-link__icon">
					{ iconUrl ? <img src={ iconUrl } alt="" /> : '↑' }
				</span>
			) }
		</button>
	);
};
