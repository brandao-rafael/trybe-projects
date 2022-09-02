import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Verifica o componente <App />', () => {
  it('verifica se na pagina home os links estão renderizados e são funcionais', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: /home/i });
    const aboutLink = screen.getByRole('link', { name: /about/i });
    const favoriteLink = screen.getByRole('link', { name: /favorite pokémons/i });

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoriteLink).toBeInTheDocument();

    userEvent.click(homeLink);
    expect(history.location.pathname).toBe('/');

    userEvent.click(aboutLink);
    expect(history.location.pathname).toBe('/about');

    userEvent.click(favoriteLink);
    expect(history.location.pathname).toBe('/favorites');

    history.push('/just-another-page');
    const notFound = screen.getByRole('heading',
      { name: /Page requested not found/i, level: 2 });
    const imgNotFound = screen.getByRole('img', { name: /Pikachu crying because the/i });

    expect(notFound).toBeInTheDocument();
    expect(imgNotFound).toBeInTheDocument();
  });
});
