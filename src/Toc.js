import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DragHandle from '@material-ui/icons/DragHandle';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const useStyles = makeStyles( theme => ( {
	toc: props => ( {
		outline: props.isDraggingOver ? '1px dashed #ccc' : 'none',
		minHeight: 150
	} ),
	listText: {
		whiteSpace: 'nowrap',
		maxWidth: '250px',
		textOverflow: 'ellipsis',
		display: 'inline-block',
		overflow: 'hidden'
	}
} ) );

const Toc = ( { documentNodes } ) => {
	const [ isDraggingOver, setIsDraggingOver ] = useState( false );
	const classes = useStyles( { isDraggingOver } );

	return (
		<Droppable droppableId="toc">
			{ ( provided, snapshot ) => {
				setIsDraggingOver( snapshot.isDraggingOver );

				return (
					<List
						dense={true}
						ref={provided.innerRef}
						className={classes.toc}
					>
						{documentNodes.map( ( node, index ) => {
							return (
								<Draggable
									draggableId={node.id}
									key={node.id}
									index={index}
								>
									{( provided, snapshot ) => (
										<ListItem

											disableGutters={true}
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
											style={provided.draggableProps.style}
										>
											<ListItemIcon>
												<DragHandle />
											</ListItemIcon>
											<ListItemText primary={node.title} className={classes.listText} />
										</ListItem>
									)}
								</Draggable>
							);
						})}
						{provided.placeholder}
					</List>
				);
			} }
		</Droppable>
	);
}

export default Toc;
