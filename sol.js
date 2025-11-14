function setup() {
  // Create a 600x600 pixel drawing area (the canvas for p5.js)
  createCanvas(600, 600);

  // Create the Sun:
  // new Planet(radius, distance, orbitspeed, angle)
  // radius = 50 (biggest object)
  // distance = 0 (it's the center)
  // orbitspeed = 0 (sun does not orbit anything)
  // angle = random(TWO_PI) gives a random initial rotation
  sun = new Planet(50, 0, 0, random(TWO_PI));

  // Generate 5 planets orbiting the sun.
  // The second argument "1" indicates this is level 1 in the hierarchy.
  // They can recursively generate moons down to level 3.
  sun.spawnMoons(5, 1);
}

function draw() {
  // Set the background color of the canvas (dark gray)
  background(51);

  // Move the origin (0,0) to the center of the canvas
  // so the solar system appears centered in the middle of the screen
  translate(width / 2, height / 2);

  // Draw the sun and all planets/moons recursively
  sun.show();

  // Update the positions of all orbiting bodies
  sun.orbit();
}
