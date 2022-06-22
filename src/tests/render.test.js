import * as React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import Navbar from '../components/Nav/Nav';
import NotFound from '../components/Nav/404';
import Footer from '../components/Nav/Footer';
import store from '../store/store';

describe('Render | 1. Navbar Rendering Test', () => {
  const props = { authedUser: null };
  test('Render | No authedUser => Navbar should not render', async () => {
    let screen = render(
      <MemoryRouter>
        <Provider store={store}>
          <Navbar {...props} />
        </Provider>
      </MemoryRouter>
    );
    const footerCompany = screen.queryByText(/Leaderboard/i);
    expect(footerCompany).not.toBeInTheDocument();
  });
});

describe('Render | 2. 404 Rendering Test', () => {
  test('Render | 404 should render', async () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );
    const notFoundMessage = screen.getByText(/This page does not exist/i);
    expect(notFoundMessage).toBeInTheDocument();
  });
});

describe('Render | 3. Footer Rendering Test', () => {
  test('Render | Footer should render', async () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    const footerCompany = screen.getByText(/League of Evil/i);
    expect(footerCompany).toBeInTheDocument();
  });
});
