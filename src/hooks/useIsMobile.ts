import { useState, useEffect } from "react";

const checkIsMobile = (): boolean => {
  return typeof navigator !== "undefined" && navigator.maxTouchPoints > 0;
};

export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(checkIsMobile());

  useEffect(() => {
    const handleResize = () => setIsMobile(checkIsMobile());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
}
