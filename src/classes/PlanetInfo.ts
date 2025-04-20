import { SimplePRNG } from "@/classes/SimplePRNG";

export type GovernmentType =
  | "Anarchy"
  | "Feudal"
  | "Dictatorship"
  | "Communist"
  | "Democracy"
  | "Corporate State"
  | "Confederacy";

export type EconomyType =
  | "Poor Agricultural"
  | "Agricultural"
  | "Rich Agricultural"
  | "Poor Industrial"
  | "Industrial"
  | "Rich Industrial"
  | "High Tech"
  | "Tourism"
  | "Refinery"
  | "Extraction";

export type TechLevel =
  | "TL0" // Pre-industrial
  | "TL1" // Basic Industrial
  | "TL2" // Mass Production
  | "TL3" // Early Spaceflight
  | "TL4" // Common Interstellar
  | "TL5" // Advanced Interstellar
  | "TL6" // Exotic/Experimental Tech
  | "TL7"; // Theoretical/Hyper Tech

export interface Coordinates {
  x: number;
  y: number;
}

export interface Coordinates3D {
  x: number;
  y: number;
  z: number;
}

// --- Planet Class ---

export class PlanetInfo {
  name: string;
  governmentType: GovernmentType;
  economyType: EconomyType;
  techLevel: TechLevel;
  population: number; // In millions
  productivity: number; // Arbitrary scale, e.g., 1-100
  radius: number; // In kilometers
  description: string;
  coordinates: Coordinates;
  playerSpawnPosition: Coordinates3D; // New property for player spawn position

  constructor(
    name: string,
    governmentType: GovernmentType,
    economyType: EconomyType,
    techLevel: TechLevel,
    population: number,
    productivity: number,
    radius: number,
    description: string,
    coordinates: Coordinates,
    playerSpawnPosition: Coordinates3D
  ) {
    this.name = name;
    this.governmentType = governmentType;
    this.economyType = economyType;
    this.techLevel = techLevel;
    this.population = population;
    this.productivity = productivity;
    this.radius = radius;
    this.description = description;
    this.coordinates = coordinates;
    this.playerSpawnPosition = playerSpawnPosition; // Initialize new property
  }
}

// --- Generation Function ---

const GOVERNMENTS: GovernmentType[] = [
  "Anarchy",
  "Feudal",
  "Dictatorship",
  "Communist",
  "Democracy",
  "Corporate State",
  "Confederacy",
];
const ECONOMIES: EconomyType[] = [
  "Poor Agricultural",
  "Agricultural",
  "Rich Agricultural",
  "Poor Industrial",
  "Industrial",
  "Rich Industrial",
  "High Tech",
  "Tourism",
  "Refinery",
  "Extraction",
];
const TECH_LEVELS: TechLevel[] = [
  "TL0",
  "TL1",
  "TL2",
  "TL3",
  "TL4",
  "TL5",
  "TL6",
  "TL7",
];

// Simple procedural name generation
const SYLLABLES1 = [
  "Al",
  "Bor",
  "Cor",
  "Den",
  "Eth",
  "Fen",
  "Gor",
  "Hel",
  "Io",
  "Jen",
  "Kel",
  "Lor",
  "Myr",
  "Nor",
  "Or",
  "Per",
  "Qor",
  "Ros",
  "Sol",
  "Tor",
  "Ur",
  "Ver",
  "Wor",
  "Xy",
  "Yar",
  "Zor",
];
const SYLLABLES2 = ["a", "e", "i", "o", "u"];
const SYLLABLES3 = [
  "bia",
  "don",
  "gar",
  "lia",
  "mar",
  "nia",
  "pia",
  "qua",
  "ria",
  "sia",
  "tia",
  "via",
  "xan",
  "yon",
  "zia",
];
const SUFFIXES = [
  " Prime",
  " Alpha",
  " Beta",
  " Gamma",
  " Delta",
  " Minor",
  " Major",
  " Station",
  " Colony",
  "",
]; // Added empty for variety

