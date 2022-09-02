import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Form extends Component {
  render() {
    const { onInputChange, onSaveButtonClick, isSaveButtonDisabled } = this.props;
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
    } = this.props;

    return (
      <fieldset className="form-container">
        <h2>Add new card</h2>
        <label htmlFor="cardName">
          Driver name:
          <input
            data-testid="name-input"
            type="text"
            name="cardName"
            id="cardName"
            value={ cardName }
            placeholder="Insert your drive name"
            onChange={ onInputChange }
            required
          />
        </label>
        <label htmlFor="description">
          Description:
          <textarea
            data-testid="description-input"
            name="cardDescription"
            id="description"
            value={ cardDescription }
            placeholder="Enter a short description"
            onChange={ onInputChange }
            required
          />
        </label>
        <label htmlFor="atack">
          Atack:
          <input
            data-testid="attr1-input"
            type="number"
            name="cardAttr1"
            id="atack"
            value={ cardAttr1 }
            onChange={ onInputChange }
            required
          />
        </label>
        <label htmlFor="defense">
          Defense:
          <input
            data-testid="attr2-input"
            type="number"
            name="cardAttr2"
            id="defense"
            value={ cardAttr2 }
            onChange={ onInputChange }
            required
          />
        </label>
        <label htmlFor="consistence">
          Consistence:
          <input
            data-testid="attr3-input"
            type="number"
            name="cardAttr3"
            id="consistence"
            value={ cardAttr3 }
            onChange={ onInputChange }
            required
          />
        </label>
        <label htmlFor="imageURL">
          Driver URL image:
          <input
            type="text"
            data-testid="image-input"
            name="cardImage"
            id="imageURL"
            value={ cardImage }
            onChange={ onInputChange }
            required
          />
        </label>
        <label htmlFor="rarity">
          Rarity:
          <select
            data-testid="rare-input"
            name="cardRare"
            id="rarity"
            value={ cardRare }
            onChange={ onInputChange }
            required
          >
            <option value="normal">normal</option>
            <option value="raro">raro</option>
            <option value="muito raro">muito raro</option>
          </select>
        </label>
        <label htmlFor="super-trunfo">
          Super trunfo?
          {!hasTrunfo && <input
            data-testid="trunfo-input"
            type="checkbox"
            name="cardTrunfo"
            id="super-trunfo"
            checked={ cardTrunfo }
            onChange={ onInputChange }
          />}
          { hasTrunfo && <span>Você já tem um Super Trunfo em seu baralho</span>}
        </label>
        <button
          data-testid="save-button"
          type="submit"
          disabled={ isSaveButtonDisabled }
          onClick={ onSaveButtonClick }
          className="btn btn-outline-danger"
        >
          Salvar
        </button>
      </fieldset>
    );
  }
}

Form.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  hasTrunfo: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
  isSaveButtonDisabled: PropTypes.bool.isRequired,
};
