// React engine
import { FC, useState, SyntheticEvent } from 'react';

// MUI Core
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

// MUI Other
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

// Auth, Firebase
import { useAuth } from '../../contexts/AuthContext';
import { collection, addDoc, getFirestore } from '@firebase/firestore';

// My Components, Types
import NewProjectDialog from '../NewProjectDialog';
import GridCard from './GridCard';
import SuccessAlert from '../SuccessAlert';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            margin: theme.spacing(1),
        },
    }),
);

const NewProjectCard:FC = () => {
    const classes = useStyles();
    const user = useAuth()?.uid;
    
    // Dialog box open state
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    
    const createProjectAndClose = (name: string): void => {
        // Place the order here
        handleClose();
        addDoc(collection(getFirestore(), 'projects'), {
            owner: user,
            name: name
        }).then(()=>{
            setAlert(true);
        });
    };
    
    const [alert, setAlert] = useState(false);
    
    const handleAlertClose = (event?: SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlert(false);
    };
    
    return (
        <>
            <GridCard>
                <Box>
                    <Button variant='contained' color='primary' className={classes.button} startIcon={<AddCircleOutlineIcon fontSize='large' />} onClick={handleClickOpen}>
                        New Project
                    </Button>
                </Box>
            </GridCard>
            <NewProjectDialog openState={open} createProjectAndClose={createProjectAndClose} handleClose={handleClose} />
            <SuccessAlert openState={alert} onClose={handleAlertClose}>
                Project created successfully!
            </SuccessAlert>
        </>
    );
};

export default NewProjectCard;