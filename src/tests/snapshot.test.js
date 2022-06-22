import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';
import store from '../store/store';
import Navigation from '../components/Nav/Nav';

describe('Snapshot | 1. Navbar Snapshot', () => {
  test('Snapshot | Navbar should render', () => {
    const component = renderer
      .create(
        <MemoryRouter>
          <Provider store={store}>
            <Navigation />
          </Provider>
        </MemoryRouter>
      )
      .toJSON();

    expect(component).toMatchSnapshot();
  });
});
