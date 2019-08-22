import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { Droppable } from 'react-beautiful-dnd';
import DocumentNode from './DocumentNode';

const useStyles = makeStyles( theme => ( {
	documentNodes: props => {
		return {
			maxWidth: 960,
			width: '100%',
			minHeight: 300,
			margin: theme.spacing( 2, 0 ),
			padding: theme.spacing( 2 ),
			outline: props.isDraggingOver ? '1px dashed #ccc' : 'none'
		};
	}
} ) );

const DocumentNodes = ( { documentNodes, isDropDisabled, deleteNode, addNode, saveNode } ) => {
	const [ isDraggingOver, setIsDraggingOver ] = useState( false );
	const classes = useStyles( { isDraggingOver } );

	return (
		<Droppable
			droppableId="documentNodes"
			isDropDisabled={isDropDisabled}
		>
			{ ( provided, snapshot ) => {
				setIsDraggingOver( snapshot.isDraggingOver );

				return (
					<Box
						ref={provided.innerRef}
						className={classes.documentNodes}
					>
						{ documentNodes.map( ( componentData, index ) => {
							return (
								<DocumentNode
									draggableId={`document-${ componentData.id }`}
									key={`document-${ componentData.id }`}
									id={componentData.id}
									isPublic={componentData.isPublic}
									index={index}
									title={componentData.title}
									content={componentData.content}
									deleteNode={deleteNode}
									addNode={addNode}
									saveNode={saveNode}
								/ >
							);
						} ) }
						{provided.placeholder}
					</Box>
				);
			} }
		</Droppable>
	);
}

export default DocumentNodes;
