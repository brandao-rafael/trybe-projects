import { screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Verifica o componente <NotFound />', () => {
  it('Verifica a renderização dos elementos', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/just-a-page');

    const notFoundTitle = screen.getByRole('heading', {
      name: /page requested not found/i, level: 2 });
    const cryingImage = screen.getByRole('img', { name: /Pikachu crying because/i });
    const imageUrl = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(notFoundTitle).toBeInTheDocument();
    expect(cryingImage).toBeInTheDocument();
    expect(cryingImage.src).toBe(imageUrl);
  });
});
