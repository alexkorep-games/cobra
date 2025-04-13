// src/scenes/SpaceFlightScene.ts
import * as THREE from "three";
import { SceneLogic } from "../game/SceneLogic";
import { GameState, IGameManager } from "../types";

export class SpaceFlightScene extends SceneLogic {
    private velocity: number = 0;
    private rollRate: number = 0; // Radians per second
    private pitchRate: number = 0; // Radians per second

    // Tunable parameters
    private readonly maxSpeed: number = 50.0;
    private readonly minSpeed: number = 0.0;
    private readonly acceleration: number = 15.0; // Units per second^2
    private readonly deceleration: number = 10.0; // Deceleration when no key pressed (used by specific key)
    private readonly rollAcceleration: number = Math.PI * 0.8; // Radians per second^2
    private readonly pitchAcceleration: number = Math.PI * 0.5; // Radians per second^2
    private readonly angularDamping: number = 3.0; // Factor to reduce rotation speed when no input
    private readonly linearDamping: number = 0.5; // Factor to reduce speed when no acceleration key

    // Input state
    private keysPressed: Set<string> = new Set();

    // Bound event handlers
    private boundHandleKeyDown: (event: KeyboardEvent) => void;
    private boundHandleKeyUp: (event: KeyboardEvent) => void;


    constructor(game: IGameManager) {
        super(game);
        this.boundHandleKeyDown = this.handleKeyDown.bind(this);
        this.boundHandleKeyUp = this.handleKeyUp.bind(this);
    }

    enter(previousState?: GameState): void {
        super.enter(previousState);

        // Set up initial scene elements visibility/position
        if (this.game.assets.planet) {
            this.game.assets.planet.position.set(0, 15, -60);
            this.game.assets.planet.scale.set(5, 5, 5);
            this.game.assets.planet.visible = true;
        }
        if (this.game.assets.stars) {
            this.game.assets.stars.visible = true;
        }
        console.log("Entered Space Flight Scene. Intro sequence complete.");

        // Reset ship state
        this.velocity = 0;
        this.rollRate = 0;
        this.pitchRate = 0;
        this.keysPressed.clear();
        if (this.game.camera) {
             // Optional: Reset camera orientation if needed
             // this.game.camera.rotation.set(0, 0, 0);
             // Ensure camera starts looking forward
            this.game.camera.lookAt(0, 0, -1);
        }

        // Add specific listeners for this scene
        window.addEventListener('keydown', this.boundHandleKeyDown);
        window.addEventListener('keyup', this.boundHandleKeyUp);

        // Potentially start game music, etc.
    }

    exit(nextState?: GameState): void {
        super.exit(nextState);
        // Remove specific listeners for this scene
        window.removeEventListener('keydown', this.boundHandleKeyDown);
        window.removeEventListener('keyup', this.boundHandleKeyUp);

        // Reset keys pressed just in case
        this.keysPressed.clear();
        // Cleanup specific to space flight if needed (e.g., stop game music)
    }

