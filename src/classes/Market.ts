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
  /** Base average price in credits */
  basePrice: number;
  /** Base average quantity in t‑onnes */
  baseQuantity: number;
  /** Economy production map: price∆ / quantity multiplier */
  econEffect?: Partial<Record<EconomyType, { dp: number; qMult: number }>>;
  /** Minimum tech level required before a planet can *ever* stock it */
  minTechLevel?: TechLevel;
}

export const COMMODITIES: CommodityDefinition[] = [
  {
    key: "Food",
    basePrice: 6,
    baseQuantity: 40,
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
    econEffect: {
      "Poor Agricultural": { dp: -1, qMult: 1.2 },
      Agricultural: { dp: -1, qMult: 1.2 },
      "Rich Agricultural": { dp: -2, qMult: 1.3 },
      Industrial: { dp: +1, qMult: 0.6 },
    },
  },
  {
    key: "Computers",
    basePrice: 100,
    baseQuantity: 4,
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
    key: "Alloys",
    basePrice: 32,
    baseQuantity: 25,
    econEffect: {
      Refinery: { dp: -5, qMult: 1.8 },
      "Poor Industrial": { dp: -2, qMult: 1.3 },
      Industrial: { dp: 0, qMult: 1.1 },
      Extraction: { dp: +4, qMult: 0.5 },
    },
  },
  {
    key: "Furs",
    basePrice: 70,
    baseQuantity: 6,
    econEffect: {
      "Poor Agricultural": { dp: -8, qMult: 2.2 },
      "Rich Agricultural": { dp: -10, qMult: 2.5 },
      Tourism: { dp: +12, qMult: 0.4 },
      "High Tech": { dp: +15, qMult: 0.2 },
    },
  },
  {
    key: "Gold",
    basePrice: 160,
    baseQuantity: 1,
    econEffect: {
      Extraction: { dp: -25, qMult: 4 },
      Refinery: { dp: -10, qMult: 2 },
      Tourism: { dp: +20, qMult: 0.5 },
    },
  },
];

// ---------------------------------------------------------------------------
// 2. Market snapshot returned to the game UI
// ---------------------------------------------------------------------------
export interface CommodityState {
  price: number; // in credits
  quantity: number; // tonnes available
}

export class MarketSnapshot {
  readonly timestamp: number; // visit serial (0,1,2,…)
  private readonly table: Map<string, CommodityState>;

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

      table.set(c.key, { price, quantity });
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
