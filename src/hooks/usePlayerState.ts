// src/hooks/usePlayerState.ts
import { atom, useAtom } from "jotai";
import { COMMODITIES, getTonnesPerUnit } from "@/classes/Market"; // Import getTonnesPerUnit

// Define the structure for player state
// interface PlayerState {
//   cash: number;
//   fuel: number; // In Light Years
//   maxFuel: number; // Max fuel capacity
//   cargoHold: Map<string, number>; // Commodity Key -> Quantity
//   cargoCapacity: number; // Max tonnes
//   shipEquipment: Set<string>; // Names of installed equipment
//   missiles: number;
//   legalStatus: string;
//   rating: string;
//   // currentSystem: string; // Maybe keep in usePlanetInfos to avoid duplication
// }

// Define atoms with initial values
const cashAtom = atom<number>(100.0);
const fuelAtom = atom<number>(7.0);
const maxFuelAtom = atom<number>(7.0); // Example: Max 7 LY fuel tank
const cargoHoldAtom = atom<Map<string, number>>(new Map()); // Start empty
const cargoCapacityAtom = atom<number>(20); // Example: 20 tonnes capacity
const shipEquipmentAtom = atom<Set<string>>(
  new Set(["Pulse Laser (Fore)", "Missile (3)"])
); // Example start
const missilesAtom = atom<number>(3); // Synced with equipment for now
const legalStatusAtom = atom<string>("Clean");
const ratingAtom = atom<string>("Harmless");

// Hook to interact with player state
export function usePlayerState() {
  const [cash, setCash] = useAtom(cashAtom);
  const [fuel, setFuel] = useAtom(fuelAtom);
  const [maxFuel] = useAtom(maxFuelAtom); // Read-only for now
  const [cargoHold, setCargoHold] = useAtom(cargoHoldAtom);
  const [cargoCapacity] = useAtom(cargoCapacityAtom); // Read-only for now
  const [shipEquipment, setShipEquipment] = useAtom(shipEquipmentAtom);
  const [missiles, setMissiles] = useAtom(missilesAtom);
  const [legalStatus, setLegalStatus] = useAtom(legalStatusAtom);
  const [rating, setRating] = useAtom(ratingAtom);

  // --- Derived State Calculation ---
  const getCargoUsed = (): number => {
    let used = 0;
    cargoHold.forEach((quantity, key) => {
      const tonnesPerUnit = getTonnesPerUnit(key); // Use helper function
      used += quantity * tonnesPerUnit;
    });
    // Round to avoid floating point issues, e.g., to 3 decimal places
    return Math.round(used * 1000) / 1000;
  };

  // --- Actions ---
  const buyCargo = (commodityKey: string, quantity: number, cost: number) => {
    setCash((prev) => prev - cost);
    setCargoHold((prevMap) => {
      const newMap = new Map(prevMap);
      newMap.set(commodityKey, (newMap.get(commodityKey) || 0) + quantity);
      return newMap;
    });
  };

  const sellCargo = (
    commodityKey: string,
    quantity: number,
    earnings: number
  ) => {
    setCash((prev) => prev + earnings);
    setCargoHold((prevMap) => {
      const newMap = new Map(prevMap);
      const currentQty = newMap.get(commodityKey) || 0;
      const newQty = currentQty - quantity;
      if (newQty <= 0) {
        newMap.delete(commodityKey); // Remove item if quantity is zero or less
      } else {
        newMap.set(commodityKey, newQty);
      }
      return newMap;
    });
  };

  // Add other actions as needed (e.g., addEquipment, useFuel, changeStatus)
  const setFuelLevel = (newFuel: number) => {
    // Clamp fuel level between 0 and maxFuel
    setFuel(Math.max(0, Math.min(newFuel, maxFuel)));
  };

  const addEquipment = (equipmentName: string) => {
    setShipEquipment((prevSet) => {
      const newSet = new Set(prevSet);
      newSet.add(equipmentName);
      return newSet;
    });
    // Update missile count if applicable
    if (equipmentName.toLowerCase().includes("missile")) {
      // TODO: More robust missile tracking if needed
      setMissiles((prev) => prev + 1); // Simple increment for now
    }
  };

  const removeEquipment = (equipmentName: string) => {
    setShipEquipment((prevSet) => {
      const newSet = new Set(prevSet);
      newSet.delete(equipmentName);
      return newSet;
    });
    // Update missile count if applicable
    if (equipmentName.toLowerCase().includes("missile")) {
      // TODO: More robust missile tracking if needed
      setMissiles((prev) => Math.max(0, prev - 1)); // Simple decrement
    }
  };

  return {
    cash,
    setCash,
    fuel,
    maxFuel,
    cargoHold,
    cargoCapacity,
    getCargoUsed, // Expose the calculation function
    shipEquipment,
    missiles,
    legalStatus,
    rating,
    buyCargo,
    sellCargo,
    setFuelLevel,
    addEquipment,
    removeEquipment,
    setLegalStatus,
    setRating,
  };
}
