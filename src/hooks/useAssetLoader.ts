import { useState, useEffect } from "react";
import { GameAssets } from "@/types";
import * as Constants from "@/constants";

export function useAssetLoader() {
  const [assets, setAssets] = useState<GameAssets | null>(null);
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  useEffect(() => {
    let isMounted = true; // Flag to prevent state updates on unmounted component

    const configureAssets = async () => {
      console.log("Starting asset configuration...");
      setIsLoadingComplete(false); // Start loading

      // Simulate async loading if needed, e.g., fetching config files
      // await new Promise(resolve => setTimeout(resolve, 100)); // Example delay

      if (!isMounted) return; // Check if component is still mounted

      // Define paths and parameters
      const shipFilePaths = [
        "assets/ships/ship-cobra.gltf",
        "assets/ships/ship-pirate.gltf",
        "assets/ships/asteroid.gltf",
      ];
      const spaceStationPath = "assets/ships/spacestation.gltf";
      const pirateShipPath = "assets/ships/ship-pirate.gltf";
      const planetRadius = Constants.CAMERA_FAR_PLANE * 0.05; // Example radius

      const configuredAssets: GameAssets = {
        planet: {
          radius: planetRadius,
          color: 0x44aa44, // Example color
        },
        spaceStation: {
          modelPath: spaceStationPath,
        },
        titleShips: shipFilePaths.map((path) => ({
          modelPath: path,
        })),
        pirateShips: Array(Constants.PIRATE_COUNT)
          .fill(null)
          .map(() => ({
            modelPath: pirateShipPath,
          })),
        undockingSquares: [], // Config remains minimal
      };

      if (isMounted) {
        setAssets(configuredAssets);
        setIsLoadingComplete(true); // Finish loading
        console.log("Asset configuration complete.");
      }
    };

    configureAssets().catch((error) => {
      console.error("Error during asset configuration:", error);
      if (isMounted) {
        setIsLoadingComplete(true); // Mark as complete even on error to unblock
      }
    });

    // Cleanup function
    return () => {
      isMounted = false;
      console.log("Asset loader cleanup.");
    };
  }, []); // Run only once on mount

  return { assets, isLoadingComplete };
}
