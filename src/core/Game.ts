import * as THREE from 'three';
import { AudioManager } from './Audio';
import { GameState, PlayerState, ViewState } from '../types/game';
import { DEFAULT_GAME_CONFIG, COMBAT_RATINGS } from '../utils/constants';

export class Game {
    private renderer: THREE.WebGLRenderer;
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private audioManager: AudioManager;
    private gameState: GameState;
    private viewState: ViewState;
    private player: PlayerState;
    private animationFrameId = 0;

    constructor() {
        this.gameState = 'title';
        this.viewState = 'front';
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById('eliteCanvas') as HTMLCanvasElement,
            antialias: true
        });
        this.audioManager = new AudioManager();
        this.player = this.createInitialPlayerState();
        this.setupEventListeners();
    }

    private createInitialPlayerState(): PlayerState {
        return {
            commander: 'JAMESON',
            credits: DEFAULT_GAME_CONFIG.startingCredits,
            fuel: DEFAULT_GAME_CONFIG.startingFuel,
            currentSystem: null,
            targetSystem: null,
            legalStatus: 'Clean',
            combatRating: COMBAT_RATINGS[0],
            kills: 0,
            bounty: 0,
            ship: {
                position: new THREE.Vector3(),
                rotation: new THREE.Euler(),
                velocity: new THREE.Vector3(),
                speed: 0,
                rollRate: 0,
                pitchRate: 0,
                yawRate: 0,
                shields: {
                    fore: 100,
                    aft: 100
                },
                energy: 100,
                laserTemp: 0,
                cabinTemp: 20,
                altitude: 0,
                cargo: [],
                equipment: [
                    { type: 'laser', name: 'Pulse Laser', mount: 'Fore' },
                    { type: 'missile', name: 'Missile', count: DEFAULT_GAME_CONFIG.startingMissiles }
                ]
            }
        };
    }

    private setupEventListeners(): void {
        window.addEventListener('resize', () => this.onWindowResize());
        window.addEventListener('keydown', (e) => this.handleKeyPress(e));
    }

    private onWindowResize(): void {
        const width = window.innerWidth;
        const height = window.innerHeight;
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    private handleKeyPress(event: KeyboardEvent): void {
        if (this.gameState === 'game') {
            // Handle game controls
            switch(event.key.toLowerCase()) {
                case 'w':
                    this.player.ship.pitchRate = -DEFAULT_GAME_CONFIG.rotationSpeed;
                    break;
                case 's':
                    this.player.ship.pitchRate = DEFAULT_GAME_CONFIG.rotationSpeed;
                    break;
                case 'a':
                    this.player.ship.rollRate = -DEFAULT_GAME_CONFIG.rotationSpeed;
                    break;
                case 'd':
                    this.player.ship.rollRate = DEFAULT_GAME_CONFIG.rotationSpeed;
                    break;
                case 'v':
                    // Toggle view
                    this.viewState = this.viewState === 'front' ? 'rear' : 'front';
                    this.updateUI();
                    break;
            }
        } else {
            switch (this.gameState) {
                case 'title':
                    this.gameState = 'credits';
                    this.audioManager.stopIntroMusic();
                    this.updateUI();
                    break;
                case 'credits':
                    this.gameState = 'stats';
                    this.updateUI();
                    break;
                case 'stats':
                    this.gameState = 'undocking';
                    this.audioManager.playUndockSound();
                    this.updateUI();
                    setTimeout(() => {
                        this.gameState = 'game';
                        this.updateUI();
                    }, 3000);
                    break;
            }
        }
    }

    private updateUI(): void {
        const elements = {
            pressKey: document.getElementById('press-key-text'),
            credits: document.getElementById('credits-text'),
            stats: document.getElementById('stats-screen'),
            leaving: document.getElementById('leaving-text'),
            titleText: document.getElementById('title-text'),
            bountyText: document.getElementById('bounty-text'),
            viewText: document.getElementById('view-text')
        };

        // Hide all elements first
        Object.values(elements).forEach(el => {
            if (el) el.classList.add('hidden');
        });

        // Show relevant elements based on game state
        switch (this.gameState) {
            case 'title':
                if (elements.pressKey) elements.pressKey.classList.remove('hidden');
                break;
            case 'credits':
                if (elements.credits) elements.credits.classList.remove('hidden');
                break;
            case 'stats':
                if (elements.stats) elements.stats.classList.remove('hidden');
                break;
            case 'undocking':
                if (elements.leaving) elements.leaving.classList.remove('hidden');
                break;
            case 'game':
                if (elements.bountyText) elements.bountyText.classList.remove('hidden');
                if (elements.viewText) elements.viewText.classList.remove('hidden');
                break;
        }
    }

    public init(): void {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x000000);
        this.camera.position.z = 5;
        
        this.audioManager.playIntroMusic();
        this.updateUI();
        this.animate();
    }

    public dispose(): void {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
        window.removeEventListener('resize', () => this.onWindowResize());
        window.removeEventListener('keydown', (e) => this.handleKeyPress(e));
        this.renderer.dispose();
        this.audioManager.stopIntroMusic();
    }

    private animate(): void {
        this.animationFrameId = requestAnimationFrame(() => this.animate());
        this.update();
        this.render();
    }

    private update(): void {
        switch (this.gameState) {
            case 'game':
                // Update ship position and rotation
                this.player.ship.rotation.x += this.player.ship.pitchRate;
                this.player.ship.rotation.z += this.player.ship.rollRate;
                
                // Update view text based on current view
                const viewText = document.getElementById('view-text');
                if (viewText) {
                    viewText.textContent = `${this.viewState.charAt(0).toUpperCase() + this.viewState.slice(1)} View`;
                }
                break;
        }
    }

    private render(): void {
        this.renderer.render(this.scene, this.camera);
    }
}