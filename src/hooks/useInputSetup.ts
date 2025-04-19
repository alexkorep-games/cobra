// src/hooks/useInputSetup.ts
import { useEffect } from "react";
import { useInput } from "@/hooks/useInput";

/**
 * Sets up global input event listeners (keyboard, mouse, touch)
 * and updates the corresponding Jotai atoms.
 * This hook should be called ONCE at the top level of the application.
 * It does not return any state.
 */
export function useInputSetup(): void {
  const { keysPressed } = useInput();

  useEffect(() => {
    console.log("[useInputSetup] Using useInput hook for input state management.");
    // Cleanup logic for keysPressed is no longer needed as useInput handles it.
  }, [keysPressed]);
}
