// React engine
import { useState, FC } from 'react';
import { Link } from 'react-router-dom';

// MUI core
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// MUI other
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

// Auth, Firebase'
import { deleteDoc, doc, getFirestore } from '@firebase/firestore';

// My Components, Types
import GridCard from './GridCard';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
        },
        buttonbox: {
            padding: theme.spacing(1)
        },
        textbox: {
            padding: '.5em',
            flexGrow: 1,
            verticalAlign: 'top'
        },
        titlebox: {
            fontWeight: 'bold'
        }
    }),
);

export type ProjectCardProps = {
    name: string,
    id: string,
    deleteAlert: ()=>void,
}

const ProjectCard:FC<ProjectCardProps> = (props) => {
    const classes = useStyles();
    
    // Delete confirmation dialog
    const [deleteOpen, setDeleteOpen] = useState(false);
    const handleDeleteOpen = () => {
        setDeleteOpen(true);
    };
    const handleDeleteClose = () => {
        setDeleteOpen(false);
    };
    const handleDeleteAndClose = () => {
        handleDeleteClose();
        props.deleteAlert();
        deleteDoc(doc(getFirestore(), 'projects/'+props.id))
    };

    return (
        <GridCard>
            <Typography variant='h6' className={classes.title}>
                <Box className={classes.titlebox}>
                    {props.name}
                </Box>
            </Typography>
            {/* <Box className={classes.textbox}>
                <Typography variant='body2'>
                    Delivers from {props.item.source} every {props.item.period} days: {Object.entries(props.item.list).filter(entry=> {
                        return Number(entry[1])>0;
                    }).map(entry=>{
                        return entry[1]+'x '+entry[0];
                    }).join(', ')}
                </Typography>
            </Box> */}
            <Box className={classes.buttonbox}>
                <Link to={`/project/${props.id}`}><Button variant='contained' color='primary'>
                    Open
                </Button></Link>
                <Button variant='contained' color='secondary' onClick={handleDeleteOpen}>
                    Delete
                </Button>
            </Box>
            <Dialog
                open={deleteOpen}
                onClose={handleDeleteClose}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
            >
                <DialogTitle id='alert-dialog-title'>{`Delete Project "${props.name}"?`}</DialogTitle>
                <DialogContent>
                    <DialogContentText id='alert-dialog-description'>
                        This project and all its assets will be deleted. It will not be able to be recovered.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteClose} color='inherit'>
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteAndClose} color='secondary' autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </GridCard>
    );
};

export default ProjectCard;