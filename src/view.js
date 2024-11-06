window.addEventListener( 'DOMContentLoaded', () => {
	document.querySelectorAll( '.back-to-top-link' ).forEach( ( button ) => {
		button.addEventListener( 'click', () => {
			// Check for reduced motion preference
			const prefersReducedMotion = window.matchMedia(
				'(prefers-reduced-motion: reduce)'
			).matches;

			window.scrollTo( {
				top: 0,
				// Use 'auto' instead of 'smooth' if user prefers reduced motion
				behavior: prefersReducedMotion ? 'auto' : 'smooth',
			} );
		} );
	} );
} );
