import { useRef, useEffect } from "react";

export function useAudioManager() {
  const introMusicRef = useRef<HTMLAudioElement | null>(null);
  const undockSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize Intro Music
    const introAudio = new Audio("assets/audio/intro.mp3");
    introAudio.loop = true;
    introMusicRef.current = introAudio;
    console.log("Intro music initialized.");

    // Initialize Undock Sound
    const undockAudio = new Audio("assets/audio/undock.mp3");
    undockSoundRef.current = undockAudio;
    console.log("Undock sound initialized.");

    // Cleanup function to pause and nullify refs (optional but good practice)
    return () => {
      introMusicRef.current?.pause();
      introMusicRef.current = null;
      undockSoundRef.current?.pause();
      undockSoundRef.current = null;
      console.log("Audio manager cleaned up.");
    };
  }, []); // Run only once on mount

  return { introMusicRef, undockSoundRef };
}
