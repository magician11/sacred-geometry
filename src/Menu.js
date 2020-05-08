import React, { useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useLocation, useHistory } from 'react-router-dom';
import {
  Fade,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  Select,
  MenuItem
} from '@material-ui/core';
import ChangeHistoryIcon from '@material-ui/icons/ChangeHistory';

const useStyles = makeStyles(theme => ({
  menu: {
    position: 'absolute',
    bottom: theme.spacing(4),
    right: theme.spacing(4)
  }
}));

export default () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [showDialog, setShowDialog] = useState(false);
  const [shapeChooser, setShapeChooser] = useState(true);

  const handleCloseDialog = () => setShowDialog(false);

  return (
    <Fragment>
      <Fade in={shapeChooser} style={{ transitionDelay: '8800ms' }}>
        <Fab
          aria-label={'shape'}
          className={classes.menu}
          color="primary"
          onClick={() => setShowDialog(true)}
        >
          <ChangeHistoryIcon />
        </Fab>
      </Fade>
      <Dialog open={showDialog} onClose={handleCloseDialog}>
        <DialogTitle>Choose your geometric shape</DialogTitle>
        <DialogContent>
          <Select
            value={location.pathname}
            onChange={event => {
              history.push(event.target.value);
              setShowDialog(false);
              setShapeChooser(false);
              setTimeout(() => setShapeChooser(true), 8000);
            }}
          >
            <MenuItem value={'/'}>Home (△)</MenuItem>
            <MenuItem value={'/seed-of-life'}>The Seed Of Life</MenuItem>
          </Select>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};