// Simple procedural description generation
const DESC_ADJ = [
  "arid",
  "lush",
  "frozen",
  "volcanic",
  "oceanic",
  "toxic",
  "barren",
  "temperate",
  "gaseous",
  "rocky",
];
const DESC_NOUN = [
  "deserts",
  "jungles",
  "ice caps",
  "lava flows",
  "oceans",
  "fumes",
  "plains",
  "forests",
  "storms",
  "mountains",
];
const DESC_FEATURE = [
  "ancient ruins",
  "strange monoliths",
  "orbital shipyards",
  "vast canyons",
  "floating cities",
  "a notorious pirate base",
  "rare crystal formations",
  "a unique biosphere",
  "frequent meteor showers",
  "a decaying Dyson sphere fragment",
];
const DESC_QUIRK = [
  "its unusually blue sun",
  "the triple moons",
  "the local delicacy, 'Grak'",
  "a surprisingly friendly robot population",
  "strict parking regulations",
  "its legendary zero-G hockey team",
  "rumors of a hidden alien artifact",
  "a planetary ring system made of discarded toasters",
  "laws mandating cheerful greetings",
  "a ban on the color beige",
];

// KMs from the planet center
const PLAYER_SPAWN_MAX_DISTANCE = 5_000_000;

function generatePlanetName(rng: SimplePRNG): string {
  let name =
    rng.select(SYLLABLES1) + rng.select(SYLLABLES2) + rng.select(SYLLABLES3);
  // Occasionally add a second part
  if (rng.next() > 0.7) {
    name += " " + rng.select(SYLLABLES1) + rng.select(SYLLABLES2);
  }
  // Occasionally add a suffix
  if (rng.next() > 0.5) {
    name += rng.select(SUFFIXES);
  }
  return name;
}

function generatePlanetDescription(rng: SimplePRNG): string {
  return `A mostly ${rng.select(DESC_ADJ)} world known for its ${rng.select(
    DESC_NOUN
  )}. Visitors often remark on the ${rng.select(DESC_FEATURE)} and ${rng.select(
    DESC_QUIRK
  )}.`;
}

export function generatePlanets(
  seed: number,
  count: number = 100
): PlanetInfo[] {
  const rng = new SimplePRNG(seed);
  const planets: PlanetInfo[] = [];
  const usedCoords = new Set<string>(); // Ensure unique coordinates
  const galaxyRadius = Math.sqrt(count)*2;

  for (let i = 0; i < count; i++) {
    const name = generatePlanetName(rng);
    const governmentType = rng.select(GOVERNMENTS);
    const economyType = rng.select(ECONOMIES);
    const techLevel = rng.select(TECH_LEVELS);
    const population = rng.nextInt(1, 10000); // In millions
    const productivity = rng.nextInt(1, 100);
    const radius = rng.nextInt(2000, 15000); // In km

    let x: number, y: number, coordKey: string;
    do {
      x = rng.nextInt(-galaxyRadius, galaxyRadius);
      y = rng.nextInt(-galaxyRadius, galaxyRadius);
      coordKey = `${x},${y}`;
    } while (usedCoords.has(coordKey)); // Find unique coordinates
    usedCoords.add(coordKey);
    const coordinates: Coordinates = { x, y };

    // Calculate player spawn position
    const spawnDistance = rng.nextInt(
      Math.floor(PLAYER_SPAWN_MAX_DISTANCE * 0.8),
      PLAYER_SPAWN_MAX_DISTANCE
    );
    const angle = rng.next() * Math.PI * 2; // Random angle in radians
    const verticalAngle = rng.next() * Math.PI; // Random vertical angle in radians
    const playerSpawnPosition: Coordinates3D = {
      x: coordinates.x + Math.cos(angle) * spawnDistance * Math.sin(verticalAngle),
      y: coordinates.y + Math.sin(angle) * spawnDistance * Math.sin(verticalAngle),
      z: coordinates.y + Math.cos(verticalAngle) * spawnDistance,
    };

    const description = generatePlanetDescription(rng);

    planets.push(
      new PlanetInfo(
        name,
        governmentType,
        economyType,
        techLevel,
        population,
        productivity,
        radius,
        description,
        coordinates,
        playerSpawnPosition
      )
    );
  }

  return planets;
}

// --- Utility function to calculate distance ---
export function calculateDistance(
  coord1: Coordinates,
  coord2: Coordinates
): number {
  const dx = coord1.x - coord2.x;
  const dy = coord1.y - coord2.y;
  // Assuming 2D distance for the chart, can be extended to 3D
  return Math.sqrt(dx * dx + dy * dy);
}

// Map Tech Level string to number for display
export function getTechLevelNumber(tl: TechLevel): number {
  return parseInt(tl.replace("TL", ""), 10);
}
