// market.ts — Commodity & Market logic for Elite‑style trading
// ------------------------------------------------------------
// Implements deterministic “base” prices & quantities per planet,
// plus a very small random jitter each time the commander docks.
//
// The algorithm follows the design notes we discussed:
// • Base determined by planet economy + tech level
// • A planet that never produces a good will *always* have 0 stock
// • A planet that does produce a good can fluctuate a little (±‑5 % price,
//   ±‑10 % quantity) on every visit
//
// Usage example:
//     const visit = 0; // increment every time you dock
//     const market = MarketGenerator.generate(planet, galaxySeed, visit);
//     console.log(market.get("Food")); // { price: 5, quantity: 46 }

import {
  PlanetInfo,
  EconomyType,
  TechLevel,
  getTechLevelNumber,
} from "@/classes/PlanetInfo";
import { SimplePRNG } from "@/classes/SimplePRNG";

export interface CommodityDefinition {
  /** Unique key / name */
  key: string;
  /** Base average price in credits */
  basePrice: number;
  /** Base average quantity available */
  baseQuantity: number;
  /** Unit of measurement (tonnes, kilograms, grams) */
  unit: "t" | "kg" | "g"; // Added unit
  /** Economy production map: price∆ / quantity multiplier */
  econEffect?: Partial<Record<EconomyType, { dp: number; qMult: number }>>;
  /** Minimum tech level required before a planet can *ever* stock it */
  minTechLevel?: TechLevel;
}

