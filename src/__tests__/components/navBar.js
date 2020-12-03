import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { NavBar } from '../../components/NavBar/NavBar';
import { disableMarkers } from '../../actions/marker/disableMarkers';

test('it should render NavBar component', () => {
  const props = {
    isPanelSelect: jest.fn(),
    getSelectedMarker: jest.fn(),
    logout: jest.fn(),
    redirect: jest.fn()
  };

  render(
    <MemoryRouter initialEntries={['/']}>
      <NavBar {...props} />
    </MemoryRouter>
  );
});

test('it should start sign out process', () => {
  const props = {
    isPanelSelect: jest.fn(),
    getSelectedMarker: jest.fn(),
    logout: jest.fn(),
    redirect: jest.fn()
  };

  render(
    <MemoryRouter initialEntries={['/']}>
      <NavBar {...props} />
    </MemoryRouter>
  );

  const signOutBtn = screen.getByText('Sign out');
  fireEvent.click(signOutBtn);
  expect(props.logout).toHaveBeenCalledTimes(1);
  expect(props.logout).toHaveBeenCalledWith({
    userId: '',
    userName: '',
    error: '',
    isAuthorized: false
  });
});

test('it should start redirect to List component', () => {
  const props = {
    isPanelSelect: jest.fn(),
    getSelectedMarker: jest.fn(),
    logout: jest.fn(),
    redirect: jest.fn(),
    disableMarkers: jest.fn()
  };

  render(
    <MemoryRouter initialEntries={['/']}>
      <NavBar {...props} />
    </MemoryRouter>
  );

  const navList = screen.getByText('List');
  fireEvent.click(navList);
  expect(props.getSelectedMarker).toHaveBeenCalledTimes(1);
});
