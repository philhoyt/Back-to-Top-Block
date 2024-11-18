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
} from '@wordpress/components';

import { BackToTopButton } from './components/back-to-top-button';

export default function Edit( { attributes, setAttributes } ) {
	const { showIcon, showText, buttonText } = attributes;

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Button Settings', 'back-to-top-block' ) }
				>
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
						onChange={ ( value ) =>
							setAttributes( { buttonText: value } )
						}
					/>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ ( media ) => {
								setAttributes( { iconUrl: media.url } );
							} }
							allowedTypes={ [ 'image' ] }
							value={ attributes.iconUrl }
							render={ ( { open } ) => (
								<div>
									<p>
										{ __(
											'Custom Icon',
											'back-to-top-block'
										) }
									</p>
									{ attributes.iconUrl ? (
										<div>
											<img
												src={ attributes.iconUrl }
												alt=""
												style={ { maxWidth: '100px' } }
											/>
											<Button
												isDestructive
												onClick={ () =>
													setAttributes( {
														iconUrl: '',
													} )
												}
											>
												{ __(
													'Remove',
													'back-to-top-block'
												) }
											</Button>
										</div>
									) : (
										<Button
											variant="secondary"
											onClick={ open }
										>
											{ __(
												'Upload Icon',
												'back-to-top-block'
											) }
										</Button>
									) }
								</div>
							) }
						/>
					</MediaUploadCheck>
				</PanelBody>
			</InspectorControls>
			<div { ...useBlockProps() }>
				<BackToTopButton
					showIcon={ attributes.showIcon }
					showText={ attributes.showText }
					buttonText={ attributes.buttonText }
					iconUrl={ attributes.iconUrl }
				/>
			</div>
		</>
	);
}