export const COMMODITIES: CommodityDefinition[] = [
  // Original items + Added from video + Example units
  {
    key: "Food",
    basePrice: 6,
    baseQuantity: 40,
    unit: "t",
    econEffect: {
      "Poor Agricultural": { dp: -1, qMult: 1.3 },
      Agricultural: { dp: -1, qMult: 1.4 },
      "Rich Agricultural": { dp: -2, qMult: 1.6 },
      "Poor Industrial": { dp: +1, qMult: 0.7 },
      Industrial: { dp: +1, qMult: 0.6 },
      "Rich Industrial": { dp: +2, qMult: 0.5 },
    },
  },
  {
    key: "Textiles",
    basePrice: 8,
    baseQuantity: 35,
    unit: "t",
    econEffect: {
      "Poor Agricultural": { dp: -1, qMult: 1.2 },
      Agricultural: { dp: -1, qMult: 1.2 },
      "Rich Agricultural": { dp: -2, qMult: 1.3 },
      Industrial: { dp: +1, qMult: 0.6 },
    },
  },
  {
    key: "Radioactives",
    basePrice: 20,
    baseQuantity: 15,
    unit: "t",
    minTechLevel: "TL3",
  },
  {
    key: "Slaves",
    basePrice: 40,
    baseQuantity: 5,
    unit: "t",
    econEffect: {
      Anarchy: { dp: -5, qMult: 2.0 },
      Dictatorship: { dp: -3, qMult: 1.5 },
      Democracy: { dp: +20, qMult: 0.1 },
    },
  }, // Example effects
  {
    key: "Liquor/Wines",
    basePrice: 25,
    baseQuantity: 20,
    unit: "t",
    econEffect: {
      "Rich Agricultural": { dp: -3, qMult: 1.5 },
      Tourism: { dp: +5, qMult: 1.2 },
    },
  },
  {
    key: "Luxuries",
    basePrice: 90,
    baseQuantity: 5,
    unit: "t",
    minTechLevel: "TL4",
    econEffect: {
      Tourism: { dp: -10, qMult: 2.0 },
      "Rich Industrial": { dp: -5, qMult: 1.5 },
    },
  },
  {
    key: "Narcotics",
    basePrice: 70,
    baseQuantity: 8,
    unit: "t",
    minTechLevel: "TL2",
    econEffect: {
      Anarchy: { dp: -10, qMult: 2.5 },
      "Poor Industrial": { dp: -5, qMult: 1.8 },
    },
  },
  {
    key: "Computers",
    basePrice: 100,
    baseQuantity: 4,
    unit: "t",
    minTechLevel: "TL3",
    econEffect: {
      "High Tech": { dp: -20, qMult: 3.0 },
      "Rich Industrial": { dp: -10, qMult: 2.0 },
      Industrial: { dp: -5, qMult: 1.2 },
      "Poor Agricultural": { dp: +25, qMult: 0.1 },
      "Rich Agricultural": { dp: +20, qMult: 0.15 },
    },
  },
  {
    key: "Machinery",
    basePrice: 60,
    baseQuantity: 10,
    unit: "t",
    minTechLevel: "TL2",
    econEffect: {
      Industrial: { dp: -5, qMult: 1.8 },
      "Rich Industrial": { dp: -8, qMult: 2.2 },
    },
  },
  {
    key: "Alloys",
    basePrice: 32,
    baseQuantity: 25,
    unit: "t",
    econEffect: {
      Refinery: { dp: -5, qMult: 1.8 },
      "Poor Industrial": { dp: -2, qMult: 1.3 },
      Industrial: { dp: 0, qMult: 1.1 },
      Extraction: { dp: +4, qMult: 0.5 },
    },
  },
  {
    key: "Firearms",
    basePrice: 75,
    baseQuantity: 8,
    unit: "t",
    minTechLevel: "TL4",
    econEffect: {
      Anarchy: { dp: -10, qMult: 1.5 },
      Dictatorship: { dp: -5, qMult: 1.2 },
      "Rich Industrial": { dp: -8, qMult: 1.4 },
    },
  },
  {
    key: "Furs",
    basePrice: 70,
    baseQuantity: 6,
    unit: "t",
    econEffect: {
      "Poor Agricultural": { dp: -8, qMult: 2.2 },
      "Rich Agricultural": { dp: -10, qMult: 2.5 },
      Tourism: { dp: +12, qMult: 0.4 },
      "High Tech": { dp: +15, qMult: 0.2 },
    },
  },
  {
    key: "Minerals",
    basePrice: 12,
    baseQuantity: 30,
    unit: "t",
    econEffect: {
      Extraction: { dp: -2, qMult: 1.5 },
      Refinery: { dp: -1, qMult: 1.2 },
    },
  },
  {
    key: "Gold",
    basePrice: 160,
    baseQuantity: 1,
    unit: "kg", // Changed unit
    econEffect: {
      Extraction: { dp: -25, qMult: 4 },
      Refinery: { dp: -10, qMult: 2 },
      Tourism: { dp: +20, qMult: 0.5 },
    },
    minTechLevel: "TL5",
  },
  {
    key: "Platinum",
    basePrice: 200,
    baseQuantity: 0.5,
    unit: "kg",
    minTechLevel: "TL6",
    econEffect: {
      Extraction: { dp: -30, qMult: 4 },
      Refinery: { dp: -15, qMult: 2 },
    },
  }, // Example
  {
    key: "Gem-Stones",
    basePrice: 20,
    baseQuantity: 10,
    unit: "g",
    minTechLevel: "TL4",
    econEffect: {
      Extraction: { dp: -5, qMult: 2.0 },
      Tourism: { dp: +5, qMult: 1.5 },
    },
  }, // Example
  {
    key: "Alien Items",
    basePrice: 60,
    baseQuantity: 2,
    unit: "t",
    minTechLevel: "TL7",
    econEffect: {
      "High Tech": { dp: -10, qMult: 1.5 },
      Anarchy: { dp: 0, qMult: 1.2 },
    },
  }, // Example
];

// ---------------------------------------------------------------------------
// Utility Helpers
// ---------------------------------------------------------------------------

/** Helper to get the unit definition for a commodity */
export const getCommodityUnit = (key: string): CommodityDefinition["unit"] => {
  const commodityDef = COMMODITIES.find((c) => c.key === key);
  return commodityDef?.unit || "t"; // Default to tonnes if not found
};

/** Helper to get the weight in tonnes for 1 unit of a commodity */
export const getTonnesPerUnit = (key: string): number => {
  const unit = getCommodityUnit(key);
  if (unit === "kg") return 0.001; // 1 kg = 0.001 t
  if (unit === "g") return 0.000001; // 1 g = 0.000001 t
  return 1; // Default: 1 unit = 1 tonne
};

// ---------------------------------------------------------------------------
// 2. Market snapshot returned to the game UI
// ---------------------------------------------------------------------------
export interface CommodityState {
  price: number; // in credits
  quantity: number; // units available
}

