import React from 'react';
import { Box } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Stage } from 'react-konva';
import { useLocation } from 'react-router-dom';
import Home from './Home';
import { centerOfScreen } from '../utils';
import SeedOfLife from './SeedOfLife';
import spaceImage from '../images/space.jpg';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundImage: `url(${spaceImage})`,
    '&:before': {
      content: '""',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.69)'
    }
  }
}));

export default () => {
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useDispatch();

  const shapeLoaded = () =>
    dispatch({
      type: 'SET_SHOW_MENU',
      show: true
    });

  const centralCoordinates = centerOfScreen();
  let shape;

  switch (location.pathname) {
    case '/':
      shape = <Home center={centralCoordinates} loaded={shapeLoaded} />;
      break;
    case '/seed-of-life':
      shape = <SeedOfLife center={centralCoordinates} loaded={shapeLoaded} />;
      break;
    default:
      shape = <Home center={centralCoordinates} loaded={shapeLoaded} />;
  }

  return (
    <Box className={classes.root}>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        {shape}
      </Stage>
    </Box>
  );
};
