import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Draggable } from 'react-beautiful-dnd';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import EditIcon from '@material-ui/icons/Edit';
import LinkOffIcon from '@material-ui/icons/LinkOff';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

// CKEditor component and plugins
import CKEditor from '@ckeditor/ckeditor5-react';
import InlineEditor from '@ckeditor/ckeditor5-editor-inline/src/inlineeditor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import UploadAdapter from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';
import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import Link from '@ckeditor/ckeditor5-link/src/link';
import List from '@ckeditor/ckeditor5-list/src/list';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';

const editorConfiguration = {
	plugins: [
		Essentials,
		UploadAdapter,
		Autoformat,
		Bold,
		Italic,
		BlockQuote,
		CKFinder,
		EasyImage,
		Heading,
		Image,
		ImageCaption,
		ImageStyle,
		ImageToolbar,
		ImageUpload,
		Link,
		List,
		MediaEmbed,
		Paragraph,
		PasteFromOffice,
		Table,
		TableToolbar
	],
	toolbar: {
		items: [
			'heading',
			'|',
			'bold',
			'italic',
			'link',
			'bulletedList',
			'numberedList',
			'imageUpload',
			'blockQuote',
			'insertTable',
			'mediaEmbed',
			'undo',
			'redo'
		],
		viewportTopOffset: 62
	},
	image: {
		toolbar: [
			'imageStyle:full',
			'imageStyle:side',
			'|',
			'imageTextAlternative'
		]
	},
	table: {
		contentToolbar: [
			'tableColumn',
			'tableRow',
			'mergeTableCells'
		]
	},
	placeholder: 'Type content here'
};

const useStyles = makeStyles( theme => ( {
	node: props => ( {
		background: props.isPublic ? theme.palette.grey[ 100 ] : 'none',
		position: 'relative',
		padding: theme.spacing( 3, 2, props.isEdited && props.isPublic ? 0 : 2 ),
		margin: theme.spacing( 0, 0, 2 ),
		borderRadius: '3px',
		'&:hover': {
			zIndex: 100,
			boxShadow: '0 0 5px ' + theme.palette.grey[ 400 ]
		},
		'&:hover > button': {
			display: 'flex'
		},
		'& .ck-content': {
			overflow: 'hidden'
		},
		boxShadow: props.isEdited ? '0 0 5px ' + theme.palette.grey[ 400 ] : 'none'
	} ),
	toolbar: {
		position: 'absolute',
		right: '20px',
		top: 0,
		margin: 0,
		padding: 0,
		zIndex: 100
	},
	button: {
		marginLeft: theme.spacing(1),
	},
	rightIcon: {
		marginLeft: theme.spacing(1),
	},
	editingToolbar: {
		justifyContent: 'flex-end',
		padding: 0
	},
	addButton: {
		display: 'none',
		position: 'absolute',
		top: 0,
		left: '50%',
		transform: 'translate( -50%, -50% )'
	},
	addButtonBottom: {
		top: 'auto',
		bottom: 0,
		transform: 'translate( -50%, 50% )'
	}
} ) );

const DocumentNode = ( { id, draggableId, index, title, content, isPublic, deleteNode, addNode, saveNode } ) => {
	const [ isEdited, setIsEdited ] = useState( !isPublic );
	let editorInstance;

	const editNode = () => {
		setIsEdited( true );
	};

	const cancelEditing = () => {
		setIsEdited( false );
	};

	const onSaveClick = () => {
		saveNode( id, editorInstance.getData() );

		cancelEditing();
	};

	const classes = useStyles( { isEdited, isPublic } );

	return (
		<Draggable
			draggableId={draggableId}
			index={index}
		>
			{( provided, snapshot ) => (
				<Box
					ref={provided.innerRef}
					className={classes.node}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					style={provided.draggableProps.style}
				>
					<Fab size="small" color="primary" className={classes.addButton} onClick={() => addNode( index )}>
						<AddIcon fontSize="small" />
					</Fab>
					<Toolbar variant="dense" className={classes.toolbar}>
						{isPublic ? (
							<span>
								<IconButton size="small">
									<LinkOffIcon fontSize="small" />
								</IconButton>
								<IconButton size="small" onClick={editNode}>
									<EditIcon fontSize="small" />
								</IconButton>
							</span>
						) : ''}
						<IconButton size="small" onClick={() => deleteNode( index )}>
							<DeleteIcon fontSize="small" />
						</IconButton>
					</Toolbar>
					{ isEdited ?
						(
							<Box>
								<Typography component="div">
									<CKEditor
										editor={InlineEditor}
										config={editorConfiguration}
										data={content}
										onInit={ editor => {
											editorInstance = editor;
											editor.editing.view.focus();
										} }
									/>
								</Typography>
								{ isPublic ? (
									<Toolbar className={classes.editingToolbar}>
										<Button
											variant="contained"
											color="secondary"
											className={classes.button}
											onClick={cancelEditing}
										>
											Cancel
											<CancelIcon className={classes.rightIcon} />
										</Button>
										<Button
											variant="contained"
											color="primary"
											className={classes.button}
											onClick={onSaveClick}
										>
											Save
											<SaveIcon className={classes.rightIcon} />
										</Button>
									</Toolbar>
								) : '' }
							</Box>
						) :
						(
							<Typography className="ck-content" dangerouslySetInnerHTML={{__html: content}}></Typography>
						)
					}
					<Fab size="small" color="primary" className={`${classes.addButton} ${classes.addButtonBottom}`} onClick={() => addNode( index, true )}>
						<AddIcon fontSize="small" />
					</Fab>
				</Box>
			)}
		</Draggable>
	);
}

export default DocumentNode;

