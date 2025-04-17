// src/game/entities/SpaceStation.ts
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { EntityBase } from "./EntityBase";

export class SpaceStation extends EntityBase {
  private modelPath: string;
  private initialScale: number;
  private wireframeColor: THREE.ColorRepresentation;
  private rotationSpeed: number;

  constructor(
    scene: THREE.Scene,
    modelPath: string,
    initialScale: number = 1,
    wireframeColor: THREE.ColorRepresentation = 0xffff00,
    rotationSpeed: number = 0.02
  ) {
    super(scene);
    this.modelPath = modelPath;
    this.initialScale = initialScale;
    this.wireframeColor = wireframeColor;
    this.rotationSpeed = rotationSpeed;
  }

  static async loadCommonAssets(scene: THREE.Scene) {
    // Load and cache any shared geometry/materials/models here if needed
    // For SpaceStation, this could cache GLTF models if you want to reuse them
    return Promise.resolve();
  }

  async load(): Promise<void> {
    return new Promise((resolve, reject) => {
      const loader = new GLTFLoader();
      loader.load(
        this.modelPath,
        (gltf) => {
          console.log(`Successfully loaded ${this.modelPath}`);
          this.mesh = gltf.scene.clone();
          this.mesh.scale.set(
            this.initialScale,
            this.initialScale,
            this.initialScale
          );
          this.mesh.visible = false; // Start hidden
          this.visible = false;
          this.mesh.name = "SpaceStation";

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
              mesh.material.needsUpdate = true;
            }
          });

          resolve();
        },
        undefined,
        (error) => {
          console.error(`Error loading ${this.modelPath}:`, error);
          this.mesh = null;
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

  update(deltaTime: number): void {
    if (this.mesh && this.visible) {
      // Slow rotation
      this.mesh.rotation.y += this.rotationSpeed * deltaTime;
    }
  }
}