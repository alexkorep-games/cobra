// src/game/entities/Planet.ts
import * as THREE from "three";
import { EntityBase } from "./EntityBase";

export class Planet extends EntityBase {
  private radius: number;
  private color: THREE.ColorRepresentation;
  private rotationSpeed: number;

  constructor(
    scene: THREE.Scene,
    radius: number,
    color: THREE.ColorRepresentation = 0xff0000,
    rotationSpeed: number = 0.005
  ) {
    super(scene);
    this.radius = radius;
    this.color = color;
    this.rotationSpeed = rotationSpeed;
  }

  async load(): Promise<void> {
    // Simple geometry, no async loading needed, but conform to interface
    const geometry = new THREE.SphereGeometry(this.radius, 128, 64);
    const material = new THREE.MeshStandardMaterial({ // Use Standard for potential lighting
      color: this.color,
      roughness: 0.9,
      metalness: 0.1,
    });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.name = "Planet";
    this.mesh.visible = false; // Start hidden
    this.visible = false;
    // No need to add to scene here, GameManager will do it after load
    return Promise.resolve();
  }

  update(deltaTime: number): void {
    if (this.mesh && this.visible) {
      this.mesh.rotation.y += this.rotationSpeed * deltaTime;
    }
  }
}