    update(deltaTime: number): void {
        if (!this.game.camera) return;

        // 1. Update Rates based on Input & Damping
        let accelerate = false;
        let decelerate = false; // Specific key for decelerate
        let rollLeft = false;
        let rollRight = false;
        let pitchUp = false;
        let pitchDown = false;

        // Check Elite Controls
        if (this.keysPressed.has('KeyS')) accelerate = true;       // 'S' = Accelerate
        if (this.keysPressed.has('KeyX')) decelerate = true;       // 'X' = Decelerate
        if (this.keysPressed.has('Comma')) rollLeft = true;         // ',' = Roll Left
        if (this.keysPressed.has('Period')) rollRight = true;       // '.' = Roll Right
        if (this.keysPressed.has('Slash')) pitchDown = true;        // '/' = Dive (Pitch Down)
        // Elite '*' key for climb - check NumpadMultiply or Shift+Digit8 (less reliable across keyboards)
        if (this.keysPressed.has('NumpadMultiply') || this.keysPressed.has('KeyA')) pitchUp = true; // Using 'A' as alternative Climb for now


        // Update Velocity
        if (accelerate) {
            this.velocity += this.acceleration * deltaTime;
        } else if (decelerate) {
            // Using acceleration value for deceleration as well for symmetry, adjust if needed
            this.velocity -= this.acceleration * deltaTime;
        } else {
            // Apply linear damping if no acceleration/deceleration input
            this.velocity *= (1 - this.linearDamping * deltaTime);
             // Prevent drifting backwards slowly if speed is near zero
            if (Math.abs(this.velocity) < 0.01) {
                this.velocity = 0;
            }
        }
        this.velocity = THREE.MathUtils.clamp(this.velocity, this.minSpeed, this.maxSpeed);

        // Update Roll Rate
        if (rollLeft) {
            this.rollRate += this.rollAcceleration * deltaTime;
        } else if (rollRight) {
            this.rollRate -= this.rollAcceleration * deltaTime;
        } else {
            // Apply angular damping
            this.rollRate *= (1 - this.angularDamping * deltaTime);
             if (Math.abs(this.rollRate) < 0.01) { // Prevent tiny residual rotation
                this.rollRate = 0;
            }
        }

        // Update Pitch Rate
        if (pitchDown) { // '/' is Dive (pitch down)
            this.pitchRate -= this.pitchAcceleration * deltaTime;
        } else if (pitchUp) { // '*' or 'A' is Climb (pitch up)
             this.pitchRate += this.pitchAcceleration * deltaTime;
        } else {
            // Apply angular damping
            this.pitchRate *= (1 - this.angularDamping * deltaTime);
             if (Math.abs(this.pitchRate) < 0.01) { // Prevent tiny residual rotation
                this.pitchRate = 0;
            }
        }

        // Clamp rates (optional, but good practice)
        // const maxRollRate = Math.PI; // Example clamp
        // const maxPitchRate = Math.PI / 2; // Example clamp
        // this.rollRate = THREE.MathUtils.clamp(this.rollRate, -maxRollRate, maxRollRate);
        // this.pitchRate = THREE.MathUtils.clamp(this.pitchRate, -maxPitchRate, maxPitchRate);

        // 2. Apply Movement and Rotation
        const moveDirection = new THREE.Vector3(0, 0, -1); // Move forward in local Z
        moveDirection.applyQuaternion(this.game.camera.quaternion); // Align with camera's current direction
        this.game.camera.position.addScaledVector(moveDirection, this.velocity * deltaTime);

        // Apply pitch (rotation around local X axis)
        this.game.camera.rotateX(this.pitchRate * deltaTime);

        // Apply roll (rotation around local Z axis)
        this.game.camera.rotateZ(this.rollRate * deltaTime);

        // 3. Update Coordinates Display (via React state)
        const { x, y, z } = this.game.camera.position;
        // Round coordinates for display
        this.game.reactSetCoordinates([Math.round(x), Math.round(y), Math.round(z)]);

        // 4. Starfield remains static (no rotation update here)
        // The line `this.game.assets.stars.rotation.y += ...` has been removed.
    }

    // We use specific handlers now, base handleInput is not used for flight controls
    // handleInput(event: KeyboardEvent | MouseEvent): void { }

    private handleKeyDown(event: KeyboardEvent): void {
        // Normalize key codes if needed (e.g., Numpad vs main keys)
        // For simplicity, we'll use event.code which is layout independent
        let keyIdentifier = event.code;

        // Alternative mapping for '*' if Shift+8 is preferred (can be less reliable)
        // if (event.shiftKey && event.code === 'Digit8') {
        //      keyIdentifier = 'ShiftDigit8';
        // }

        // Map '/' key regardless of Shift state on some keyboards
        if (event.key === '/') {
            keyIdentifier = 'Slash'; // Use a consistent identifier
        }
         // Map '.' key regardless of Shift state on some keyboards
        if (event.key === '.') {
            keyIdentifier = 'Period'; // Use a consistent identifier
        }
         // Map ',' key regardless of Shift state on some keyboards
        if (event.key === ',') {
            keyIdentifier = 'Comma'; // Use a consistent identifier
        }

        // Using 'KeyA' for climb as a more accessible alternative to NumpadMultiply/*
        if (event.code === 'KeyA') {
             keyIdentifier = 'KeyA';
        }

        this.keysPressed.add(keyIdentifier);
        // console.log("Key Down:", keyIdentifier, this.keysPressed); // For debugging
    }

    private handleKeyUp(event: KeyboardEvent): void {
        let keyIdentifier = event.code;

        // if (event.shiftKey && event.code === 'Digit8') {
        //     keyIdentifier = 'ShiftDigit8';
        // }

        // Consistent identifiers for release
        if (event.key === '/') keyIdentifier = 'Slash';
        if (event.key === '.') keyIdentifier = 'Period';
        if (event.key === ',') keyIdentifier = 'Comma';
        if (event.code === 'KeyA') keyIdentifier = 'KeyA';


        // Handle Shift release if Shift+ combos were used more extensively
        // if (!event.shiftKey && (keyIdentifier === 'ShiftLeft' || keyIdentifier === 'ShiftRight')) {
             // If shift is released, remove any Shift+ combinations that might have been added
             // Example: this.keysPressed.delete('ShiftDigit8');
        // }

        this.keysPressed.delete(keyIdentifier);
        // console.log("Key Up:", keyIdentifier, this.keysPressed); // For debugging
    }
}