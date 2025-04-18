// src/features/planet_info/PlanetInfoScreen.tsx
import React from 'react';
import { PlanetInfo, getTechLevelNumber } from '../../classes/PlanetInfo';
import BottomHud from '../../components/hud/BottomHud';
import '../../components/App.css'; // Import shared styles

interface PlanetInfoScreenProps {
    planet: PlanetInfo;
    distance: number;
}

const PlanetInfoScreen: React.FC<PlanetInfoScreenProps> = ({ planet, distance }) => {

    // Format population nicely
    const formatPopulation = (popMillions: number): string => {
        if (popMillions >= 1000) {
            return `${(popMillions / 1000).toFixed(1)} Billion`;
        }
        return `${popMillions} Million`;
    };

    return (
        <>
            <div className="planet-info-container">
                <div className="planet-info-title">DATA ON {planet.name.toUpperCase()}</div>

                <div className="planet-info-grid">
                    <span className="planet-info-label">Distance:</span>
                    <span className="planet-info-value">{distance.toFixed(1)} Light Years</span>

                    <span className="planet-info-label">Economy:</span>
                    <span className="planet-info-value">{planet.economyType}</span>

                    <span className="planet-info-label">Government:</span>
                    <span className="planet-info-value">{planet.governmentType}</span>

                    <span className="planet-info-label">Tech. Level:</span>
                    <span className="planet-info-value">{getTechLevelNumber(planet.techLevel)}</span>

                    <span className="planet-info-label">Population:</span>
                    {/* Assuming population is in millions */}
                    <span className="planet-info-value">{formatPopulation(planet.population)}</span>
                    {/* Add species if available, like (Human Colonials) */}
                     {/* <span className="planet-info-label"></span> */}
                     {/* <span className="planet-info-value">(Human Colonials)</span> */}


                    <span className="planet-info-label">Productivity:</span>
                    <span className="planet-info-value">{planet.productivity.toLocaleString()} M CR</span>

                    <span className="planet-info-label">Radius (Av):</span>
                    <span className="planet-info-value">{planet.radius.toLocaleString()} km</span>
                </div>

                <div className="planet-info-description">
                    {planet.description}
                </div>
                 <div className="planet-info-prompt">
                    Press J to Jump, ESC or N to return to chart
                </div>
            </div>
            <BottomHud />
        </>
    );
};

export default PlanetInfoScreen;