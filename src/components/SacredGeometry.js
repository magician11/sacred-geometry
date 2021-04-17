import React from 'react';
import { Box } from '@material-ui/core';
import { Stage, Layer } from 'react-konva';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useLocation } from 'react-router-dom';
import Triangle from './shapes/Triangle';
import { centerOfScreen } from '../utils';
import SeedOfLife from './shapes/SeedOfLife';
import FlowerOfLife from './shapes/FlowerOfLife';
import Merkaba from './shapes/Merkaba';
import Cube from './shapes/Cube';
import spaceImage from '../images/space.jpg';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundImage: `url(${spaceImage})`,
    height: window.innerHeight,
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

const SacredGeometry = () => {
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
      shape = (
        <Stage width={window.innerWidth} height={window.innerHeight}>
          <Triangle center={centralCoordinates} loaded={shapeLoaded} />
        </Stage>
      );
      break;
    case '/seed-of-life':
      shape = (
        <Stage width={window.innerWidth} height={window.innerHeight}>
          <Layer>
            <SeedOfLife center={centralCoordinates} loaded={shapeLoaded} />
          </Layer>
        </Stage>
      );
      break;
    case '/flower-of-life':
      shape = (
        <Stage width={window.innerWidth} height={window.innerHeight}>
          <FlowerOfLife center={centralCoordinates} loaded={shapeLoaded} />
        </Stage>
      );
      break;
    case '/cube':
      shape = <Cube loaded={shapeLoaded} />;
      break;
    case '/merkaba':
      shape = <Merkaba loaded={shapeLoaded} />;
      break;
    default:
      shape = (
        <Stage width={window.innerWidth} height={window.innerHeight}>
          <Triangle center={centralCoordinates} loaded={shapeLoaded} />
        </Stage>
      );
  }

  return <Box className={classes.root}>{shape}</Box>;
};

export default SacredGeometry;
