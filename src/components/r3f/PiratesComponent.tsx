// src/components/r3f/PiratesComponent.tsx
import React, { useRef, useEffect, useState, useCallback, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { RadarPosition } from "@/types";
import * as Constants from "@/constants";
import ShipComponent from "@/components/r3f/ShipComponent";
import { AssetConfig } from "@/hooks/useAssets"; // Assuming AssetConfig type exists

interface PirateState {
  id: number;
  position: THREE.Vector3;
  quaternion: THREE.Quaternion;
  visible: boolean;
  modelPath: string;
  velocity: THREE.Vector3;
  // Add health etc. later if needed
}

interface PiratesComponentProps {
  playerCamera: THREE.Camera; // Pass the player's camera object
  pirateConfigs: AssetConfig[]; // Pass the configuration for pirates
  initialPlayerPosition: THREE.Vector3; // Needed for initial placement
  onPirateRadarUpdate: (radarPositions: RadarPosition[]) => void; // Callback for radar data
}

// Helper for random positioning (kept local as it's specific to initialization here)
const positionObjectRandomly = (
  position: THREE.Vector3,
  quaternion: THREE.Quaternion,
  baseDistance: number,
  offsetRange: THREE.Vector2,
  relativeTo: THREE.Vector3
) => {
  const distance =
    baseDistance *
    THREE.MathUtils.lerp(offsetRange.x, offsetRange.y, Math.random());
  const phi = Math.random() * Math.PI * 2;
  const theta = Math.acos(Math.random() * 2 - 1);

  position.set(
    distance * Math.sin(theta) * Math.cos(phi),
    distance * Math.sin(theta) * Math.sin(phi),
    distance * Math.cos(theta)
  );
  position.add(relativeTo); // Add the relative offset
  quaternion.random();
};

const PiratesComponent: React.FC<PiratesComponentProps> = React.memo(({
  playerCamera,
  pirateConfigs,
  initialPlayerPosition,
  onPirateRadarUpdate,
}) => {
  const [pirateStates, setPirateStates] = useState<PirateState[]>([]);
  const pirateShipRefs = useRef<(THREE.Group | null)[]>([]);

  // --- Temporary Vectors for Calculations (unique to this component) ---
  const tempVector = useRef(new THREE.Vector3()).current;
  const tempVector2 = useRef(new THREE.Vector3()).current;

  // --- Initialization ---
  useEffect(() => {
    console.log("[PiratesComponent] Initializing Pirates");
    const initialPirates = pirateConfigs.map((config, index) => {
      const pirate: PirateState = {
        id: index, // Use index as ID for simplicity, consider more robust IDs if needed
        position: new THREE.Vector3(),
        quaternion: new THREE.Quaternion(),
        visible: true,
        modelPath: config.modelPath,
        velocity: new THREE.Vector3(),
      };
      // Position Pirates relative to player start
      positionObjectRandomly(
        pirate.position,
        pirate.quaternion,
        Constants.PIRATE_BASE_DISTANCE,
        Constants.PIRATE_POSITION_OFFSET_RANGE,
        initialPlayerPosition // Use initial player position for consistency
      );
      console.log(
        `[PiratesComponent] Pirate ${index} positioned at ${pirate.position.toArray()}`
      );
      return pirate;
    });
    setPirateStates(initialPirates);
    pirateShipRefs.current = initialPirates.map(() => null);
     // Initialize radar positions
    onPirateRadarUpdate([]);

    // Cleanup if needed (though unlikely for this init)
    return () => {
        console.log("[PiratesComponent] Cleaning up pirate states");
        // Optional: Clear refs if necessary, though React handles unmounting
        pirateShipRefs.current = [];
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pirateConfigs, initialPlayerPosition]); // Depend only on config and initial position

  // --- Pirate Logic (useFrame) ---
  useFrame((state, delta) => {
    // Clamp delta
    const dt = Math.min(delta, 0.05);

    let hasAnyPirateStateChanged = false;
    const nextPirateStates = pirateStates.map((pirate, index) => {
      const pirateRef = pirateShipRefs.current[index];
      if (!pirateRef || !pirate.visible) {
        return pirate;
      }

      const nextPosition = pirate.position.clone();
      const nextQuaternion = pirate.quaternion.clone();
      const nextVelocity = pirate.velocity.clone();

      const distanceToPlayerSq = nextPosition.distanceToSquared(
        playerCamera.position // Use player camera position from props
      );

      if (distanceToPlayerSq < Constants.PIRATE_ATTACK_RANGE_SQUARED) {
        tempVector.copy(playerCamera.position).sub(nextPosition).normalize();
        nextVelocity.lerp(
          tempVector.multiplyScalar(Constants.PIRATE_SPEED),
          dt * 1.5
        );
        // Aiming directly modifies the ref, so we capture the result
        pirateRef.lookAt(playerCamera.position);
        nextQuaternion.copy(pirateRef.quaternion);
      } else {
        nextVelocity.lerp(tempVector.set(0, 0, 0), dt * 0.5);
        // TODO: Add idle wandering rotation if desired
      }

      nextPosition.addScaledVector(nextVelocity, dt);

      const positionChanged = !nextPosition.equals(pirate.position);
      const quaternionChanged = !nextQuaternion.equals(pirate.quaternion);
      const velocityChanged = !nextVelocity.equals(pirate.velocity);

      if (positionChanged || quaternionChanged || velocityChanged) {
        hasAnyPirateStateChanged = true;
        return {
          ...pirate,
          position: nextPosition,
          quaternion: nextQuaternion,
          velocity: nextVelocity,
        };
      } else {
        return pirate;
      }
    });

    if (hasAnyPirateStateChanged) {
      setPirateStates(nextPirateStates);
    }

    // --- Calculate and Report Radar Positions ---
    const radarPositionsData: RadarPosition[] = [];
    const cameraMatrix = playerCamera.matrixWorldInverse; // Use player camera

    nextPirateStates.forEach((pirate) => { // Use nextPirateStates for latest positions
      if (pirate.visible) {
        tempVector2.copy(pirate.position).applyMatrix4(cameraMatrix); // Use tempVector2
        if (tempVector2.lengthSq() < Constants.RADAR_DISTANCE_SQUARED) {
          tempVector2.normalize();
          radarPositionsData.push({
            x: tempVector2.x,
            y: tempVector2.y,
            z: tempVector2.z,
          });
        }
      }
    });
    // Call the callback prop to update the parent component
    onPirateRadarUpdate(radarPositionsData);

  }); // End useFrame

  // --- Render Pirate Ships ---
  return (
    <>
      {pirateStates.map((pirate, index) => (
        <ShipComponent
          key={pirate.id} // Use stable key
          ref={(el) => (pirateShipRefs.current[index] = el)} // Assign ref
          modelPath={pirate.modelPath}
          initialScale={Constants.SHIP_SCALE}
          wireframeColor={0xff0000}
          visible={pirate.visible} // Controlled by state
          position={pirate.position}
          quaternion={pirate.quaternion}
        />
      ))}
    </>
  );
});

PiratesComponent.displayName = "PiratesComponent"; // For React DevTools

export default PiratesComponent;