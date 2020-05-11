import React, { useState, Fragment, forwardRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useLocation, useHistory } from 'react-router-dom';
import {
  Fade,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  Select,
  MenuItem,
  Zoom
} from '@material-ui/core';
import ChangeHistoryIcon from '@material-ui/icons/ChangeHistory';

const useStyles = makeStyles(theme => ({
  menu: {
    position: 'absolute',
    bottom: theme.spacing(4),
    right: theme.spacing(4)
  },
  reload: {
    position: 'absolute',
    bottom: theme.spacing(4),
    left: theme.spacing(4)
  }
}));

const Transition = forwardRef((props, ref) => <Zoom in ref={ref} {...props} />);

export default ({ refresh }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const showMenu = useSelector(state => state.showMenu);
  const history = useHistory();
  const location = useLocation();
  const [showDialog, setShowDialog] = useState(false);

  const handleCloseDialog = () => setShowDialog(false);

  return (
    <Fragment>
      <Fade in={showMenu}>
        <Fab
          aria-label={'shape'}
          className={classes.menu}
          color="primary"
          onClick={() => setShowDialog(true)}
        >
          <ChangeHistoryIcon />
        </Fab>
      </Fade>

      <Dialog
        open={showDialog}
        onClose={handleCloseDialog}
        TransitionComponent={Transition}
      >
        <DialogTitle>Choose your geometric shape</DialogTitle>
        <DialogContent>
          <Select
            value={location.pathname}
            onChange={event => {
              history.push(event.target.value);
              setShowDialog(false);
              dispatch({
                type: 'SET_SHOW_MENU',
                show: false
              });
            }}
          >
            <MenuItem value={'/'}>Home (△)</MenuItem>
            <MenuItem value={'/cube'}>Cube</MenuItem>
            <MenuItem value={'/seed-of-life'}>The Seed Of Life</MenuItem>
          </Select>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};
