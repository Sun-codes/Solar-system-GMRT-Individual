// A class that represents a celestial sphere. Each celestial sphere can have its own celestial sphere.
class celestialSphere {
  constructor(radius, distance, orbitspeed, angle) {
    // radius of the celestial Sphere (size)
    this.radius = radius;
    // distance from its parent celestial Sphere (orbit distance)
    this.distance = distance;
    // how fast it rotates around its parent
    this.orbitspeed = orbitspeed;
    // current orbital angle (where it is in its orbit)
    this.angle = angle;
    // array to store moons or sub-celestial Spheres
    this.celestialSpheres = [];
  }

  // Update the angle to simulate orbit movement
  orbit() {
    // make the celestial Sphere move by increasing its angle
    this.angle += this.orbitspeed;

    // also make all its child celestial Spheres (moons) orbit
    for (let i in this.celestialSpheres) {
      this.celestialSpheres[i].orbit();
    }
  }

  // Create moons around this celestial Sphere
  spawnMoons(total, level) {
    // repeat for the number of moons requested
    for (let i = 0; i < total; i++) {
      // size of the moon becomes smaller as the level goes deeper
      let r = this.radius / (level * 2);

      // distance between 50 and 150 (random)
      let d = random(50, 150);

      // orbit speed between -0.1 and 0.1 (slower for moons)
      let o = random(-0.01, 0.01);

      // starting angle: anywhere in the circle
      let a = random(TWO_PI);

      // create the moon and push it into the array
      this.celestialSpheres.push(new celestialSphere(r, d / level, o, a));

      // recursively generate more moons if not too deep
      if (level < 3) {
        let num = Math.floor(random(0, 4)); // up to 3 sub-moons
        this.celestialSpheres[i].spawnMoons(num, level + 1);
      }
    }
  }

  // Draw the celestial Sphere on screen
  show() {
    push(); // save previous drawing state
    fill(255, 100); // color of celestial Sphere (semi-transparent)
    rotate(this.angle); // rotate canvas by current angle
    translate(this.distance, 0); // move to orbit position
    ellipse(0, 0, this.radius * 2); // draw the actual celestialSphere

    // draw all moons
    for (let i in this.celestialSpheres) {
      this.celestialSpheres[i].show();
    }

    pop(); // restore previous drawing state
  }
}
