// src/game/entities/Ship.ts
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { EntityBase } from "./EntityBase";

export class Ship extends EntityBase {
  private modelPath: string;
  private initialScale: number;
  private wireframeColor: THREE.ColorRepresentation;

  constructor(
    scene: THREE.Scene,
    modelPath: string,
    initialScale: number = 1,
    wireframeColor: THREE.ColorRepresentation = 0xffff00
  ) {
    super(scene);
    this.modelPath = modelPath;
    this.initialScale = initialScale;
    this.wireframeColor = wireframeColor;
  }

  static async loadCommonAssets(scene: THREE.Scene) {
    // Load and cache any shared geometry/materials/models here if needed
    // For Ship, this could cache GLTF models if you want to reuse them
    return Promise.resolve();
  }

  async load(): Promise<void> {
    return new Promise((resolve, reject) => {
      const loader = new GLTFLoader();
      loader.load(
        this.modelPath,
        (gltf) => {
          console.log(`Successfully loaded ${this.modelPath}`);
          this.mesh = gltf.scene.clone(); // Clone to avoid shared instances
          this.mesh.scale.set(
            this.initialScale,
            this.initialScale,
            this.initialScale
          );
          this.mesh.visible = false; // Start hidden
          this.visible = false;
          this.mesh.name =
            this.modelPath.split("/").pop()?.split(".")[0] || "Ship"; // Set name from filename

          this.mesh.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              const mesh = child as THREE.Mesh;
              // Dispose of original materials if necessary
              if (mesh.material) {
                 if (Array.isArray(mesh.material)) {
                     mesh.material.forEach(m => m.dispose());
                 } else {
                     mesh.material.dispose();
                 }
              }
              // Apply new wireframe material
              mesh.material = new THREE.MeshBasicMaterial({
                color: this.wireframeColor,
                wireframe: true,
              });
              // Ensure material compatibility with logarithmic depth buffer
              mesh.material.needsUpdate = true;
            }
          });

          // No need to add to scene here, GameManager will do it after load
          resolve();
        },
        undefined, // Progress callback (optional)
        (error) => {
          console.error(`Error loading ${this.modelPath}:`, error);
          this.mesh = null; // Ensure mesh is null on error
          reject(error);
        }
      );
    });
  }

  addToScene(scene: THREE.Scene) {
    if (this.mesh && !scene.children.includes(this.mesh)) {
      scene.add(this.mesh);
      this.visible = this.mesh.visible;
    }
  }

  // Basic update - specific behaviors (like title animation) will be
  // controlled externally by manipulating the entity's properties/methods.
  update(deltaTime: number): void {
      // Example: Add intrinsic rotation if desired
      // if (this.mesh && this.visible) {
      //    this.mesh.rotation.y += 0.1 * deltaTime;
      // }
  }
}