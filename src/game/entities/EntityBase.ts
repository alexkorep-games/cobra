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
  public addToScene(scene: THREE.Scene): void {
    if (!scene) {
      console.warn('Attempted to add entity to null scene');
      return;
    }
    if (this.mesh) {
      // Check if already added to prevent duplicates
      if (!scene.children.includes(this.mesh)) {
        scene.add(this.mesh);
      }
      this.visible = this.mesh.visible;
    } else {
      console.warn('Attempted to add null mesh to scene');
    }
  }

  // Remove the entity's mesh from the scene
  public removeFromScene(): void {
    if (this.mesh) {
      this.scene?.remove(this.mesh); // Use optional chaining for scene
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
    this.removeFromScene(); // Remove from scene first
    if (this.mesh) {
      // Traverse the object hierarchy
      this.mesh.traverse((object) => {
        // Dispose geometries
        if (object instanceof THREE.Mesh || object instanceof THREE.SkinnedMesh || object instanceof THREE.Line || object instanceof THREE.Points) {
          if (object.geometry) {
            object.geometry.dispose();
            // console.log(`Disposed geometry for ${object.name || object.type}`);
          }
        }

        // Dispose materials and textures
        if (object instanceof THREE.Mesh || object instanceof THREE.SkinnedMesh) {
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => {
            if (material) {
              // Dispose textures attached to the material
              Object.values(material).forEach((value) => {
                if (value instanceof THREE.Texture) {
                  value.dispose();
                  // console.log(`Disposed texture for material`);
                }
              });
              // Dispose the material itself if the method exists
              if (typeof material.dispose === 'function') {
                material.dispose();
                // console.log(`Disposed material`);
              }
            }
          });
        } else if (object instanceof THREE.LineBasicMaterial || object instanceof THREE.PointsMaterial || object instanceof THREE.SpriteMaterial) {
             // Handle basic materials that might be used directly
             if (typeof object.material?.dispose === 'function') {
                 object.material.dispose();
             }
        }
      });
    }
    // console.log(`Disposed entity ${this.mesh?.name}`);
    this.mesh = null; // Clear the reference
  }
}