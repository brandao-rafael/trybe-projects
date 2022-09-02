import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Verifica o componente <PokemonDetails />', () => {
  it('Vetifica os itens renderizados na tela', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);

    const detailsTitle = screen.getByRole('heading', { level: 2, name: /details/i });
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonImage = screen.getByRole('img', { name: /pikachu sprite/i });
    const summaryTitle = screen.getByRole('heading', { name: /summary/i, level: 2 });
    const detailsSectionParagraph = screen.getByText(/this intelligent pokémon/i);

    expect(detailsTitle).toBeInTheDocument();
    expect(detailsTitle.textContent).toBe('Pikachu Details');
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName.textContent).toBe('Pikachu');
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonType.textContent).toBe('Electric');
    expect(pokemonWeight).toBeInTheDocument();
    expect(pokemonWeight.textContent).toBe('Average weight: 6.0 kg');
    expect(pokemonImage).toBeInTheDocument();
    expect(pokemonImage.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(detailsLink).not.toBeInTheDocument();
    expect(summaryTitle).toBeInTheDocument();
    expect(detailsSectionParagraph).toBeInTheDocument();
  });

  it('Verigica a seção de mapas do pokemon', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);

    const mapTitle = screen.getByRole('heading', {
      name: /game locations of/i, level: 2 });
    expect(mapTitle).toBeInTheDocument();

    const mapLocationImg = screen.getAllByAltText('Pikachu location');
    const locationName = screen.getAllByText(/kanto/i);
    expect(locationName).toHaveLength(2);
    expect(mapLocationImg).toHaveLength(2);
    const locationMapsUrls = ['https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png'];
    mapLocationImg.forEach((map, i) => {
      expect(map.src).toBe(locationMapsUrls[i]);
      expect(locationName[i]).toBeInTheDocument();
    });
  });

  it('Verifica o comportamento do checkbox com a função de favoritar', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);

    const addFavoriteCheckbox = screen.getByLabelText(/pokémon favoritado/i);
    expect(addFavoriteCheckbox).toBeInTheDocument();
    userEvent.click(addFavoriteCheckbox);
    const favoriteStar = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i });
    expect(favoriteStar).toBeInTheDocument();
    expect(favoriteStar.src).toContain('star-icon.svg');

    userEvent.click(addFavoriteCheckbox);
    expect(favoriteStar).not.toBeInTheDocument();
  });
});
