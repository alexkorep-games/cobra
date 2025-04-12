import * as THREE from 'three';

export type GameState = 'title' | 'credits' | 'stats' | 'undocking' | 'game' | 'hyperspace' | 'trading' | 'map' | 'inventory';
export type ViewState = 'front' | 'rear' | 'left' | 'right';

export interface Equipment {
    type: 'laser' | 'missile';
    name: string;
    mount?: 'Fore' | 'Aft';
    count?: number;
}

export interface ShipState {
    position: THREE.Vector3;
    rotation: THREE.Euler;
    velocity: THREE.Vector3;
    speed: number;
    rollRate: number;
    pitchRate: number;
    yawRate: number;
    shields: {
        fore: number;
        aft: number;
    };
    energy: number;
    laserTemp: number;
    cabinTemp: number;
    altitude: number;
    cargo: string[];
    equipment: Equipment[];
    boundingBox?: THREE.Box3;
}

export interface PlayerState {
    commander: string;
    credits: number;
    fuel: number;
    currentSystem: StarSystem | null;
    targetSystem: StarSystem | null;
    legalStatus: 'Clean' | 'Offender' | 'Fugitive';
    combatRating: string;
    ship: ShipState;
    kills: number;
    bounty: number;
}

export interface StarSystem {
    name: string;
    x: number;
    y: number;
    z: number;
    economy: 'Agricultural' | 'Industrial' | 'Poor';
    government: 'Democracy' | 'Dictatorship' | 'Corporate' | 'Anarchy';
    techLevel: number;
    population: number;
    description: string;
}

export interface Commodity {
    name: string;
    basePrice: number;
    variance: number;
    illegal: boolean;
}

export interface GameConfig {
    maxSpeed: number;
    acceleration: number;
    deceleration: number;
    rotationSpeed: number;
    maxRollRate: number;
    shieldRechargeRate: number;
    hyperspaceFuelConsumption: number;
    laserCooldownRate: number;
    laserHeatRate: number;
    startingCredits: number;
    startingFuel: number;
    startingMissiles: number;
    maxNpcs: number;
    spawnDistance: number;
    spawnProbability: number;
    maxCargo: number;
    scanner_range: number;
}