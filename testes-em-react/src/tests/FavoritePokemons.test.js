import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Verifica o componente <FavoritesPokemons />', () => {
  it('Verifica se é possivel adicionar um Pokemon como favorito', () => {
    const { history } = renderWithRouter(<App />);

    const favoriteLink = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favoriteLink);

    const noFavorites = screen.getByText(/no favorite pokemon found/i);
    const favoriteTitle = screen.getByRole('heading', {
      name: /favorite pokémons/i, level: 2 });

    expect(noFavorites).toBeInTheDocument();
    expect(favoriteTitle).toBeInTheDocument();

    history.push('/');
    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });

    expect(moreDetailsLink).toBeInTheDocument();
    userEvent.click(moreDetailsLink);

    const addFavoriteCheckbox = screen.getByLabelText(/pokémon favoritado/i);

    expect(addFavoriteCheckbox).toBeInTheDocument();
    userEvent.click(addFavoriteCheckbox);

    history.push('/favorites');
    const favoriteTitleSecond = screen.getByRole('heading', {
      name: /favorite pokémons/i, level: 2 });
    const favoritedPokemonName = screen.getByTestId('pokemon-name');

    expect(favoriteTitleSecond).toBeInTheDocument();
    expect(favoritedPokemonName).toBeInTheDocument();
    expect(favoritedPokemonName).toHaveTextContent('Pikachu');
  });
});
