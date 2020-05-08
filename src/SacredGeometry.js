import React from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Stage } from 'react-konva';
import { useLocation } from 'react-router-dom';
import Home from './Home';
import SeedOfLife from './SeedOfLife';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: 'black'
  }
}));

export default () => {
  const classes = useStyles();
  const location = useLocation();

  let shape;

  const centerOfScreen = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
  };

  switch (location.pathname) {
    case '/':
      shape = <Home center={centerOfScreen} />;
      break;
    case '/seed-of-life':
      shape = <SeedOfLife center={centerOfScreen} />;
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
