import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import { Engine } from "@babylonjs/core";
import LoadingScene from "./scenes/LoadingScene";
import TitleScene from "./scenes/TitleScene";
import SpaceFlightScene from "./scenes/SpaceFlightScene";
import SceneManager from "./core/SceneManager";

class App {
    constructor() {
        // create the canvas html element and attach it to the webpage
        const canvas = document.createElement("canvas");
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.id = "gameCanvas";
        document.body.appendChild(canvas);

        // initialize babylon engine
        const engine = new Engine(canvas, true);
        window.addEventListener("resize", () => {
            engine.resize();
        });
        
        // initialize scene manager
        const sceneManager = new SceneManager(engine);
        
        // create and register scenes
        const loadingScene = new LoadingScene(sceneManager);
        const titleScene = new TitleScene(sceneManager);
        const spaceFlightScene = new SpaceFlightScene(sceneManager);
        
        sceneManager.addScene("Loading", loadingScene);
        sceneManager.addScene("Title", titleScene);
        sceneManager.addScene("SpaceFlightScene", spaceFlightScene);
        
        // switch to loading scene
        sceneManager.switchScene("Loading");

        // hide/show the Inspector
        window.addEventListener("keydown", (ev) => {
            // Shift+Ctrl+Alt+I
            if (ev.shiftKey && ev.ctrlKey && ev.altKey && (ev.key === "I" || ev.key === "i")) {
                const scene = sceneManager.getCurrentScene();
                if (scene?.debugLayer.isVisible()) {
                    scene.debugLayer.hide();
                } else {
                    scene?.debugLayer.show();
                }
            }
        });

        // run the main render loop
        engine.runRenderLoop(() => {
            const scene = sceneManager.getCurrentScene();
            if (scene) {
                scene.render();
            }
        });
    }
}

new App();