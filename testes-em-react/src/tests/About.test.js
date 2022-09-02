import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Verifica o componente <About />', () => {
  it('verifica se os elementos corretos estão renderizados', () => {
    renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: /about/i });
    userEvent.click(aboutLink);

    const aboutTitle = screen.getByRole('heading', { name: /about pokédex/i, level: 2 });
    const firstPAbout = screen.getByText(/This application simulates a Pokédex/i);
    const secondPAbout = screen.getByText(/One can filter Pokémons by type/i);

    expect(aboutTitle).toBeInTheDocument();
    expect(firstPAbout).toBeInTheDocument();
    expect(secondPAbout).toBeInTheDocument();

    const imgUrl = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const pokedexAboutImg = screen.getByRole('img', { name: /pokédex/i });

    expect(pokedexAboutImg).toHaveAttribute('src', imgUrl);
  });
});
