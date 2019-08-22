import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DescriptionIcon from '@material-ui/icons/Description';

const useStyles = makeStyles( theme => ( {
	reusableComponents: {
		padding: theme.spacing( 2, 0 ),
	},
	component: {
		transition: 'none'
	}
} ) );

const ReusableComponents = ( { reusableComponents } ) => {
	const classes = useStyles();

	return (
		<Droppable droppableId="reusableComponents" isDropDisabled={true}>
			{ ( provided, snapshot ) => (
				<Box
					ref={provided.innerRef}
					className={classes.reusableComponents}
				>
					{ reusableComponents.map( ( componentData, index ) => {
						return (
							<Draggable
								draggableId={`reusables-${ componentData.id }`}
								key={`reusables-${ componentData.id }`}
								index={index}
							>
								{( provided, snapshot ) => (
									<React.Fragment>
										<ListItem
											className={classes.component}
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
											style={provided.draggableProps.style}
										>
											<ListItemAvatar>
												<Avatar>
													<DescriptionIcon />
												</Avatar>
											</ListItemAvatar>
											<ListItemText
												primary={componentData.title}
												secondary="Component summary"
											/>
										</ListItem>
										{snapshot.isDragging && (
											<ListItem
												className={classes.component}
											>
												<ListItemAvatar>
													<Avatar>
														<DescriptionIcon />
													</Avatar>
												</ListItemAvatar>
												<ListItemText
													primary={componentData.title}
													secondary="Component summary"
												/>
											</ListItem>
										)}
									</React.Fragment>
								)}
							</Draggable>
						);
					} ) }
					{provided.placeholder}
				</Box>
			)}
		</Droppable>
	);
}

export default ReusableComponents;
