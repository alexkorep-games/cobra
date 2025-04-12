import * as BABYLON from "@babylonjs/core";
import { ActionManager, ExecuteCodeAction } from "@babylonjs/core";

export default class InputManager {
  scene: BABYLON.Scene;
  actions: { [keyCode: string]: string };
  actionListeners: { [actionName: string]: ((isDown: boolean) => void)[] };
  keyStates: { [key: string]: boolean };

  constructor(scene: BABYLON.Scene) {
    this.scene = scene;
    this.actions = {};
    this.actionListeners = {};
    this.keyStates = {};
    
    // Initialize the action manager if it doesn't exist
    if (!scene.actionManager) {
      scene.actionManager = new ActionManager(scene);
    }

    this.setupKeyboardControls();
  }

  setupKeyboardControls() {
    this.scene.actionManager.registerAction(
      new ExecuteCodeAction(
        ActionManager.OnKeyDownTrigger,
        (evt) => this.handleKeyDown(evt.sourceEvent as KeyboardEvent)
      )
    );

    this.scene.actionManager.registerAction(
      new ExecuteCodeAction(
        ActionManager.OnKeyUpTrigger,
        (evt) => this.handleKeyUp(evt.sourceEvent as KeyboardEvent)
      )
    );
  }

  handleKeyDown(event: KeyboardEvent) {
    const action = this.actions[event.code];
    if (action && !this.keyStates[event.code]) {
      this.keyStates[event.code] = true;
      if (this.actionListeners[action]) {
        this.actionListeners[action].forEach(listener => listener(true));
      }
    }
  }

  handleKeyUp(event: KeyboardEvent) {
    const action = this.actions[event.code];
    if (action) {
      this.keyStates[event.code] = false;
      if (this.actionListeners[action]) {
        this.actionListeners[action].forEach(listener => listener(false));
      }
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
      this.actionListeners[actionName] = this.actionListeners[actionName].filter(
        listener => listener !== listenerToRemove
      );
    }
  }

  clearActions() {
    this.actions = {};
    this.actionListeners = {};
    this.keyStates = {};
  }
}