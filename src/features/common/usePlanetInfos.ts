import { atom, useAtom } from "jotai";
import { PlanetInfo } from "../../classes/PlanetInfo";

// Atoms to manage planet-related state
export const planetInfosAtom = atom<PlanetInfo[]>([]);
export const currentPlanetNameAtom = atom<string>("");
export const selectedPlanetNameAtom = atom<string | null>(null);

// Hook to use and update planet-related state
export function usePlanetInfos() {
  const [planetInfos, setPlanetInfos] = useAtom(planetInfosAtom);
  const [currentPlanetName, setCurrentPlanetName] = useAtom(
    currentPlanetNameAtom
  );
  const [selectedPlanetName, setSelectedPlanetName] = useAtom(
    selectedPlanetNameAtom
  );

  // Helper to get the current planet object
  const getCurrentPlanet = (): PlanetInfo | undefined => {
    return planetInfos.find((p) => p.name === currentPlanetName);
  };

  // Helper to get the selected planet object
  const getSelectedPlanet = (): PlanetInfo | undefined => {
    if (!selectedPlanetName) return undefined;
    return planetInfos.find((p) => p.name === selectedPlanetName);
  };

  return {
    planetInfos,
    setPlanetInfos,
    currentPlanetName,
    setCurrentPlanetName,
    selectedPlanetName,
    setSelectedPlanetName,
    getCurrentPlanet,
    getSelectedPlanet,
  };
}
