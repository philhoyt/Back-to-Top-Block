window.addEventListener( 'DOMContentLoaded', () => {
	document.querySelectorAll( '.back-to-top-link' ).forEach( ( button ) => {
		button.addEventListener( 'click', () => {
			const prefersReducedMotion = window.matchMedia(
				'(prefers-reduced-motion: reduce)'
			).matches;

			window.scrollTo( {
				top: 0,
				behavior: prefersReducedMotion ? 'auto' : 'smooth',
			} );

			// Handle focus after scroll completes
			const handleFocus = () => {
				const skipLink = document.querySelector( '.skip-link' );
				if ( skipLink ) {
					skipLink.focus();
					skipLink.blur();
				}
				// Remove the event listener after it fires
				document.removeEventListener( 'scrollend', handleFocus );
			};

			// Listen for the scroll to end
			document.addEventListener( 'scrollend', handleFocus, {
				once: true,
			} );

			// Fallback for browsers that don't support scrollend
			if ( ! ( 'onscrollend' in window ) ) {
				setTimeout( handleFocus, prefersReducedMotion ? 0 : 800 );
			}
		} );
	} );
} );
