// src/components/hud/BottomToolbar.tsx
import React from "react";
import { useGameState } from "@/hooks/useGameState";
import { GameState } from "@/types";
import "./BottomToolbar.css"; // We'll create this CSS file next
import { useMarketGenerator } from "@/hooks/useMarketGenerator";

interface ToolbarButtonProps {
  label: string;
  targetState: GameState;
  currentState: GameState;
  onClick: (state: GameState) => void;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  label,
  targetState,
  currentState,
  onClick,
}) => {
  const isActive = currentState === targetState;
  return (
    <button
      className={`toolbar-button ${isActive ? "active" : ""}`}
      onClick={() => onClick(targetState)}
    >
      {label}
    </button>
  );
};

const BottomToolbar: React.FC = () => {
  const { gameState, setGameState } = useGameState();
  const generateMarketForCurrentPlanet = useMarketGenerator(); // Import the hook

  const handleNavigate = (targetState: GameState) => {
    // Generate market data if navigating TO a market screen from a non-market screen
    // Or potentially always regenerate when switching between docked screens? Let's regenerate.
    if (targetState === "buy_cargo" || targetState === "sell_cargo") {
      console.log(
        `[BottomToolbar] Navigating to ${targetState}, regenerating market...`
      );
      generateMarketForCurrentPlanet();
    }
    setGameState(targetState);
  };

  // Define the buttons and their target game states
  const buttons: Array<{ label: string; targetState: GameState }> = [
    { label: "Buy", targetState: "buy_cargo" },
    { label: "Sell", targetState: "sell_cargo" },
    { label: "Map", targetState: "short_range_chart" },
    { label: "Info", targetState: "planet_info" },
    { label: "Status", targetState: "stats" },
    // Add more buttons here as needed (e.g., Shipyard, Equip)
  ];

  // Determine which states should show the toolbar (copied from App.tsx logic)
  const toolbarVisibleStates: GameState[] = [
    "buy_cargo",
    "sell_cargo",
    "planet_info",
    "stats",
    "short_range_chart",
  ];

  // Only render if the current gameState is one where the toolbar should be visible
  if (!toolbarVisibleStates.includes(gameState)) {
    return null;
  }

  return (
    <div className="bottom-toolbar">
      {buttons.map((button) => (
        <ToolbarButton
          key={button.targetState}
          label={button.label}
          targetState={button.targetState}
          currentState={gameState}
          onClick={handleNavigate}
        />
      ))}
    </div>
  );
};

export default BottomToolbar;
