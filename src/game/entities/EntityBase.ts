// src/game/entities/EntityBase.ts
import * as THREE from "three";

export abstract class EntityBase {
  public mesh: THREE.Object3D | null = null; // The visual representation
  protected scene: THREE.Scene;
  public visible: boolean = false;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
  }

  // Abstract method for loading assets (models, textures, etc.)
  // Should return a promise that resolves when loading is complete
  abstract load(): Promise<void>;

  // Method to be called each frame
  abstract update(deltaTime: number): void;

  // Add the entity's mesh to the scene
  public addToScene(): void {
    if (this.mesh) {
      this.scene.add(this.mesh);
      this.visible = this.mesh.visible; // Sync state
    } else {
      console.warn("Attempted to add entity to scene before mesh was loaded.");
    }
  }

  // Remove the entity's mesh from the scene
  public removeFromScene(): void {
    if (this.mesh) {
      this.scene.remove(this.mesh);
    }
  }

  // Set visibility
  public setVisible(visible: boolean): void {
    if (this.mesh) {
      this.mesh.visible = visible;
      this.visible = visible;
    }
  }

  // Get position
  public getPosition(): THREE.Vector3 {
    return this.mesh?.position.clone() ?? new THREE.Vector3();
  }

  // Set position
  public setPosition(x: number, y: number, z: number): void {
    this.mesh?.position.set(x, y, z);
  }

  // Get rotation (as Euler)
  public getRotation(): THREE.Euler {
    return this.mesh?.rotation.clone() ?? new THREE.Euler();
  }

  // Set rotation (as Euler)
  public setRotation(x: number, y: number, z: number): void {
    this.mesh?.rotation.set(x, y, z);
  }

  // Get scale
  public getScale(): THREE.Vector3 {
    return this.mesh?.scale.clone() ?? new THREE.Vector3(1, 1, 1);
  }

  // Set scale
  public setScale(x: number, y: number, z: number): void {
    this.mesh?.scale.set(x, y, z);
  }

  // Clean up THREE.js resources
  public dispose(): void {
    this.removeFromScene();
    if (this.mesh) {
      this.mesh.traverse((object) => {
        if (
          object instanceof THREE.Mesh ||
          object instanceof THREE.Points ||
          object instanceof THREE.Line
        ) {
          object.geometry?.dispose();
          const materials = Array.isArray(object.material)
            ? object.material
            : [object.material];
          materials.forEach((material) => material?.dispose());
        }
      });
    }
    this.mesh = null;
  }
}