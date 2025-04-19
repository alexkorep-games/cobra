import { atom, useAtom } from "jotai";
import { GameAssets } from "@/types";
import * as Constants from "@/constants";

export const assetsAtom = atom<GameAssets | null>(null);
export const isLoadingAtom = atom(false);

export function useAssets() {
  const [assets, setAssets] = useAtom(assetsAtom);
  const [isLoadingComplete, setIsLoadingComplete] = useAtom(isLoadingAtom);

  const load = async () => {
    setIsLoadingComplete(false);

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
  };

  return { load, assets, isLoadingComplete };
}
