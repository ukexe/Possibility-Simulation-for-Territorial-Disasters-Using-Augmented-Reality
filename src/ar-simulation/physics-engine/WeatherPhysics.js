/**
 * Weather physics engine for simulating weather effects
 */

import * as THREE from 'three';

export class WeatherPhysics {
  constructor() {
    this.particles = [];
    this.windForce = new THREE.Vector3();
    this.gravity = new THREE.Vector3(0, -9.81, 0);
    this.timeStep = 1/60;
  }

  setWindParameters(speed, direction) {
    const angleRad = (direction * Math.PI) / 180;
    this.windForce.set(
      Math.cos(angleRad) * speed,
      0,
      Math.sin(angleRad) * speed
    );
  }

  createParticle(position) {
    return {
      position: position.clone(),
      velocity: new THREE.Vector3(),
      mass: Math.random() * 0.1 + 0.1,
      lifetime: Math.random() * 2 + 1
    };
  }

  updateParticles(deltaTime) {
    const dt = deltaTime || this.timeStep;

    this.particles = this.particles.filter(particle => {
      // Update particle physics
      const acceleration = new THREE.Vector3()
        .copy(this.gravity)
        .add(this.windForce.clone().multiplyScalar(1 / particle.mass));

      particle.velocity.add(acceleration.multiplyScalar(dt));
      particle.position.add(particle.velocity.clone().multiplyScalar(dt));
      
      // Update lifetime
      particle.lifetime -= dt;
      
      // Remove particles that have exceeded their lifetime
      return particle.lifetime > 0;
    });
  }

  addParticles(count, spawnArea) {
    for (let i = 0; i < count; i++) {
      const position = new THREE.Vector3(
        Math.random() * spawnArea.x - spawnArea.x/2,
        spawnArea.y,
        Math.random() * spawnArea.z - spawnArea.z/2
      );
      this.particles.push(this.createParticle(position));
    }
  }

  getParticlePositions() {
    return this.particles.map(particle => particle.position);
  }

  clear() {
    this.particles = [];
  }
} 