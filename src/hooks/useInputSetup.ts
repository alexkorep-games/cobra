// src/hooks/useInputSetup.ts
import { useEffect, useCallback } from "react";
import { useSetAtom } from "jotai";
import { keysPressedAtom, isTouchedAtom } from "@/atoms/inputAtoms";

/**
 * Sets up global input event listeners (keyboard, mouse, touch)
 * and updates the corresponding Jotai atoms.
 * This hook should be called ONCE at the top level of the application.
 * It does not return any state.
 */
export function useInputSetup(): void {
  const setKeysPressed = useSetAtom(keysPressedAtom);
  const setIsTouched = useSetAtom(isTouchedAtom);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (key === " " || key.startsWith("arrow")) {
        event.preventDefault();
      }
      setKeysPressed((prevKeys) => {
        if (prevKeys.has(key)) return prevKeys;
        const newKeys = new Set(prevKeys);
        newKeys.add(key);
        return newKeys;
      });
    },
    [setKeysPressed]
  );

  const handleKeyUp = useCallback(
    (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      setKeysPressed((prevKeys) => {
        if (!prevKeys.has(key)) return prevKeys;
        const newKeys = new Set(prevKeys);
        newKeys.delete(key);
        return newKeys;
      });
    },
    [setKeysPressed]
  );

  const handleMouseDown = useCallback(() => {
    setIsTouched(true);
  }, [setIsTouched]);

  const handleMouseUp = useCallback(() => {
    setIsTouched(false);
  }, [setIsTouched]);

  const handleTouchStart = useCallback(
    (event: TouchEvent) => {
      event.preventDefault();
      setIsTouched(true);
    },
    [setIsTouched]
  );

  const handleTouchEnd = useCallback(
    (event: TouchEvent) => {
      event.preventDefault();
      setIsTouched(false);
    },
    [setIsTouched]
  );

  // Add/Remove Listeners
  useEffect(() => {
    // console.log("[useInputSetup] Adding global listeners");
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: false });

    return () => {
      // console.log("[useInputSetup] Removing global listeners");
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      // Optional: Reset atoms on unmount? Probably not necessary.
      // setKeysPressed(new Set());
      // setIsTouched(false);
    };
  }, [
    handleKeyDown,
    handleKeyUp,
    handleMouseDown,
    handleMouseUp,
    handleTouchStart,
    handleTouchEnd,
  ]);
}
