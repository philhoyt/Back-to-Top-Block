window.addEventListener( 'DOMContentLoaded', () => {
	document.querySelectorAll( '.back-to-top-link' ).forEach( ( button ) => {
		button.addEventListener( 'click', () => {
			const prefersReducedMotion = window.matchMedia(
				'(prefers-reduced-motion: reduce)'
			).matches;

			const scrollPromise = window.scrollTo( {
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
			};

			// If scroll returns a promise (modern browsers), use it
			if ( scrollPromise && scrollPromise.then ) {
				scrollPromise.then( handleFocus );
			} else {
				// Fallback for browsers that don't support scroll promises
				setTimeout( handleFocus, prefersReducedMotion ? 0 : 800 );
			}
		} );
	} );
} );