export class MarketSnapshot {
  readonly timestamp: number; // visit serial (0,1,2,…)
  readonly table: Map<string, CommodityState>;

  constructor(timestamp: number, table: Map<string, CommodityState>) {
    this.timestamp = timestamp;
    this.table = table;
  }

  /** Get price+stock for a given commodity key */
  get(key: string): CommodityState | undefined {
    return this.table.get(key);
  }

  /** Iterate through all commodities */
  entries(): IterableIterator<[string, CommodityState]> {
    return this.table.entries();
  }
}

// ---------------------------------------------------------------------------
// 3. Generator
// ---------------------------------------------------------------------------
export class MarketGenerator {
  /**
   * Create a MarketSnapshot for a given planet and visit number.
   * @param planet           The planet we are docked at
   * @param galaxySeed       The base galaxy seed (so two different games diverge)
   * @param visitSerial      0 on first arrival, +1 for every redock
   */
  static generate(
    planet: PlanetInfo,
    galaxySeed: number,
    visitSerial = 0
  ): MarketSnapshot {
    // Derive a deterministic seed: combine galaxySeed, planet coords & visit serial
    const seed = MarketGenerator.combineSeed(
      galaxySeed,
      planet.coordinates.x,
      planet.coordinates.y,
      visitSerial
    );
    const rng = new SimplePRNG(seed);

    const table = new Map<string, CommodityState>();

    for (const c of COMMODITIES) {
      // Check tech gate
      if (
        c.minTechLevel &&
        getTechLevelNumber(planet.techLevel) <
          getTechLevelNumber(c.minTechLevel)
      ) {
        continue; // never appears on under‑developed worlds
      }

      // Determine economy adjustment
      const econAdj = c.econEffect?.[planet.economyType];
      const dPrice = econAdj?.dp ?? 0;
      const qMult = econAdj?.qMult ?? 1;

      // Determine tech adjustment (simple linear scale)
      const techLevelNum = getTechLevelNumber(planet.techLevel);
      const techAdj = (techLevelNum - 3) * 2; // ±14 cr. at extremes

      // Base price and quantity before jitter
      let price = Math.max(1, c.basePrice + dPrice - techAdj);
      let quantity = Math.round(c.baseQuantity * qMult);

      // Apply small visit‑specific jitter (±5 % price, ±10 % quantity)
      const priceJitter = (rng.next() - 0.5) * 0.1; // ±5 %
      const qtyJitter = (rng.next() - 0.5) * 0.2; // ±10 %

      price = Math.max(1, Math.round(price * (1 + priceJitter)));
      quantity = Math.max(0, Math.round(quantity * (1 + qtyJitter)));

      // If quantity is zero *and* the base quantity was zero (non‑producing), skip
      if (quantity === 0 && c.baseQuantity === 0) continue;

      // Ensure non-producers *never* have stock if econ effect didn't add it
      if (c.baseQuantity === 0 && qMult <= 1 && quantity > 0) {
        quantity = 0;
      }
      // Ensure producers always have at least *some* chance of stock if qMult > 0
      // But allow 0 if jitter rolls low. Skip adding if zero.
      if (quantity === 0 && qMult > 0) {
        // table.set(c.key, { price, quantity }); // Still list price even if 0 qty
        continue; // Or maybe don't list it at all if qty is 0? Let's not list.
      }

      // Only add to market if quantity > 0 or price > 0 (should always be true for price)
      if (quantity > 0 || price > 0) {
        table.set(c.key, { price, quantity });
      }
    }

    return new MarketSnapshot(visitSerial, table);
  }

  // --------------------------------------------------
  // Helpers
  // --------------------------------------------------
  private static combineSeed(
    galaxySeed: number,
    x: number,
    y: number,
    visitSerial: number
  ): number {
    // Simple, fast mix — not crypto‑strong but fine for gameplay
    let h = galaxySeed ^ (x << 16) ^ (y << 8) ^ visitSerial;
    h = (h ^ (h >>> 15)) * 0x2c1b3c6d;
    h = (h ^ (h >>> 12)) * 0x297a2d39;
    h = h ^ (h >>> 15);
    return (h >>> 0) % 2147483647; // fit LCG modulus
  }
}
