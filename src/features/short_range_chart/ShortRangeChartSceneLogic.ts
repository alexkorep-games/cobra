// src/features/short_range_chart/ShortRangeChartSceneLogic.ts
import { SceneLogicBase } from "../common/SceneLogicBase";
import { GameState, IGameManager } from "../../types";
import { PlanetInfo, calculateDistance } from "../../classes/PlanetInfo";
import * as Constants from "../../constants";
import { plane } from "three/examples/jsm/Addons.js";

export class ShortRangeChartSceneLogic extends SceneLogicBase {
  private nearbyPlanets: PlanetInfo[] = [];
  private reachablePlanets: PlanetInfo[] = [];
  private selectedIndex: number = 0; // Index within reachablePlanets

  constructor(game: IGameManager) {
    super(game);
  }

  enter(previousState?: GameState): void {
    super.enter(previousState);
    console.log("Entering Short Range Chart");
    const planets = this.gameManager.planetInfos;
    const currentPlanet = this.gameManager.getCurrentPlanet();
    this.selectedIndex = planets.findIndex(p => p.name === currentPlanet.name);


    // Find nearby planets and filter reachable ones
    this.nearbyPlanets = planets.filter(p => p.name !== currentPlanet.name);
    this.reachablePlanets = this.nearbyPlanets
      .map(p => ({
          planet: p,
          distance: calculateDistance(currentPlanet.coordinates, p.coordinates)
      }))
      .filter(pd => pd.distance <= Constants.JUMP_RANGE)
      .sort((a, b) => a.distance - b.distance) // Sort by distance ascending
      .map(pd => pd.planet); // Extract just the PlanetInfo objects

    this.bindInputHandlers();
  }

  exit(nextState?: GameState): void {
    super.exit(nextState);
    this.unbindInputHandlers();
     // Optional: Clear selection when leaving? Depends on desired UX.
     // this.gameManager.setSelectedPlanetName(null);
    console.log("Exiting Short Range Chart");
  }

  update(deltaTime: number): void {
    // Can add animations or effects here if needed
  }

  private bindInputHandlers(): void {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  private unbindInputHandlers(): void {
     window.removeEventListener("keydown", this.handleKeyDown);
  }

  // Need to bind 'this' for the event handler
  private handleKeyDown = (event: KeyboardEvent): void => {
    if (!this.isActive) return;

    console.log(`Short Range Chart KeyDown: ${event.key}`);

    if (this.reachablePlanets.length === 0 && event.key !== 'Escape') {
        // Only allow Escape if no planets are selectable
        return;
    }

    switch (event.key) {
      case "ArrowUp":
      case "ArrowLeft":
        this.selectPreviousReachablePlanet();
        break;
      case "ArrowDown":
      case "ArrowRight":
        this.selectNextReachablePlanet();
        break;
      case "Enter":
        this.confirmSelection();
        break;
       case "Escape":
      case "n": // Allow 'n' to close the chart too
      case "N":
        this.gameManager.switchState("space_flight"); // Go back to flight
        break;
    }
  }

  private selectNextReachablePlanet(): void {
    if (this.reachablePlanets.length === 0) return;
    this.selectedIndex = (this.selectedIndex + 1) % this.reachablePlanets.length;
    //this.gameManager.setSelectedPlanetName(this.reachablePlanets[this.selectedIndex].name);
    // Force React update if needed, or rely on component reading directly
  }

  private selectPreviousReachablePlanet(): void {
    if (this.reachablePlanets.length === 0) return;
    this.selectedIndex = (this.selectedIndex - 1 + this.reachablePlanets.length) % this.reachablePlanets.length;
    //this.gameManager.setSelectedPlanetIndex(this.reachablePlanets[this.selectedIndex].name);
     // Force React update if needed
  }

  private confirmSelection(): void {
    //  if (this.gameManager.selectedPlanetName) {
    // //     console.log(`Confirmed selection: ${this.gameManager.selectedPlanetName}`);
    //     this.gameManager.switchState("planet_info");
    //  } else {
    //      console.log("Cannot confirm: No planet selected.");
    //  }
  }

  handleInput(event: KeyboardEvent | MouseEvent): void {
      // Use specific handler for keydown
      if (event.type === 'keydown') {
         // Already handled by bound handleKeyDown
      } else if (event.type === 'mousedown') {
          // Handle mouse clicks on planets if desired
          // This would involve checking event target against planet markers
          console.log("Mouse click on chart - (not implemented)");
      }
  }
}