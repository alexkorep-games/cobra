interface AudioBufferSourceNodeWithStop extends AudioBufferSourceNode {
  stop(when?: number): void;
}

class AudioManager {
    private scene: any; // Assuming scene is a Babylon.js Scene.  Use more specific type if available.
    private audioContext: AudioContext;
    private musicNode: AudioBufferSourceNodeWithStop | null = null;
    private musicGainNode: GainNode;

    constructor(scene: any) {
        this.scene = scene;
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.musicGainNode = this.audioContext.createGain();
        this.musicGainNode.connect(this.audioContext.destination);
        this.musicGainNode.gain.value = 0.5; // Initial music volume
    }

    async loadSound(url: string): Promise<AudioBuffer | null> {
        try {
            const response = await fetch(url);
            const arrayBuffer = await response.arrayBuffer();
            const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
            return audioBuffer;
        } catch (error) {
            console.error("Error loading sound:", error);
            return null;
        }
    }

    playSoundEffect(buffer: AudioBuffer, volume: number = 1.0, loop: boolean = false): AudioBufferSourceNode {
        if (!buffer) {
            console.warn("playSoundEffect: No buffer provided.");
            throw new Error("No buffer provided for sound effect."); // Or handle differently, e.g., return null
        }
        const source = this.audioContext.createBufferSource();
        source.buffer = buffer;
        source.loop = loop;

        const gainNode = this.audioContext.createGain();
        gainNode.gain.value = volume;
        gainNode.connect(this.audioContext.destination);

        source.connect(gainNode);
        source.start(0);

        return source; // Return the source node for potential later control (e.g., stopping).
    }

    async playMusic(url: string, volume: number = 0.5): Promise<void> {
        if (this.musicNode) {
            this.stopMusic();
        }

        try {
            const buffer = await this.loadSound(url);
            if (!buffer) {
                console.warn("playMusic: Could not load music track.");
                return;
            }

            this.musicNode = this.audioContext.createBufferSource() as AudioBufferSourceNodeWithStop;
            this.musicNode.buffer = buffer;
            this.musicNode.loop = true;
            this.musicNode.connect(this.musicGainNode);
            this.musicGainNode.gain.value = volume;
            this.musicNode.start(0);
        } catch (error) {
            console.error("playMusic: Error playing music:", error);
        }
    }

    stopMusic(): void {
        if (this.musicNode) {
            this.musicNode.stop(0);
            this.musicNode = null;
        }
    }

    setMusicVolume(volume: number): void {
        this.musicGainNode.gain.value = volume;
    }
}

export default AudioManager;