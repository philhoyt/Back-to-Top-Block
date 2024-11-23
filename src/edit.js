import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	TextControl,
	Button,
	Notice,
} from '@wordpress/components';
import { useState } from '@wordpress/element';

import { BackToTopButton } from './components/back-to-top-button';

const ALLOWED_MEDIA_TYPES = [ 'image' ];

export default function Edit( { attributes, setAttributes } ) {
	const { showIcon, showText, buttonText, iconUrl } = attributes;
	const [ error, setError ] = useState( '' );

	const validateButtonText = ( text ) => {
		if ( ! text ) {
			setError(
				__( 'Button text cannot be empty.', 'back-to-top-block' )
			);
			return false;
		}
		setError( '' );
		return true;
	};

	const handleMediaSelect = ( media ) => {
		if ( ! media || ! media.url ) {
			setError( __( 'Invalid media selection.', 'back-to-top-block' ) );
			return;
		}
		setError( '' );
		setAttributes( { iconUrl: media.url } );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Button Settings', 'back-to-top-block' ) }
				>
					{ error && (
						<Notice status="error" isDismissible={ false }>
							{ error }
						</Notice>
					) }
					<ToggleControl
						label={ __( 'Show Icon', 'back-to-top-block' ) }
						checked={ showIcon }
						onChange={ () =>
							setAttributes( { showIcon: ! showIcon } )
						}
					/>
					<ToggleControl
						label={ __( 'Show Text', 'back-to-top-block' ) }
						checked={ showText }
						onChange={ () =>
							setAttributes( { showText: ! showText } )
						}
					/>
					<TextControl
						label={ __( 'Button Text', 'back-to-top-block' ) }
						value={ buttonText }
						onChange={ ( value ) => {
							if ( validateButtonText( value ) ) {
								setAttributes( { buttonText: value } );
							}
						} }
					/>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ handleMediaSelect }
							allowedTypes={ ALLOWED_MEDIA_TYPES }
							value={ iconUrl }
							render={ ( { open } ) => (
								<Button onClick={ open } variant="secondary">
									{ iconUrl
										? __(
												'Replace Icon',
												'back-to-top-block'
										  )
										: __(
												'Add Icon',
												'back-to-top-block'
										  ) }
								</Button>
							) }
						/>
					</MediaUploadCheck>
					{ iconUrl && (
						<Button
							onClick={ () => setAttributes( { iconUrl: '' } ) }
							variant="link"
							isDestructive
						>
							{ __( 'Remove Icon', 'back-to-top-block' ) }
						</Button>
					) }
				</PanelBody>
			</InspectorControls>
			<div { ...useBlockProps() }>
				<BackToTopButton
					showIcon={ showIcon }
					showText={ showText }
					buttonText={ buttonText }
					iconUrl={ iconUrl }
				/>
			</div>
		</>
	);
}
