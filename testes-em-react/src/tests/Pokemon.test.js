import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Verifica o componente <Pokemon />', () => {
  it('Verifica se as informações corretas estao renderizados na tela', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const detailsLink = screen.getByRole('link', { name: /more details/i });
    const pokemonImage = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(pokemonImage).toBeInTheDocument();
    expect(pokemonImage.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(detailsLink).toBeInTheDocument();
    expect(detailsLink).toHaveAttribute('href', '/pokemons/25');
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonWeight).toBeInTheDocument();
    expect(pokemonName.textContent).toBe('Pikachu');
    expect(pokemonType.textContent).toBe('Electric');
    expect(pokemonWeight.textContent).toBe('Average weight: 6.0 kg');
  });

  it('Verifica se clicar em mais detalhes e favorito tem o comportamento correto', () => {
    const { history } = renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);
    expect(history.location.pathname).toBe('/pokemons/25');

    const addFavoriteCheckbox = screen.getByLabelText(/pokémon favoritado/i);
    expect(addFavoriteCheckbox).toBeInTheDocument();
    userEvent.click(addFavoriteCheckbox);

    const favoriteStar = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i });
    expect(favoriteStar).toBeInTheDocument();
    expect(favoriteStar.src).toContain('star-icon.svg');
  });
});
