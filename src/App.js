import React, { Component } from 'react';
import { Stage } from 'react-konva';
import FlowerOfLife from './FlowerOfLife';

class App extends Component {
  render() {
    const radiusOfCircle = 111;
    const circleLineWidth = 3;
    const circleColour = 'black';
    const windowCenter = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    };

    return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <FlowerOfLife
          radiusOfCircle={radiusOfCircle}
          circleLineWidth={circleLineWidth}
          circleColour={circleColour}
          centerOfMainCircle={windowCenter}
        />
      </Stage>
    );
  }
}

export default App;
