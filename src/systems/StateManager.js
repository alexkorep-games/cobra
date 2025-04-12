// src/systems/StateManager.js

class StateManager {
  constructor() {
    this.state = {
      credits: 1000,
      location: "Earth", // Example: system name
      // Add other player data as needed
    };
  }

  getCredits() {
    return this.state.credits;
  }

  setCredits(credits) {
    this.state.credits = credits;
  }

  getLocation() {
    return this.state.location;
  }

  setLocation(location) {
    this.state.location = location;
  }

  saveGame() {
    localStorage.setItem("gameState", JSON.stringify(this.state));
    console.log("Game saved:", this.state);
  }

  loadGame() {
    const savedState = localStorage.getItem("gameState");
    if (savedState) {
      this.state = JSON.parse(savedState);
      console.log("Game loaded:", this.state);
    } else {
      console.log("No saved game found.");
      // Optionally, provide default state or handle no save case
    }
    return this.state; // Return the loaded state for initialization
  }

  // Add other methods to manage state as needed (e.g., for ship, cargo, etc.)
}

export default StateManager;