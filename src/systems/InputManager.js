class InputManager {
  constructor(scene) {
    this.scene = scene;
    this.actions = {}; // Map key codes to action names
    this.actionListeners = {}; // Store listeners for each action
    this.setupKeyboardControls();
  }

  setupKeyboardControls() {
    this.scene.onKeyboardObservable.add((kbInfo) => {
      switch (kbInfo.type) {
        case BABYLON.KeyboardEventTypes.KEYDOWN:
          this.handleKeyDown(kbInfo.event);
          break;
        case BABYLON.KeyboardEventTypes.KEYUP:
          this.handleKeyUp(kbInfo.event);
          break;
      }
    });
  }

  handleKeyDown(event) {
    const action = this.actions[event.code];
    if (action && this.actionListeners[action]) {
      this.actionListeners[action].forEach(listener => listener(true)); // true for key down
    }
  }

  handleKeyUp(event) {
    const action = this.actions[event.code];
    if (action && this.actionListeners[action]) {
      this.actionListeners[action].forEach(listener => listener(false)); // false for key up
    }
  }

  // Add a new action mapping
  mapAction(keyCode, actionName) {
    this.actions[keyCode] = actionName;
    if (!this.actionListeners[actionName]) {
      this.actionListeners[actionName] = [];
    }
  }

  // Subscribe a listener to an action
  subscribeToAction(actionName, listener) {
    if (this.actionListeners[actionName]) {
      this.actionListeners[actionName].push(listener);
    } else {
      console.warn(`Action "${actionName}" not mapped.`);
    }
  }

  //Unsubscribe a listener from an action - allows for cleanup
  unsubscribeFromAction(actionName, listenerToRemove) {
    if (this.actionListeners[actionName]) {
      this.actionListeners[actionName] = this.actionListeners[actionName].filter(listener => listener !== listenerToRemove);
    }
  }

  // Clear all actions and listeners - useful when switching scenes
  clearActions() {
    this.actions = {};
    this.actionListeners = {};
  }
}