import { useBlockProps } from '@wordpress/block-editor';
import { BackToTopButton } from './components/back-to-top-button';

export default function save( { attributes } ) {
	const { showIcon, showText, buttonText } = attributes;

	return (
		<div { ...useBlockProps.save() }>
			<BackToTopButton
				isEditor={ true }
				showIcon={ showIcon }
				showText={ showText }
				buttonText={ buttonText }
				iconUrl={ attributes.iconUrl }
			/>
		</div>
	);
}
