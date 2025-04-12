export class AudioManager {
    private introMusic: HTMLAudioElement;
    private undockSound: HTMLAudioElement;

    constructor() {
        this.introMusic = document.getElementById('introMusic') as HTMLAudioElement;
        this.undockSound = document.getElementById('undockSound') as HTMLAudioElement;
    }

    public playIntroMusic(): void {
        this.introMusic.currentTime = 0;
        this.introMusic.play().catch(e => console.log('Audio playback failed:', e));
    }

    public stopIntroMusic(): void {
        this.introMusic.pause();
        this.introMusic.currentTime = 0;
    }

    public playUndockSound(): void {
        this.undockSound.currentTime = 0;
        this.undockSound.play().catch(e => console.log('Audio playback failed:', e));
    }
}