// React engine
import { FC, useState, ReactNode } from 'react';

// MUI Core
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';

// MUI Other
import { createStyles, makeStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

// Styles
const styles = (theme: Theme) => createStyles({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    dialogPaper: {
        height: '60vh',
        minWidth: '40vw'
    },
    formControl: {
        margin: theme.spacing(3),
    }
});
const useStyles = makeStyles(styles);

// ===== Signup Dialog =====

// Props
interface NewProjectDialogProps {
    openState: boolean;
    createProjectAndClose: (name: string)=>void; 
    handleClose: ()=>void;
}

// Main component
const NewProjectDialog: FC<NewProjectDialogProps> = (props) => {
    const classes = useStyles();
    
    // Selection state
    const [name, setName] = useState<string>('Untitled Project');

    // Form state
    const resetForm = () => {
        setName('Untitled Project');
    };

    return (
        <div>
            <Dialog 
                onClose={props.handleClose} 
                aria-labelledby='customized-dialog-title' 
                open={props.openState} 
                scroll='paper' 
                classes={{ paper: classes.dialogPaper }} 
                maxWidth={'sm'}
            >
                <DialogTitle id='customized-dialog-title' onClose={props.handleClose}>
                    Create a New Project
                </DialogTitle>
                <DialogContent dividers>
                    <FormLabel component='legend'>Enter Project Name:</FormLabel>
                    <FormGroup>
                        <FormControl className={classes.formControl}>
                            <TextField 
                                value={name} 
                                onChange={(event)=>{
                                    setName(event.target.value);
                                }}
                            />
                        </FormControl>
                    </FormGroup>
                </DialogContent>
                <DialogActions>
                    <Button 
                        autoFocus 
                        onClick={()=>{
                            props.createProjectAndClose(name); 
                            resetForm();
                        }} 
                        color='primary' 
                    >
                        Create Project
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
        
// Dialog Stuff
const DialogContent = withStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

interface DialogTitleProps extends WithStyles<typeof styles> {
    id: string;
    children: ReactNode;
    onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant='h6'>
                {children}
            </Typography>
            {onClose ? (
                <IconButton aria-label='close' className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

export default NewProjectDialog;