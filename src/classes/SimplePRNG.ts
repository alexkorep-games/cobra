// Basic Seeded PRNG (Linear Congruential Generator - LCG)
export class SimplePRNG {
  private seed: number;

  constructor(seed: number) {
    this.seed = seed % 2147483647;
    if (this.seed <= 0) this.seed += 2147483646;
  }

  // Returns a pseudo-random number between 0 (inclusive) and 1 (exclusive)
  next(): number {
    this.seed = (this.seed * 16807) % 2147483647;
    return (this.seed - 1) / 2147483646;
  }

  // Returns a pseudo-random integer between min (inclusive) and max (inclusive)
  nextInt(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }

  // Selects a random element from an array
  select<T>(arr: T[]): T {
    return arr[this.nextInt(0, arr.length - 1)];
  }
}
