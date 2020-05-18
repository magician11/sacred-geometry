# Sacred Geometry

Generating shapes like this..

![Flower of life](https://mensfellowship.net/wp-content/uploads/2014/11/ART400FlowerOfLife.jpg)

Built using https://konvajs.org/

## construction

Converting from polar to cartesian coordinates: [wikipedia](https://en.wikipedia.org/wiki/Polar_coordinate_system#Converting_between_polar_and_Cartesian_coordinates)

```
x = cx + r * cos(a)
y = cy + r * sin(a)

Where r is the radius, cx,cy the origin, and a the angle.
```

- https://stackoverflow.com/a/839931/2813041

The angle has to be in radians for [Math](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sin). To convert from degrees to radians [wikipedia](https://en.wikipedia.org/wiki/Radian#Conversion_between_radians_and_degrees)

## notes

- theory: https://en.wikipedia.org/wiki/Overlapping_circles_grid
- walkthrough: https://medium.com/@lavrton/using-react-with-html5-canvas-871d07d8d753
- native JS code
  - for graphics walkthrough: https://alligator.io/js/drawing-shapes-canvas-api/
  - https://codeburst.io/creating-and-drawing-on-an-html5-canvas-using-javascript-93da75f001c1
  - a smiley face: https://www.w3resource.com/javascript-exercises/javascript-drawing-exercise-5.php
  - details on the canvas: https://eloquentjavascript.net/17_canvas.html

## 3D shapes

React with three.js directly (with hooks) - https://codepen.io/WebSeed/pen/ZmXxKz
react-three-fibre - https://github.com/react-spring/react-three-fiber
to create 360 and VR experiences - https://facebook.github.io/react-360/

## specific shapes

- flower of life https://jsfiddle.net/5ak8P/
- https://www.sacred-geometry.es/?q=en/content/flower-life
