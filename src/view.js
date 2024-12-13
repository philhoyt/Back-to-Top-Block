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

			const skipLink = document.querySelector( '.skip-link' );
			if ( skipLink ) {
				skipLink.focus();
				skipLink.blur();
			}
		} );
	} );
} );
