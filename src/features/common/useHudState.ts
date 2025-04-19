import { atom, useAtom } from "jotai";
import { RadarPosition } from "@/types";

// --- Atoms ---
const coordinatesAtom = atom<[number, number, number]>([0, 0, 0]);
const speedAtom = atom<number>(0); // 0-100%
const rollAtom = atom<number>(0); // -1 to 1
const pitchAtom = atom<number>(0); // -1 to 1 (Dive/Climb)
const laserHeatAtom = atom<number>(0); // 0-100%
const altitudeAtom = atom<number>(0); // 0-100%
const stationDirectionAtom = atom<{
  x: number;
  y: number;
  offCenterAmount: number;
  isInFront: boolean;
} | null>(null);
const radarPositionsAtom = atom<RadarPosition[]>([]);

// --- Hook ---
export function useHudState() {
  const [coordinates, setCoordinates] = useAtom(coordinatesAtom);
  const [speed, setSpeed] = useAtom(speedAtom);
  const [roll, setRoll] = useAtom(rollAtom);
  const [pitch, setPitch] = useAtom(pitchAtom);
  const [laserHeat, setLaserHeat] = useAtom(laserHeatAtom);
  const [altitude, setAltitude] = useAtom(altitudeAtom);
  const [stationDirection, setStationDirection] = useAtom(stationDirectionAtom);
  const [radarPositions, setRadarPositions] = useAtom(radarPositionsAtom);

  return {
    coordinates,
    setCoordinates,
    speed,
    setSpeed,
    roll,
    setRoll,
    pitch,
    setPitch,
    laserHeat,
    setLaserHeat,
    altitude,
    setAltitude,
    stationDirection,
    setStationDirection,
    radarPositions, // Note: This is the array from the atom
    setRadarPositions,
    // Rename radarPositions to radarPosition for BottomHud consistency if needed elsewhere
    // radarPosition: radarPositions,
  };
}
