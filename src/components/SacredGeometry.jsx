import React from 'react';
import { Box } from '@mui/material';
import { Stage, Layer } from 'react-konva';
import { useDispatch } from 'react-redux';
import { styled } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
import Triangle from './shapes/Triangle';
import { centerOfScreen } from '../utils';
import SeedOfLife from './shapes/SeedOfLife';
import FlowerOfLife from './shapes/FlowerOfLife';
import Merkaba from './shapes/Merkaba';
import Cube from './shapes/Cube';
import spaceImage from '../images/space.jpg';

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundImage: `url(${spaceImage})`,
  height: '100vh',
  position: 'relative',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.69)'
  }
}));

const SacredGeometry = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const shapeLoaded = () =>
    dispatch({
      type: 'menu/setShowMenu',
      payload: true
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

  return <StyledBox>{shape}</StyledBox>;
};

export default SacredGeometry;
