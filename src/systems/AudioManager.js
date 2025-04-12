class AudioManager {
  constructor(scene) {
    this.scene = scene;
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.musicNode = null; // Placeholder for music node
    this.musicGainNode = this.audioContext.createGain();
    this.musicGainNode.connect(this.audioContext.destination);
    this.musicGainNode.gain.value = 0.5; // Initial music volume
  }

  async loadSound(url) {
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

  playSoundEffect(buffer, volume = 1.0, loop = false) {
    if (!buffer) {
      console.warn("playSoundEffect: No buffer provided.");
      return;
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

  async playMusic(url, volume = 0.5) {
    if (this.musicNode) {
      this.stopMusic();
    }

    try {
      const buffer = await this.loadSound(url);
      if (!buffer) {
        console.warn("playMusic: Could not load music track.");
        return;
      }

      this.musicNode = this.audioContext.createBufferSource();
      this.musicNode.buffer = buffer;
      this.musicNode.loop = true;
      this.musicNode.connect(this.musicGainNode);

      this.musicGainNode.gain.value = volume;

      this.musicNode.start(0);

    } catch (error) {
      console.error("playMusic: Error playing music:", error);
    }
  }


  stopMusic() {
    if (this.musicNode) {
      this.musicNode.stop(0);
      this.musicNode = null;
    }
  }

  setMusicVolume(volume) {
    this.musicGainNode.gain.value = volume;
  }
}

export default AudioManager;