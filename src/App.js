import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import DocumentNodes from './DocumentNodes';
import Drawer from '@material-ui/core/Drawer';
import publicComponents from './PublicComponents';
import React, { useState } from 'react';
import ReusableComponents from './ReusableComponents';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toc from './Toc';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { uid } from './utils';
import { makeStyles } from '@material-ui/core/styles';
import { DragDropContext } from 'react-beautiful-dnd';

import './App.css';

const useStyles = makeStyles( theme => ( {
	root: {
		flexGrow: 1,
		height: '100%'
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1
	},
	toc: {
		borderColor: theme.palette.grey[ 200 ]
	},
	drawer: {
		width: 320,
		flexShrink: 0
	},
	drawerHeader: {
		...theme.mixins.toolbar,
	},
	drawerPaper: {
		width: 320
	},
	tab: {
		minWidth: 50
	},
	document: {
		padding: theme.spacing(3, 2),
		margin: theme.spacing(6, 2, 2)
	},
	documentTitle: {
		width: '100%',
		maxWidth: 960,
		borderBottom: '1px solid #eee'
	}
} ) );

function TabPanel( props ) {
	const { children, value, index, ...other } = props;

	return (
		<Typography
			component="div"
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			<Box p={1}>{children}</Box>
		</Typography>
	);
}

export default function App() {
	const classes = useStyles();
	const [ activeTab, setActiveTab ] = useState( 0 );
	const [ disableDropInDocumentNodes, setDisableDropInDocumentNodes ] = useState( false );
	const [ documentNodes, setDocumentNodes ] = useState( [
		{
			id: uid(),
			title: 'A public block',
			isPublic: false,
			content: `
				<h2>A public block</h2>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit enim idem caecus, debilis. <b>Sed fortuna fortis;</b> Respondent extrema primis, media utrisque, omnia omnibus. Primum Theophrasti, Strato, physicum se voluit; </p>
			`,
		},
		publicComponents[ 1 ],
		publicComponents[ 2 ],
		publicComponents[ 0 ],
		publicComponents[ 3 ],
	] );

	function handleActiveTabChange( event, newValue ) {
		setActiveTab( newValue );
	}

	const reorderNodes = ( startIndex, endIndex ) => {
		const result = Array.from( documentNodes );
		const [ removed ] = result.splice( startIndex, 1 );
		result.splice( endIndex, 0, removed );

		return result;
	};

	const copyNode = ( droppableSource, droppableDestination ) => {
		const sourceClone = Array.from( publicComponents );
		const destClone = Array.from( documentNodes );
		const [ removed ] = sourceClone.splice( droppableSource.index, 1 );

		destClone.splice( droppableDestination.index, 0, { ...removed, id: uid() } );

		return destClone;
	};

	const deleteNode = index => {
		const result = Array.from( documentNodes );
		result.splice( index, 1 );

		setDocumentNodes( result );
	};

	const addNode = ( index, addAfter ) => {
		const result = Array.from( documentNodes );

		result.splice( index + ( addAfter ? 1 : 0 ), 0, {
			title: 'New section',
			content: '<h2>New section</h2><p>Type content here</p>',
			id: uid()
		} );

		setDocumentNodes( result );
	};

	const saveNode = ( id, content ) => {
		const result = Array.from( documentNodes );

		const node = result.find( node => node.id === id );

		node.content = content;

		setDocumentNodes( result );
	}

	const onDragStart = result => {
		const { source } = result;

		if ( source.droppableId === 'toc' ) {
			setDisableDropInDocumentNodes( true );
		}
	}

	const onDragEnd = result => {
		const { source, destination } = result;

		setDisableDropInDocumentNodes( false );

		// Dropped outside any droppable.
		if ( !destination ) {
			return;
		}

		// Sorting within the same droppable.
		if ( source.droppableId === destination.droppableId ) {
			const nodes = reorderNodes( source.index, destination.index );

			setDocumentNodes( nodes );
		}

		// Copying from components to document nodes.
		else {
			const nodes = copyNode( source, destination );

			setDocumentNodes( nodes );
		}
	};

	return (
		<DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
			<AppBar position="sticky" className={classes.appBar}>
				<Toolbar>
					<Typography variant="h6" color="inherit">Document editor</Typography>
				</Toolbar>
			</AppBar>
			<Box display="flex" height="100%" flexDirection="row" className={classes.root} >
				{/* Left column with TOC */}
				<Drawer
					className={classes.drawer}
					variant="persistent"
					anchor="left"
					open={true}
					classes={{ paper: classes.drawerPaper }}
				>
					<div className={classes.drawerHeader} />
					<Divider />
					<Box p={2}>
						<Typography variant="h6" component="h3" noWrap>
							Table of contents
						</Typography>
						<Toc documentNodes={documentNodes} />
					</Box>
				</Drawer>

				{/* Middle column with the document */}
				<Box flexGrow={1} className={classes.document}>
					<Box
						className={classes.box}
						display="flex"
						flexWrap="nowrap"
						flexDirection="column"
						alignItems="center"
					>
						<Typography variant="h4" component="h3" className={classes.documentTitle}>Title of the document</Typography>
						<DocumentNodes
							documentNodes={documentNodes}
							isDropDisabled={disableDropInDocumentNodes}
							deleteNode={deleteNode}
							addNode={addNode}
							saveNode={saveNode}
						/>
					</Box>
				</Box>

				{/* Right column with reusable components */}
				<Drawer
					className={classes.drawer}
					variant="persistent"
					anchor="right"
					open={true}
					classes={{ paper: classes.drawerPaper }}
				>
					<div className={classes.drawerHeader} />
					<Divider />
					<AppBar position="static" color="default">
						<Tabs
							value={activeTab}
							onChange={handleActiveTabChange}
							variant="fullWidth"
						>
							<Tab label="Components" className={classes.tab} />
							<Tab label="History" className={classes.tab} />
						</Tabs>
					</AppBar>
					<TabPanel value={activeTab} index={0}>
						<ReusableComponents reusableComponents={publicComponents} />
					</TabPanel>
					<TabPanel value={activeTab} index={1}>
						TODO
					</TabPanel>
				</Drawer>
			</Box>
		</DragDropContext>
	);
};
