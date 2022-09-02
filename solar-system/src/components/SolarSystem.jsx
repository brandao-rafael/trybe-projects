import React, { Component } from 'react';
import Title from './Title';
import planets from '../data/planets';
import PlanetCard from './PlanetCard';

class SolarSystem extends Component {
  render() {
    const planetHtmlElement = planets
      .map((planet) => (<PlanetCard
        planetName={ planet.name }
        planetImage={ planet.image }
        link={ planet.link }
        key={ planet.name }
      />));
    return (
      <div data-testid="solar-system" className="planet-container">
        <Title headline="Planetas" />
        { planetHtmlElement }
      </div>
    );
  }
}

export default SolarSystem;
