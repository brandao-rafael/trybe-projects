import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Verifica o componente <Pokedex />', () => {
  it('Verifica o comportamento da pokédex', () => {
    renderWithRouter(<App />);

    const title = screen.getByRole('heading', {
      name: /Encountered pokémons/i, level: 2 });
    expect(title).toBeInTheDocument();

    const nextButton = screen.getByRole('button', { name: /próximo pokémon/i });
    const pikachuCard = screen.getByText('Pikachu');
    expect(nextButton).toBeInTheDocument();
    expect(pikachuCard).toBeInTheDocument();

    const pokemons = [
      /pikachu/i,
      /charmander/i,
      /caterpie/i,
      /ekans/i,
      /alakazam/i,
      /mew/i,
      /rapidash/i,
      /snorlax/i,
      /dragonair/i,
    ];

    pokemons.forEach((pokemon) => {
      expect(screen.getByText(pokemon)).toBeInTheDocument();
      expect(screen.getAllByText(pokemon)).toHaveLength(1);
      userEvent.click(nextButton);

      if (pokemon === /dragonair/i) {
        expect(pikachuCard).toBeInTheDocument();
      }
    });
  });

  it('Verifica o comportamento dos botões', () => {
    renderWithRouter(<App />);

    const filters = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];

    const typeButtons = screen.getAllByTestId('pokemon-type-button');
    const allTypeButton = screen.getByText('All');

    typeButtons.forEach((button, i) => {
      expect(button.textContent).toBe(filters[i]);
      userEvent.click(button);
      const filteredPokemon = screen.getByTestId('pokemon-type');
      expect(filteredPokemon.textContent).toBe(button.textContent);
      expect(allTypeButton).toBeInTheDocument();
    });

    userEvent.click(allTypeButton);
    const pikachuCard = screen.getByText('Pikachu');
    expect(pikachuCard).toBeInTheDocument();
  });
});
