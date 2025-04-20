import { atom, useAtom } from "jotai";
import { GameAssets } from "@/types";
import * as Constants from "@/constants";
import { useCallback } from "react";

export const assetsAtom = atom<GameAssets | null>(null);
export const assetsLoadingCompleteAtom = atom(false);

export function useAssets() {
  const [assets, setAssets] = useAtom(assetsAtom);
  const [isLoadingComplete, setIsLoadingComplete] = useAtom(
    assetsLoadingCompleteAtom
  );

  const load = useCallback(async () => {
    console.log("[useAssets] Starting asset loading...");
    if (isLoadingComplete) {
      console.log("[useAssets] Assets already loaded.");
      return;
    }

    setIsLoadingComplete(false);

    try {
      const shipFilePaths = [
        "assets/ships/ship-cobra.gltf",
        "assets/ships/ship-pirate.gltf",
        "assets/ships/asteroid.gltf",
      ];
      const spaceStationPath = "assets/ships/spacestation.gltf";
      const pirateShipPath = "assets/ships/ship-pirate.gltf";
      const planetRadius = Constants.CAMERA_FAR_PLANE * 0.05;

      const configuredAssets: GameAssets = {
        planet: {
          radius: planetRadius,
          color: 0x44aa44,
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
        undockingSquares: [],
      };

      setAssets(configuredAssets);
      setIsLoadingComplete(true);
    } catch (error) {
      console.error("[useAssets] Failed to load assets:", error);
      setIsLoadingComplete(false);
    }
  }, [setAssets, setIsLoadingComplete]);

  return { load, assets, isLoadingComplete };
}
