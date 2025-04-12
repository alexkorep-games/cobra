import * as BABYLON from "@babylonjs/core";

class InputManager {
  scene: any;
  actions: { [keyCode: string]: string };
  actionListeners: { [actionName: string]: ((isDown: boolean) => void)[] };

  constructor(scene: any) {
    this.scene = scene;
    this.actions = {};
    this.actionListeners = {};
    this.setupKeyboardControls();
  }
  setupKeyboardControls() {
    this.scene.onKeyboardObservable.add((kbInfo: BABYLON.KeyboardInfo) => {
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
  handleKeyDown(event: KeyboardEvent) {
    const action = this.actions[event.code];
    if (action && this.actionListeners[action]) {
      this.actionListeners[action].forEach(listener => listener(true));
    }
  }
  handleKeyUp(event: KeyboardEvent) {
    const action = this.actions[event.code];
    if (action && this.actionListeners[action]) {
      this.actionListeners[action].forEach(listener => listener(false));
    }
  }
  mapAction(keyCode: string, actionName: string) {
    this.actions[keyCode] = actionName;
    if (!this.actionListeners[actionName]) {
      this.actionListeners[actionName] = [];
    }
  }
  subscribeToAction(actionName: string, listener: (isDown: boolean) => void) {
    if (this.actionListeners[actionName]) {
      this.actionListeners[actionName].push(listener);
    } else {
      console.warn(`Action "${actionName}" not mapped.`);
    }
  }
  unsubscribeFromAction(actionName: string, listenerToRemove: (isDown: boolean) => void) {
    if (this.actionListeners[actionName]) {
      this.actionListeners[actionName] = this.actionListeners[actionName].filter(listener => listener !== listenerToRemove);
    }
  }
  clearActions() {
    this.actions = {};
    this.actionListeners = {};
  }
}