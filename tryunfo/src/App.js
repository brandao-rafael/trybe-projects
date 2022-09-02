import React from 'react';
import Card from './components/Card';
import Filter from './components/Filter';
import Form from './components/Form';
import './components/style.css';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      hasTrunfo: false,
      savedCards: [],
      backupSavedCards: [],
      filter: '',
      rareFilter: '',
      filterCkecked: '',
    };
  }

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = (target.type === 'checkbox') ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  }

  onSaveButtonClick = (event) => {
    event.preventDefault();
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      savedCards,
      // backupSavedCards,
    } = this.state;
    const card = {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    };
    this.setState({
      cardName: '',
      cardDescription: '',
      cardAttr1: 0,
      cardAttr2: 0,
      cardAttr3: 0,
      cardImage: '',
      cardRare: '',
      cardTrunfo: false,
      savedCards: [...savedCards, card],
      backupSavedCards: [...savedCards, card],
    });
    if (cardTrunfo) {
      this.setState({
        hasTrunfo: true,
      });
    }
  }

  isSaveButtonDisabled = () => {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
    } = this.state;
    if (!cardName.length
      || !cardDescription.length
      || !cardImage.length
      || !cardRare.length
    ) return true;
    const sum = Number(cardAttr1) + Number(cardAttr2) + Number(cardAttr3);
    const maxValueAccept = 210;
    const maxValueAcceptPerAttr = 90;
    if (sum > maxValueAccept) return true;
    if (Number(cardAttr1) > maxValueAcceptPerAttr
      || Number(cardAttr2) > maxValueAcceptPerAttr
      || Number(cardAttr3) > maxValueAcceptPerAttr
    ) return true;
    if (Number(cardAttr1) < 0
      || Number(cardAttr2) < 0
      || Number(cardAttr3) < 0
    ) return true;
    return false;
  }

  deleteCard = (card) => {
    const { savedCards, backupSavedCards } = this.state;
    if (card.cardTrunfo) {
      this.setState({
        hasTrunfo: false,
      });
    }
    this.setState({
      savedCards: savedCards.filter((savedCard) => savedCard.cardName !== card.cardName),
      backupSavedCards: backupSavedCards
        .filter((backupCard) => backupCard.cardName !== card.cardName),
    });
  }

  filterByName = (event) => {
    this.setState({
      filter: event.target.value,
    });
  };

  filterByRarity = (event) => {
    const { value } = event.target;
    if (value !== 'todas') {
      this.setState({
        rareFilter: value,
      });
    } else {
      this.setState({
        rareFilter: '',
      });
    }
  }

  filterBySuperTrunfo = (event) => {
    const { checked } = event.target;
    if (checked) {
      this.setState({
        filterCkecked: true,
      });
    }
    if (!checked) {
      this.setState({
        filterCkecked: false,
      });
    }
  }

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
      hasTrunfo,
      filter,
      rareFilter,
      backupSavedCards,
      filterCkecked,
    } = this.state;

    const filterCard = backupSavedCards.filter((card) => {
      if (filterCkecked) return card.cardTrunfo === true;
      if (filter !== '') return card.cardName.includes(filter);
      if (rareFilter !== '') return card.cardRare.startsWith(rareFilter);
      return backupSavedCards;
    });
    return (
      <>
        <div>
          <h1>Tryunfo</h1>
        </div>
        <div className="form-preview-container">
          <Form
            isSaveButtonDisabled={ this.isSaveButtonDisabled() }
            onInputChange={ this.onInputChange }
            onSaveButtonClick={ this.onSaveButtonClick }
            cardName={ cardName }
            cardDescription={ cardDescription }
            cardAttr1={ cardAttr1 }
            cardAttr2={ cardAttr2 }
            cardAttr3={ cardAttr3 }
            cardImage={ cardImage }
            cardRare={ cardRare }
            cardTrunfo={ cardTrunfo }
            hasTrunfo={ hasTrunfo }
          />
          <Card
            cardName={ cardName }
            cardDescription={ cardDescription }
            cardAttr1={ cardAttr1 }
            cardAttr2={ cardAttr2 }
            cardAttr3={ cardAttr3 }
            cardImage={ cardImage }
            cardRare={ cardRare }
            cardTrunfo={ cardTrunfo }
          />
        </div>
        <Filter
          filterByName={ this.filterByName }
          filter={ filter }
          filterByRarity={ this.filterByRarity }
          filterBySuperTrunfo={ this.filterBySuperTrunfo }
          filterCkecked={ filterCkecked }
        />
        <div className="saved-container">
          { filterCard.map((card, i) => (
            <div className="saved-cards" key={ `div:${card.cardName}${i}` }>
              <Card
                key={ `${card.cardName}${i}` }
                cardName={ card.cardName }
                cardDescription={ card.cardDescription }
                cardAttr1={ card.cardAttr1 }
                cardAttr2={ card.cardAttr2 }
                cardAttr3={ card.cardAttr3 }
                cardImage={ card.cardImage }
                cardRare={ card.cardRare }
                cardTrunfo={ card.cardTrunfo }
              />
              <br />
              <button
                key={ i }
                type="submit"
                data-testid="delete-button"
                onClick={ () => this.deleteCard(card) }
                className="btn btn-outline-danger"
              >
                Excluir
              </button>
            </div>
          ))}
        </div>
      </>
    );
  }
}
