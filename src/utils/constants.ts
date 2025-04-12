import { GameConfig } from '../types/game';

export const DEFAULT_GAME_CONFIG: GameConfig = {
    maxSpeed: 100,
    acceleration: 2,
    deceleration: 1,
    rotationSpeed: 0.05,
    maxRollRate: 0.1,
    shieldRechargeRate: 0.1,
    hyperspaceFuelConsumption: 1,
    laserCooldownRate: 0.5,
    laserHeatRate: 2,
    startingCredits: 100,
    startingFuel: 70,
    startingMissiles: 3,
    maxNpcs: 5,
    spawnDistance: 1000,
    spawnProbability: 0.1,
    maxCargo: 20,
    scanner_range: 5000
};

export const COMBAT_RATINGS = [
    'Harmless',
    'Mostly Harmless',
    'Poor',
    'Average',
    'Above Average',
    'Competent',
    'Dangerous',
    'Deadly',
    'Elite'
];