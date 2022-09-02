import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PlanetCard extends Component {
  render() {
    const { planetName, planetImage, link } = this.props;
    return (
      <div data-testid="planet-card" className="planet-item">
        <p data-testid="planet-name">{ planetName }</p>
        <a href={ link } target="_blank" rel="noreferrer">
          <img
            src={ planetImage }
            alt={ `Planeta ${planetName}` }
            className="planets-img"
          />
        </a>
      </div>
    );
  }
}

export default PlanetCard;

PlanetCard.propTypes = {
  planetImage: PropTypes.string.isRequired,
  planetName: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};
