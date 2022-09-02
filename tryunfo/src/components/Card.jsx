import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Card extends Component {
  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    } = this.props;
    return (
      <section className="card-item">
        <h4 data-testid="name-card">{ cardName }</h4>
        <img
          src={ cardImage }
          alt={ cardName }
          data-testid="image-card"
          className="image"
        />
        { cardTrunfo
        && <span data-testid="trunfo-card" className="super-trunfo">Super Trunfo</span>}
        <span data-testid="description-card" className="card-description-container">
          <p>Description:</p>
          <span className="card-description"><p>{ cardDescription }</p></span>
        </span>
        <span data-testid="attr1-card" className="atr-item">
          <p>Atack:</p>
          {' '}
          <p>{ cardAttr1 }</p>
        </span>
        <br />
        <span data-testid="attr2-card" className="atr-item">
          <p>Defense:</p>
          {' '}
          <p>{ cardAttr2 }</p>
        </span>
        <br />
        <span data-testid="attr3-card" className="atr-item">
          <p>Consistence:</p>
          {' '}
          <p>{ cardAttr3 }</p>
        </span>
        <br />
        <span data-testid="rare-card" className="atr-item">
          <p>Rarity:</p>
          {' '}
          <p>{ cardRare }</p>
        </span>
      </section>
    );
  }
}

Card.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
};
