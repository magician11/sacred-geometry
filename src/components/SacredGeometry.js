import React from 'react';
import { Box } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Stage } from 'react-konva';
import { useLocation } from 'react-router-dom';
import Home from './Home';
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

  let shape;

  const centerOfScreen = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
  };

  switch (location.pathname) {
    case '/':
      shape = <Home center={centerOfScreen} loaded={shapeLoaded} />;
      break;
    case '/seed-of-life':
      shape = <SeedOfLife center={centerOfScreen} loaded={shapeLoaded} />;
      break;
    default:
      shape = <Home center={centerOfScreen} />;
  }

  return (
    <Box className={classes.root}>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        {shape}
      </Stage>
    </Box>
  );
};
