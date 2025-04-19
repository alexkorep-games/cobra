// src/features/title/TitleSceneR3F.tsx
import React from "react";
import { GameAssets } from "@/types";
import { useTitleLogic } from "./useTitleLogic";
import ShipComponent from "@/components/r3f/ShipComponent";
import PlanetComponent from "@/components/r3f/PlanetComponent";
import * as Constants from "@/constants"; // For default values if needed

interface TitleSceneR3FProps {
  assets: GameAssets | null;
  introMusicRef: React.RefObject<HTMLAudioElement | null>;
}

const TitleSceneR3F: React.FC<TitleSceneR3FProps> = ({
  assets,
  introMusicRef,
}) => {
  // Call the hook HERE, inside an R3F component
  const { visualState } = useTitleLogic(assets, introMusicRef);

  // Ensure assets and visualState are loaded before trying to render
  if (!assets || !visualState) {
    return null; // Or a fallback if necessary
  }

  return (
    <>
      {/* Title Ships */}
      {assets.titleShips.map((shipConfig, index) => {
        const shipVisuals = visualState.ships[index];
        if (!shipVisuals) return null; // Guard if visual state isn't synced yet

        return (
          <ShipComponent
            key={`title-ship-${index}`}
            modelPath={shipConfig.modelPath}
            initialScale={Constants.SHIP_SCALE}
            wireframeColor={0x00ffff} // Cyan
            visible={shipVisuals.visible}
            position={shipVisuals.position}
            rotation={shipVisuals.rotation}
          />
        );
      })}

      {/* Title Planet */}
      {assets.planet && visualState.planet && (
        <PlanetComponent
          radius={assets.planet.radius}
          color={assets.planet.color}
          visible={visualState.planet.visible}
          position={visualState.planet.position}
          // Rotation might be handled internally by PlanetComponent's useFrame now
        />
      )}
    </>
  );
};

export default TitleSceneR3F;
