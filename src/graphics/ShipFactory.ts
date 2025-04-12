import * as BABYLON from "@babylonjs/core";

export class ShipFactory {
  static createWireframeShip(name: string, scene: BABYLON.Scene): BABYLON.Mesh {
    // Create a simple box for the ship's body
    const body = BABYLON.MeshBuilder.CreateBox(
      `${name}-body`,
      { width: 1, height: 0.5, depth: 2 },
      scene
    ) as BABYLON.Mesh;

    // Create wireframe material
    const wireframeMaterial = new BABYLON.StandardMaterial(
      `${name}-wireframeMaterial`,
      scene
    );
    wireframeMaterial.emissiveColor = new BABYLON.Color3(1, 1, 1); // White color
    wireframeMaterial.wireframe = true;
    wireframeMaterial.disableLighting = true; // No lighting for wireframe

    // Apply the material to the body
    body.material = wireframeMaterial;

    // Create wings (optional, for a more interesting shape)
    const wingLeft = BABYLON.MeshBuilder.CreatePlane(
      `${name}-wingLeft`,
      { width: 1, height: 0.3 },
      scene
    ) as BABYLON.Mesh;
    wingLeft.position.x = -0.7;
    wingLeft.rotation.y = Math.PI / 4;
    wingLeft.parent = body;
    wingLeft.material = wireframeMaterial;


    const wingRight = BABYLON.MeshBuilder.CreatePlane(
      `${name}-wingRight`,
      { width: 1, height: 0.3 },
      scene
    ) as BABYLON.Mesh;
    wingRight.position.x = 0.7;
    wingRight.rotation.y = -Math.PI / 4;
    wingRight.parent = body;
    wingRight.material = wireframeMaterial;


    // Create a parent mesh to hold the ship parts (optional, for easier manipulation)
    const ship = new BABYLON.Mesh(name, scene);
    body.parent = ship;


    return ship;
  }
}